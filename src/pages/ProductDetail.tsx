import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowLeft, Plus, Minus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import ProductCard from '@/components/ProductCard';
import PriceDisplay from '@/components/PriceDisplay';
import { toast } from 'sonner';
import { products } from '@/data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { addToCart, triggerFlyAnimation, cartIconRef } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products.filter(p => p.id !== Number(id) && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
          </h1>
          <Link to="/products">
            <Button variant="neon">{t('products')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (imageRef.current && cartIconRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      triggerFlyAnimation(
        { x: imageRect.left + imageRect.width / 2, y: imageRect.top + imageRect.height / 2 },
        product.image
      );
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        image: product.image,
      });
    }
    
    setIsAdded(true);
    toast.success(t('addedToCart'));
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>{t('products')}</span>
          </Link>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-card border border-border">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-neon-cyan">
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full shadow-neon-magenta">
                      BEST
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isLiked ? 'bg-secondary text-secondary-foreground shadow-neon-magenta' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <motion.img
                  ref={imageRef}
                  src={product.image}
                  alt={language === 'ar' ? product.nameAr : product.name}
                  className="w-full aspect-square object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Neon Glow Effect */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center bottom, hsl(var(--neon-cyan) / 0.15), transparent 60%)',
                }} />
              </div>
            </AnimatedSection>

            {/* Product Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                {/* Category */}
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {language === 'ar' ? product.categoryAr : product.category}
                </span>

                {/* Name */}
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {language === 'ar' ? product.nameAr : product.name}
                </h1>

                {/* Price */}
                <PriceDisplay 
                  price={product.price} 
                  originalPrice={product.originalPrice} 
                  size="xl" 
                  className="glow-text-cyan"
                />

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-500 font-medium">{t('inStock')}</span>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">{t('productDescription')}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'ar' ? product.descriptionAr : product.description}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-foreground font-medium">{t('quantity')}:</span>
                  <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-foreground">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="neon"
                    size="lg"
                    onClick={handleAddToCart}
                    className="w-full text-lg py-6"
                    disabled={isAdded}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        {t('addedToCart')}
                      </>
                    ) : (
                      <span className="flex items-center">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {t('addToCart')} - <PriceDisplay price={product.price * quantity} size="md" showOriginal={false} />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <AnimatedSection>
                <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                  {t('relatedProducts')}
                </h2>
              </AnimatedSection>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <AnimatedSection key={relatedProduct.id} delay={index * 0.1}>
                    <ProductCard product={relatedProduct} />
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
