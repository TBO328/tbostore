import React from 'react';
import { Shield, Truck, Headphones, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: Shield,
    title: { en: 'Secure Payments', ar: 'دفع آمن' },
    description: { en: 'Your transactions are protected with industry-leading security.', ar: 'معاملاتك محمية بأمان رائد في الصناعة.' },
    color: 'cyan',
  },
  {
    icon: Truck,
    title: { en: 'Fast Delivery', ar: 'توصيل سريع' },
    description: { en: 'Get your orders delivered quickly to your doorstep.', ar: 'احصل على طلباتك بسرعة إلى باب منزلك.' },
    color: 'magenta',
  },
  {
    icon: Headphones,
    title: { en: '24/7 Support', ar: 'دعم على مدار الساعة' },
    description: { en: 'Our team is always here to help you with any questions.', ar: 'فريقنا دائماً هنا لمساعدتك في أي استفسار.' },
    color: 'purple',
  },
  {
    icon: Award,
    title: { en: 'Premium Quality', ar: 'جودة فاخرة' },
    description: { en: 'Only the finest products make it to our collection.', ar: 'فقط أفضل المنتجات تصل إلى مجموعتنا.' },
    color: 'cyan',
  },
];

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'text-neon-cyan shadow-neon-cyan group-hover:bg-neon-cyan/10';
      case 'magenta':
        return 'text-neon-magenta shadow-neon-magenta group-hover:bg-neon-magenta/10';
      case 'purple':
        return 'text-neon-purple shadow-neon-purple group-hover:bg-neon-purple/10';
      default:
        return 'text-primary';
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/50 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-magenta/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('aboutTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('aboutDescription')}
            </p>
            <p className="text-muted-foreground mb-8">
              {language === 'en'
                ? 'Founded with a passion for excellence, TBO STORE brings together the best products from around the world. We believe in quality over quantity, ensuring every item meets our strict standards before reaching you.'
                : 'تأسس TBO STORE بشغف نحو التميز، حيث نجمع أفضل المنتجات من حول العالم. نؤمن بالجودة على الكمية، ونضمن أن كل منتج يلبي معاييرنا الصارمة قبل أن يصل إليك.'}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-3xl font-bold text-primary glow-text-cyan">5+</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Years Experience' : 'سنوات خبرة'}
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-secondary glow-text-magenta">50K+</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Happy Customers' : 'عميل سعيد'}
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Satisfaction' : 'رضا العملاء'}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 neon-glow"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-muted mb-4 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
