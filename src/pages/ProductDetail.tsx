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
import { toast } from 'sonner';

// Sample products data
const products = [
  { id: 1, name: 'Quantum Wireless Headphones', nameAr: 'سماعات كوانتوم اللاسلكية', price: 299, originalPrice: 399, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', category: 'Electronics', categoryAr: 'إلكترونيات', isNew: true, description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, 40-hour battery life, and premium comfort for extended listening sessions.', descriptionAr: 'استمتع بصوت نقي مع سماعاتنا اللاسلكية المتميزة. تتميز بتقنية إلغاء الضوضاء المتقدمة وعمر بطارية يصل إلى 40 ساعة وراحة فائقة للاستماع لفترات طويلة.' },
  { id: 2, name: 'Neon Smart Watch', nameAr: 'ساعة نيون الذكية', price: 499, originalPrice: 599, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', category: 'Electronics', categoryAr: 'إلكترونيات', isBestSeller: true, description: 'Stay connected with style. Our smart watch features health monitoring, GPS tracking, water resistance up to 50 meters, and a stunning AMOLED display.', descriptionAr: 'ابق على اتصال بأناقة. تتميز ساعتنا الذكية بمراقبة الصحة وتتبع GPS ومقاومة الماء حتى 50 مترًا وشاشة AMOLED مذهلة.' },
  { id: 3, name: 'Cyber Gaming Keyboard', nameAr: 'لوحة مفاتيح سايبر للألعاب', price: 189, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500', category: 'Electronics', categoryAr: 'إلكترونيات', isNew: true, description: 'Dominate your games with our mechanical gaming keyboard. RGB backlighting, programmable macros, and ultra-responsive switches for competitive gaming.', descriptionAr: 'تفوق في ألعابك مع لوحة المفاتيح الميكانيكية للألعاب. إضاءة RGB خلفية وماكرو قابل للبرمجة ومفاتيح فائقة الاستجابة للألعاب التنافسية.' },
  { id: 4, name: 'Pulse Wireless Earbuds', nameAr: 'سماعات بولس اللاسلكية', price: 149, originalPrice: 199, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', category: 'Electronics', categoryAr: 'إلكترونيات', isBestSeller: true, description: 'Premium true wireless earbuds with active noise cancellation, transparency mode, and 8 hours of playback time. Perfect for music lovers on the go.', descriptionAr: 'سماعات أذن لاسلكية متميزة مع إلغاء الضوضاء النشط ووضع الشفافية و8 ساعات من وقت التشغيل. مثالية لمحبي الموسيقى أثناء التنقل.' },
  { id: 5, name: 'Holographic Backpack', nameAr: 'حقيبة ظهر هولوغرافية', price: 79, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', category: 'Fashion', categoryAr: 'أزياء', isNew: true, description: 'Stand out with our unique holographic backpack. Water-resistant material, multiple compartments, and adjustable straps for ultimate comfort.', descriptionAr: 'تميز مع حقيبة الظهر الهولوغرافية الفريدة. مادة مقاومة للماء وحجرات متعددة وأحزمة قابلة للتعديل للراحة القصوى.' },
  { id: 6, name: 'LED Gaming Mouse', nameAr: 'فأرة ألعاب LED', price: 89, originalPrice: 119, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500', category: 'Electronics', categoryAr: 'إلكترونيات', description: 'Precision gaming mouse with 16000 DPI sensor, customizable RGB lighting, and ergonomic design for marathon gaming sessions.', descriptionAr: 'فأرة ألعاب دقيقة مع مستشعر 16000 DPI وإضاءة RGB قابلة للتخصيص وتصميم مريح لجلسات الألعاب الطويلة.' },
  { id: 7, name: 'Minimalist Wallet', nameAr: 'محفظة مينيماليست', price: 49, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500', category: 'Accessories', categoryAr: 'إكسسوارات', isBestSeller: true, description: 'Slim, sleek wallet crafted from premium leather. RFID blocking technology keeps your cards safe while maintaining a minimalist aesthetic.', descriptionAr: 'محفظة رفيعة وأنيقة مصنوعة من جلد فاخر. تقنية حجب RFID تحافظ على أمان بطاقاتك مع الحفاظ على المظهر البسيط.' },
  { id: 8, name: 'Smart Home Speaker', nameAr: 'مكبر صوت المنزل الذكي', price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500', category: 'Home Goods', categoryAr: 'مستلزمات منزلية', isNew: true, description: 'Transform your home with our AI-powered smart speaker. Premium 360° sound, voice control, and seamless integration with your smart home devices.', descriptionAr: 'حول منزلك مع مكبر الصوت الذكي المدعوم بالذكاء الاصطناعي. صوت 360° متميز والتحكم الصوتي والتكامل السلس مع أجهزة المنزل الذكي.' },
];

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
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/products">
            <Button variant="neon">Back to Products</Button>
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
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl font-bold text-primary glow-text-cyan">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

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
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {t('addToCart')} - ${product.price * quantity}
                      </>
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
