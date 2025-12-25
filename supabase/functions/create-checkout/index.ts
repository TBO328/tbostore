import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY not found');
      throw new Error('Stripe configuration error');
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    });

    const { items, customerName, customerPhone, customerAddress, couponCode, couponDiscount, successUrl, cancelUrl } = await req.json();

    console.log('Creating checkout session for:', { itemCount: items.length, customerName });

    // Create line items for Stripe
    const lineItems = items.map((item: {
      name: string;
      nameAr: string;
      price: number;
      quantity: number;
      image: string;
    }) => ({
      price_data: {
        currency: 'sar',
        product_data: {
          name: item.name,
          description: item.nameAr,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Convert to halalas
      },
      quantity: item.quantity,
    }));

    // Build checkout session params
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        customerName,
        customerPhone,
        customerAddress,
        couponCode: couponCode || '',
        couponDiscount: couponDiscount?.toString() || '0',
      },
      billing_address_collection: 'auto',
    };

    // Apply discount if coupon exists
    if (couponDiscount && couponDiscount > 0) {
      // Create a coupon in Stripe for this discount
      const stripeCoupon = await stripe.coupons.create({
        percent_off: couponDiscount,
        duration: 'once',
        name: couponCode || 'Discount',
      });

      sessionParams.discounts = [{
        coupon: stripeCoupon.id,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error creating checkout session:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
