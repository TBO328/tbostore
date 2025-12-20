import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const reviews = [
  {
    id: 1,
    name: { en: 'Sarah Johnson', ar: 'سارة جونسون' },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    review: {
      en: 'Absolutely love my purchase! The quality exceeded my expectations. Fast shipping and beautiful packaging. Will definitely order again!',
      ar: 'أحببت مشترياتي كثيراً! الجودة تجاوزت توقعاتي. شحن سريع وتغليف جميل. سأطلب مرة أخرى بالتأكيد!'
    },
    product: { en: 'Wireless Pro Headphones', ar: 'سماعات لاسلكية برو' },
  },
  {
    id: 2,
    name: { en: 'Mohammed Al-Rashid', ar: 'محمد الراشد' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    review: {
      en: 'Best online shopping experience ever! The customer service was incredibly helpful and the product arrived in perfect condition.',
      ar: 'أفضل تجربة تسوق عبر الإنترنت! خدمة العملاء كانت مفيدة للغاية والمنتج وصل بحالة ممتازة.'
    },
    product: { en: 'Smart Watch Ultra', ar: 'ساعة ذكية ألترا' },
  },
  {
    id: 3,
    name: { en: 'Emily Chen', ar: 'إيميلي تشين' },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    review: {
      en: 'The attention to detail is remarkable. Every product feels premium and the neon aesthetic of the store is just stunning!',
      ar: 'الاهتمام بالتفاصيل رائع. كل منتج يبدو فاخراً والتصميم النيون للمتجر مذهل!'
    },
    product: { en: 'Designer Sunglasses', ar: 'نظارات شمسية مصممة' },
  },
  {
    id: 4,
    name: { en: 'James Wilson', ar: 'جيمس ويلسون' },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    review: {
      en: 'Outstanding quality and the website is so easy to navigate. The neon design makes shopping here a unique experience!',
      ar: 'جودة رائعة والموقع سهل التصفح. التصميم النيوني يجعل التسوق هنا تجربة فريدة!'
    },
    product: { en: 'Premium Sneakers', ar: 'أحذية رياضية فاخرة' },
  },
  {
    id: 5,
    name: { en: 'Fatima Al-Salem', ar: 'فاطمة السالم' },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    rating: 5,
    review: {
      en: 'I love how fast the delivery was! The product quality is amazing and customer support is very responsive.',
      ar: 'أحب سرعة التوصيل! جودة المنتج مذهلة وخدمة العملاء سريعة الاستجابة.'
    },
    product: { en: 'Urban Backpack', ar: 'حقيبة ظهر حضرية' },
  },
  {
    id: 6,
    name: { en: 'David Park', ar: 'ديفيد بارك' },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    review: {
      en: 'The best e-commerce experience I have had. Clean interface, great products, and excellent service all around.',
      ar: 'أفضل تجربة تجارة إلكترونية مررت بها. واجهة نظيفة ومنتجات رائعة وخدمة ممتازة.'
    },
    product: { en: 'Bluetooth Speaker', ar: 'مكبر صوت بلوتوث' },
  },
];

const Reviews: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Customer ' : 'تقييمات '}
                  <span className="text-gradient-neon glow-text-cyan">
                    {language === 'en' ? 'Reviews' : 'العملاء'}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  {language === 'en'
                    ? 'See what our customers have to say about their shopping experience.'
                    : 'شاهد ما يقوله عملاؤنا عن تجربة التسوق الخاصة بهم.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-8 text-center">
              <AnimatedSection delay={0.1}>
                <div className="font-display text-4xl md:text-5xl font-bold text-primary glow-text-cyan">4.9</div>
                <div className="flex justify-center gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Average Rating' : 'متوسط التقييم'}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="font-display text-4xl md:text-5xl font-bold text-secondary glow-text-magenta">10K+</div>
                <div className="text-sm text-muted-foreground mt-3">
                  {language === 'en' ? 'Happy Customers' : 'عميل سعيد'}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <div className="font-display text-4xl md:text-5xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground mt-3">
                  {language === 'en' ? 'Would Recommend' : 'يوصون بنا'}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <AnimatedSection key={review.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative bg-gradient-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-500 neon-glow h-full"
                  >
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-primary/20">
                      <Quote className="w-12 h-12" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground mb-6 leading-relaxed">
                      "{review.review[language]}"
                    </p>

                    {/* Product Tag */}
                    <div className="inline-block px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground mb-6">
                      {review.product[language]}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={review.avatar}
                        alt={review.name[language]}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/50"
                      />
                      <div>
                        <div className="font-semibold text-foreground">
                          {review.name[language]}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language === 'en' ? 'Verified Buyer' : 'مشتري موثق'}
                        </div>
                      </div>
                    </div>
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

export default Reviews;
