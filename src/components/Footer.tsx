import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    { label: { en: 'Home', ar: 'الرئيسية' }, href: '#home' },
    { label: { en: 'Products', ar: 'المنتجات' }, href: '#products' },
    { label: { en: 'About Us', ar: 'من نحن' }, href: '#about' },
    { label: { en: 'Reviews', ar: 'التقييمات' }, href: '#reviews' },
    { label: { en: 'Contact', ar: 'اتصل بنا' }, href: '#contact' },
  ];

  const categories = [
    { label: { en: 'Electronics', ar: 'إلكترونيات' }, href: '#' },
    { label: { en: 'Fashion', ar: 'أزياء' }, href: '#' },
    { label: { en: 'Accessories', ar: 'إكسسوارات' }, href: '#' },
    { label: { en: 'Home Goods', ar: 'مستلزمات منزلية' }, href: '#' },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display text-3xl font-bold text-gradient-neon glow-text-cyan">
                TBO
              </span>
              <span className="font-display text-2xl font-semibold text-foreground">
                STORE
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              {language === 'en'
                ? 'Your destination for premium products with cutting-edge design and unmatched quality.'
                : 'وجهتك للمنتجات الفاخرة بتصميم متطور وجودة لا مثيل لها.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
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
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label[language]}
                  </a>
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
                  <a
                    href={cat.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {cat.label[language]}
                  </a>
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
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>{language === 'en' ? '123 Commerce Street, Business District' : '123 شارع التجارة، حي الأعمال'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 TBO STORE. {t('allRightsReserved')}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
