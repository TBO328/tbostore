import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const CheckoutSuccess: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
              >
                <Check className="w-12 h-12 text-green-500" />
              </motion.div>
              
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {language === 'ar' ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
              </h1>
              
              <p className="text-muted-foreground mb-8">
                {language === 'ar' 
                  ? 'شكراً لك! تم استلام طلبك وسيتم التواصل معك قريباً لتأكيد التوصيل.'
                  : 'Thank you! Your order has been received and we will contact you soon to confirm delivery.'}
              </p>

              {sessionId && (
                <p className="text-xs text-muted-foreground mb-6 font-mono">
                  {language === 'ar' ? 'رقم المعاملة:' : 'Transaction ID:'} {sessionId.slice(0, 20)}...
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link to="/products" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {language === 'ar' ? 'تسوق المزيد' : 'Continue Shopping'}
                  </Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button variant="neon" size="lg" className="w-full">
                    <Home className="w-5 h-5 mr-2" />
                    {language === 'ar' ? 'الصفحة الرئيسية' : 'Back to Home'}
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
