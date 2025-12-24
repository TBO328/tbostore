import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { products, categories } from '@/data/products';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useLanguage();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    const labels: { [key: string]: { en: string; ar: string } } = {
      'All': { en: 'All', ar: 'الكل' },
      'Subscriptions': { en: 'Subscriptions', ar: 'اشتراكات' },
      'Designs': { en: 'Designs', ar: 'تصاميم' },
      'Engagement': { en: 'Engagement', ar: 'تفاعل' },
      'Discord': { en: 'Discord', ar: 'ديسكورد' },
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
