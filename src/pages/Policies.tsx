import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const Policies: React.FC = () => {
  const { language } = useLanguage();

  const policies = [
    {
      icon: Shield,
      title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
      content: {
        en: [
          'We are committed to protecting your privacy and personal information.',
          'We collect only the necessary information to process your orders and provide better service.',
          'Your personal data is stored securely and is never shared with third parties without your consent.',
          'We use cookies to improve your browsing experience on our website.',
          'You have the right to request access to, correction, or deletion of your personal data at any time.',
        ],
        ar: [
          'نحن ملتزمون بحماية خصوصيتك ومعلوماتك الشخصية.',
          'نجمع فقط المعلومات الضرورية لمعالجة طلباتك وتقديم خدمة أفضل.',
          'بياناتك الشخصية مخزنة بشكل آمن ولن يتم مشاركتها مع أطراف ثالثة دون موافقتك.',
          'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح على موقعنا.',
          'لديك الحق في طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت.',
        ],
      },
      color: 'cyan',
    },
    {
      icon: FileText,
      title: { en: 'Terms of Service', ar: 'شروط الخدمة' },
      content: {
        en: [
          'By using our website, you agree to comply with these terms and conditions.',
          'All products are subject to availability and we reserve the right to limit quantities.',
          'Prices are subject to change without prior notice.',
          'We are not responsible for any damages resulting from misuse of products.',
          'All intellectual property rights on this website belong to TBO STORE.',
        ],
        ar: [
          'باستخدامك لموقعنا، فإنك توافق على الالتزام بهذه الشروط والأحكام.',
          'جميع المنتجات تخضع للتوفر ونحتفظ بالحق في تحديد الكميات.',
          'الأسعار قابلة للتغيير دون إشعار مسبق.',
          'نحن غير مسؤولين عن أي أضرار ناتجة عن سوء استخدام المنتجات.',
          'جميع حقوق الملكية الفكرية على هذا الموقع تعود لـ TBO STORE.',
        ],
      },
      color: 'magenta',
    },
    {
      icon: RefreshCw,
      title: { en: 'Return & Refund Policy', ar: 'سياسة الإرجاع والاسترداد' },
      content: {
        en: [
          'You can return products within 14 days of receipt if they are in their original condition.',
          'Items must be unused and in their original packaging to be eligible for return.',
          'Refunds will be processed within 7-10 business days after receiving the returned item.',
          'Shipping costs for returns are the responsibility of the customer unless the product is defective.',
          'For any issues with your order, please contact us via WhatsApp or email.',
        ],
        ar: [
          'يمكنك إرجاع المنتجات خلال 14 يومًا من الاستلام إذا كانت في حالتها الأصلية.',
          'يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية لتكون مؤهلة للإرجاع.',
          'سيتم معالجة المبالغ المستردة خلال 7-10 أيام عمل بعد استلام المنتج المرتجع.',
          'تكاليف الشحن للإرجاع تقع على عاتق العميل ما لم يكن المنتج معيبًا.',
          'لأي مشاكل مع طلبك، يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني.',
        ],
      },
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20';
      case 'magenta':
        return 'text-neon-magenta bg-neon-magenta/10 border-neon-magenta/20';
      case 'purple':
        return 'text-neon-purple bg-neon-purple/10 border-neon-purple/20';
      default:
        return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection>
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                  {language === 'en' ? 'Policies & ' : 'السياسات و'}
                  <span className="text-gradient-neon glow-text-cyan">
                    {language === 'en' ? 'Terms' : 'الشروط'}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  {language === 'en'
                    ? 'Please read our policies carefully to understand your rights and obligations.'
                    : 'يرجى قراءة سياساتنا بعناية لفهم حقوقك والتزاماتك.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Policies Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {policies.map((policy, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(policy.color)}`}>
                        <policy.icon className="w-7 h-7" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {policy.title[language]}
                      </h2>
                    </div>

                    <ul className="space-y-4">
                      {policy.content[language].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
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

export default Policies;
