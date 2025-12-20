import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية' },
  products: { en: 'Products', ar: 'المنتجات' },
  about: { en: 'About Us', ar: 'من نحن' },
  contact: { en: 'Contact', ar: 'اتصل بنا' },
  reviews: { en: 'Reviews', ar: 'التقييمات' },
  
  // Hero
  heroTitle: { en: 'Welcome to TBO STORE', ar: 'مرحباً بكم في TBO STORE' },
  heroSubtitle: { en: 'Discover the Future of Shopping', ar: 'اكتشف مستقبل التسوق' },
  heroDescription: { en: 'Experience premium products with cutting-edge design and unmatched quality.', ar: 'اختبر منتجات متميزة بتصميم متطور وجودة لا مثيل لها.' },
  shopNow: { en: 'Shop Now', ar: 'تسوق الآن' },
  exploreMore: { en: 'Explore More', ar: 'اكتشف المزيد' },
  
  // Categories
  categories: { en: 'Categories', ar: 'الفئات' },
  electronics: { en: 'Electronics', ar: 'إلكترونيات' },
  fashion: { en: 'Fashion', ar: 'أزياء' },
  accessories: { en: 'Accessories', ar: 'إكسسوارات' },
  homeGoods: { en: 'Home Goods', ar: 'مستلزمات منزلية' },
  
  // Products
  newArrivals: { en: 'New Arrivals', ar: 'وصل حديثاً' },
  featuredProducts: { en: 'Featured Products', ar: 'منتجات مميزة' },
  bestSellers: { en: 'Best Sellers', ar: 'الأكثر مبيعاً' },
  addToCart: { en: 'Add to Cart', ar: 'أضف للسلة' },
  buyNow: { en: 'Buy Now', ar: 'اشتر الآن' },
  viewDetails: { en: 'View Details', ar: 'عرض التفاصيل' },
  
  // About
  aboutTitle: { en: 'About TBO STORE', ar: 'عن TBO STORE' },
  aboutDescription: { en: 'We are dedicated to bringing you the finest products with exceptional quality and innovative design. Our mission is to transform your shopping experience into something extraordinary.', ar: 'نحن ملتزمون بتقديم أفضل المنتجات بجودة استثنائية وتصميم مبتكر. مهمتنا هي تحويل تجربة التسوق الخاصة بك إلى شيء استثنائي.' },
  
  // Reviews
  customerReviews: { en: 'Customer Reviews', ar: 'تقييمات العملاء' },
  
  // Footer
  followUs: { en: 'Follow Us', ar: 'تابعنا' },
  allRightsReserved: { en: 'All Rights Reserved', ar: 'جميع الحقوق محفوظة' },
  
  // Common
  loading: { en: 'Loading...', ar: 'جار التحميل...' },
  search: { en: 'Search', ar: 'بحث' },
  cart: { en: 'Cart', ar: 'السلة' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
