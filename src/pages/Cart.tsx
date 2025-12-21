import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const WHATSAPP_NUMBER = '966500000000'; // Replace with your WhatsApp number

const Cart: React.FC = () => {
  const { language, t } = useLanguage();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const itemsList = items.map(item => 
      `• ${language === 'ar' ? item.nameAr : item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} ر.س`
    ).join('\n');
    
    const message = language === 'ar' 
      ? `مرحباً! أود شراء المنتجات التالية:\n\n${itemsList}\n\nالإجمالي: ${getTotalPrice().toFixed(2)} ر.س`
      : `Hello! I would like to purchase the following items:\n\n${itemsList}\n\nTotal: ${getTotalPrice().toFixed(2)} SAR`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('continueShopping')}</span>
                </Link>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                  <ShoppingCart className="w-8 h-8 text-primary" />
                  {t('shoppingCart')}
                </h1>
              </div>
            </div>
          </AnimatedSection>

          {items.length === 0 ? (
            /* Empty Cart */
            <AnimatedSection>
              <div className="flex flex-col items-center justify-center py-20">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6"
                >
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {t('cartEmpty')}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t('cartEmptyDesc')}
                </p>
                <Link to="/products">
                  <Button variant="neon" size="lg">
                    {t('continueShopping')}
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-card rounded-xl border border-border p-4 flex gap-4"
                    >
                      {/* Product Image */}
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <motion.img
                          src={item.image}
                          alt={language === 'ar' ? item.nameAr : item.name}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                          whileHover={{ scale: 1.05 }}
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors">
                              {language === 'ar' ? item.nameAr : item.name}
                            </h3>
                          </Link>
                          <p className="text-primary font-bold mt-1">
                            {item.price.toFixed(2)} ر.س
                          </p>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-bold text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Item Total & Remove */}
                          <div className="flex items-center gap-4">
                            <span className="font-display font-bold text-foreground">
                              {(item.price * item.quantity).toFixed(2)} ر.س
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="bg-gradient-card rounded-xl border border-border p-6 sticky top-24">
                    <h2 className="font-display text-xl font-bold text-foreground mb-6">
                      {t('totalPrice')}
                    </h2>

                    {/* Items Summary */}
                    <div className="space-y-3 mb-6">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {language === 'ar' ? item.nameAr : item.name} x{item.quantity}
                          </span>
                          <span className="text-foreground font-medium">
                            {(item.price * item.quantity).toFixed(2)} ر.س
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border my-4" />

                    {/* Total */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold text-foreground">
                        {language === 'ar' ? 'إجمالي السعر' : 'Total Price'}
                      </span>
                      <span className="font-display text-2xl font-bold text-primary glow-text-cyan">
                        {getTotalPrice().toFixed(2)} ر.س
                      </span>
                    </div>

                    {/* Checkout via WhatsApp */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="neon"
                        size="lg"
                        onClick={handleWhatsAppCheckout}
                        className="w-full text-lg py-6 mb-3"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        {t('contactUs')}
                      </Button>
                    </motion.div>

                    <p className="text-xs text-muted-foreground text-center">
                      {language === 'ar' 
                        ? 'سيتم توجيهك إلى واتساب لإتمام الطلب'
                        : 'You will be redirected to WhatsApp to complete your order'}
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
