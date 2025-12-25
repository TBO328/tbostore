import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not found');
      throw new Error('Stripe configuration error');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error('Webhook signature verification failed:', errMessage);
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 400,
          headers: corsHeaders,
        });
      }
    } else {
      // For testing without webhook secret
      event = JSON.parse(body);
    }

    console.log('Received Stripe event:', event.type);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Processing completed checkout:', session.id);
      
      // Initialize Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Generate order number
      const { data: orderNumberData } = await supabase.rpc('generate_order_number');
      const orderNumber = orderNumberData || `TBO-${Date.now()}`;

      // Get line items from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // Prepare order items
      const items = lineItems.data.map((item: Stripe.LineItem) => ({
        name: item.description,
        price: (item.amount_total || 0) / 100,
        quantity: item.quantity,
      }));

      // Create order in database
      const { error: orderError } = await supabase.from('orders').insert({
        order_number: orderNumber,
        customer_name: session.metadata?.customerName || 'Unknown',
        customer_phone: session.metadata?.customerPhone || session.customer_details?.phone || '',
        customer_address: session.metadata?.customerAddress || '',
        items: items,
        payment_method: 'stripe',
        total_amount: (session.amount_total || 0) / 100,
        status: 'paid',
        notes: session.metadata?.couponCode 
          ? `Coupon: ${session.metadata.couponCode} (-${session.metadata.couponDiscount}%) | Stripe Session: ${session.id}`
          : `Stripe Session: ${session.id}`,
      });

      if (orderError) {
        console.error('Error creating order:', orderError);
      } else {
        console.log('Order created successfully:', orderNumber);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Webhook error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
