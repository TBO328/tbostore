import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
];

const ReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="reviews" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t('customerReviews')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en'
              ? 'See what our customers have to say about their shopping experience.'
              : 'شاهد ما يقوله عملاؤنا عن تجربة التسوق الخاصة بهم.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group relative bg-gradient-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-500 neon-glow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
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
                <img
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
