import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

import policyFinancial from '@/assets/policy-financial.png';
import policySubscriptions from '@/assets/policy-subscriptions.png';
import policyPrivacy from '@/assets/policy-privacy.png';
import policyDesigns from '@/assets/policy-designs.png';

const Policies: React.FC = () => {
  const { language } = useLanguage();

  const policyImages = [
    {
      id: 'financial',
      image: policyFinancial,
      title: { en: 'Financial Policy', ar: 'سياسة المالية' },
    },
    {
      id: 'subscriptions',
      image: policySubscriptions,
      title: { en: 'Subscription Service Policy', ar: 'سياسة خدمة الاشتراكات' },
    },
    {
      id: 'privacy',
      image: policyPrivacy,
      title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    },
    {
      id: 'designs',
      image: policyDesigns,
      title: { en: 'Design Service Policy', ar: 'سياسة خدمة التصاميم' },
    },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {policyImages.map((policy, index) => (
                <AnimatedSection key={policy.id} delay={index * 0.1}>
                  <motion.div
                    className="rounded-2xl overflow-hidden border border-border bg-card/30 backdrop-blur-sm"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={policy.image}
                      alt={policy.title[language]}
                      className="w-full h-auto object-cover"
                    />
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
