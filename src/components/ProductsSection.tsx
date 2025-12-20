import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, categories } from '@/data/products';

const ProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { t, language } = useLanguage();

  const filteredProducts = activeCategory === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category === activeCategory).slice(0, 8);

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
    <section id="products" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('featuredProducts')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? 'Explore our curated collection of premium products designed for the modern lifestyle.'
              : 'استكشف مجموعتنا المختارة من المنتجات الفاخرة المصممة لنمط الحياة العصري.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-neon-cyan'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
