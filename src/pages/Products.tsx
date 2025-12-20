import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const products = [
  {
    id: 1,
    name: 'Wireless Pro Headphones',
    nameAr: 'سماعات لاسلكية برو',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics',
    isNew: true,
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    nameAr: 'ساعة ذكية ألترا',
    price: 449,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'Electronics',
    isBestSeller: true,
  },
  {
    id: 3,
    name: 'Premium Leather Jacket',
    nameAr: 'جاكيت جلد فاخر',
    price: 189,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    category: 'Fashion',
    isNew: true,
  },
  {
    id: 4,
    name: 'Designer Sunglasses',
    nameAr: 'نظارات شمسية مصممة',
    price: 159,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    category: 'Accessories',
  },
  {
    id: 5,
    name: 'Minimalist Desk Lamp',
    nameAr: 'مصباح مكتب بسيط',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
    category: 'Home Goods',
    isBestSeller: true,
  },
  {
    id: 6,
    name: 'Wireless Earbuds Pro',
    nameAr: 'سماعات أذن لاسلكية برو',
    price: 199,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    category: 'Electronics',
  },
  {
    id: 7,
    name: 'Urban Backpack',
    nameAr: 'حقيبة ظهر حضرية',
    price: 129,
    originalPrice: 169,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'Accessories',
    isNew: true,
  },
  {
    id: 8,
    name: 'Premium Sneakers',
    nameAr: 'أحذية رياضية فاخرة',
    price: 179,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Fashion',
    isBestSeller: true,
  },
  {
    id: 9,
    name: 'Bluetooth Speaker',
    nameAr: 'مكبر صوت بلوتوث',
    price: 129,
    originalPrice: 159,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    category: 'Electronics',
  },
  {
    id: 10,
    name: 'Luxury Watch',
    nameAr: 'ساعة فاخرة',
    price: 599,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80',
    category: 'Accessories',
    isBestSeller: true,
  },
  {
    id: 11,
    name: 'Modern Vase Set',
    nameAr: 'طقم مزهريات عصرية',
    price: 89,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80',
    category: 'Home Goods',
  },
  {
    id: 12,
    name: 'Casual Denim Jacket',
    nameAr: 'جاكيت دنيم كاجوال',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80',
    category: 'Fashion',
    isNew: true,
  },
];

const categories = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home Goods'];

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useLanguage();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    const labels: { [key: string]: { en: string; ar: string } } = {
      'All': { en: 'All', ar: 'الكل' },
      'Electronics': { en: 'Electronics', ar: 'إلكترونيات' },
      'Fashion': { en: 'Fashion', ar: 'أزياء' },
      'Accessories': { en: 'Accessories', ar: 'إكسسوارات' },
      'Home Goods': { en: 'Home Goods', ar: 'مستلزمات منزلية' },
    };
    return labels[cat]?.[language] || cat;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Our ' : 'مجموعة '}
                  <span className="text-gradient-neon glow-text-cyan">
                    {language === 'en' ? 'Products' : 'منتجاتنا'}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  {language === 'en'
                    ? 'Discover our curated collection of premium products designed for the modern lifestyle.'
                    : 'اكتشف مجموعتنا المختارة من المنتجات الفاخرة المصممة لنمط الحياة العصري.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Category Filter */}
            <AnimatedSection delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground shadow-neon-cyan'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>

            {/* Products Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              layout
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  layout
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
