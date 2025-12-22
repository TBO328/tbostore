import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import tboStoreLogo from '@/assets/tbo-store-logo.png';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { label: { en: 'Home', ar: 'الرئيسية' }, to: '/' },
    { label: { en: 'Products', ar: 'المنتجات' }, to: '/products' },
    { label: { en: 'About Us', ar: 'من نحن' }, to: '/about' },
    { label: { en: 'Reviews', ar: 'التقييمات' }, to: '/reviews' },
    { label: { en: 'Contact', ar: 'اتصل بنا' }, to: '/contact' },
  ];

  const categories = [
    { label: { en: 'Electronics', ar: 'إلكترونيات' }, to: '/products' },
    { label: { en: 'Fashion', ar: 'أزياء' }, to: '/products' },
    { label: { en: 'Accessories', ar: 'إكسسوارات' }, to: '/products' },
    { label: { en: 'Home Goods', ar: 'مستلزمات منزلية' }, to: '/products' },
  ];

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src={tboStoreLogo} 
                alt="TBO Store" 
                className="h-12 w-auto"
              />
              <span className="font-display text-2xl font-bold text-foreground">
                TBO <span className="text-primary glow-text-cyan">STORE</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              {language === 'en'
                ? 'Your destination for premium products with cutting-edge design and unmatched quality.'
                : 'وجهتك للمنتجات الفاخرة بتصميم متطور وجودة لا مثيل لها.'}
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com/tbostore1/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">
              {language === 'en' ? 'Categories' : 'الفئات'}
            </h4>
            <ul className="space-y-3">
              {categories.map((cat, index) => (
                <li key={index}>
                  <Link
                    to={cat.to}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {cat.label[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-6">
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@tbostore.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+905510070277" className="hover:text-primary transition-colors">
                  +90 551 007 0277
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>{language === 'en' ? 'Istanbul, Turkey' : 'إسطنبول، تركيا'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 TBO STORE. {t('allRightsReserved')}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/policies" className="hover:text-primary transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </Link>
            <Link to="/policies" className="hover:text-primary transition-colors">
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
