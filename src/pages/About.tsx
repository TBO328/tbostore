import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Headphones, Award, Users, Target, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

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

const values = [
  {
    icon: Users,
    title: { en: 'Customer First', ar: 'العميل أولاً' },
    description: { en: 'We prioritize your satisfaction above everything else.', ar: 'نضع رضاك فوق كل شيء.' },
  },
  {
    icon: Target,
    title: { en: 'Innovation', ar: 'الابتكار' },
    description: { en: 'Constantly pushing boundaries to bring you the latest.', ar: 'نسعى دائماً لتقديم أحدث المنتجات.' },
  },
  {
    icon: Sparkles,
    title: { en: 'Excellence', ar: 'التميز' },
    description: { en: 'Striving for perfection in every detail.', ar: 'نسعى للكمال في كل تفصيل.' },
  },
];

const About: React.FC = () => {
  const { language } = useLanguage();

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-magenta/30 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'About ' : 'عن '}
                  <span className="text-gradient-neon glow-text-cyan">TBO STORE</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  {language === 'en'
                    ? 'Discover our story, our mission, and what makes us different.'
                    : 'اكتشف قصتنا ومهمتنا وما يميزنا عن الآخرين.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {language === 'en' ? 'Our Story' : 'قصتنا'}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {language === 'en'
                      ? 'Founded with a passion for excellence, TBO STORE brings together the best products from around the world. We believe in quality over quantity, ensuring every item meets our strict standards before reaching you.'
                      : 'تأسس TBO STORE بشغف نحو التميز، حيث نجمع أفضل المنتجات من حول العالم. نؤمن بالجودة على الكمية، ونضمن أن كل منتج يلبي معاييرنا الصارمة قبل أن يصل إليك.'}
                  </p>
                  <p className="text-muted-foreground mb-8">
                    {language === 'en'
                      ? 'Our journey began with a simple idea: to create a shopping experience that combines cutting-edge design with exceptional quality. Today, we continue to push boundaries and bring you the future of online shopping.'
                      : 'بدأت رحلتنا بفكرة بسيطة: إنشاء تجربة تسوق تجمع بين التصميم المتطور والجودة الاستثنائية. اليوم، نواصل تجاوز الحدود ونقدم لك مستقبل التسوق عبر الإنترنت.'}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="font-display text-3xl font-bold text-primary glow-text-cyan">5+</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Years Experience' : 'سنوات خبرة'}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="font-display text-3xl font-bold text-secondary glow-text-magenta">50K+</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Happy Customers' : 'عميل سعيد'}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="font-display text-3xl font-bold text-accent">100%</div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Satisfaction' : 'رضا العملاء'}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Features Grid */}
              <AnimatedSection delay={0.2}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
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
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {language === 'en' ? 'Our Values' : 'قيمنا'}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {language === 'en'
                    ? 'The principles that guide everything we do.'
                    : 'المبادئ التي توجه كل ما نقوم به.'}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-center p-8 bg-card/30 backdrop-blur-sm rounded-2xl border border-border"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
                    >
                      <value.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {value.title[language]}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description[language]}
                    </p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
