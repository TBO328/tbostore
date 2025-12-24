import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import tboStoreLogo from '@/assets/tbo-store-logo.png';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/profile`,
      });

      if (error) {
        throw error;
      }

      setEmailSent(true);
      toast({
        title: language === 'en' ? 'Email Sent!' : 'تم إرسال البريد!',
        description: language === 'en' 
          ? 'Check your inbox for the password reset link.' 
          : 'تحقق من صندوق الوارد للحصول على رابط إعادة تعيين كلمة المرور.',
      });
    } catch (error: any) {
      toast({
        title: language === 'en' ? 'Error' : 'خطأ',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-8 shadow-card">
          {/* Logo */}
          <Link to="/" className="flex justify-center mb-8">
            <img
              src={tboStoreLogo}
              alt="TBO Store"
              className="h-16 w-auto"
            />
          </Link>

          {emailSent ? (
            /* Success State */
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-primary" />
              </motion.div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                {language === 'en' ? 'Check Your Email' : 'تحقق من بريدك الإلكتروني'}
              </h1>
              <p className="text-muted-foreground mb-6">
                {language === 'en' 
                  ? `We've sent a password reset link to ${email}` 
                  : `لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى ${email}`
                }
              </p>
              <Link to="/auth">
                <Button variant="neon-filled" size="lg" className="w-full">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Back to Login' : 'العودة لتسجيل الدخول'}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Title */}
              <h1 className="font-display text-2xl font-bold text-center text-foreground mb-2">
                {language === 'en' ? 'Forgot Password?' : 'نسيت كلمة المرور؟'}
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                {language === 'en' 
                  ? 'Enter your email and we\'ll send you a reset link' 
                  : 'أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين'
                }
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                      className="pl-10 bg-input border-border"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="neon-filled"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {language === 'en' ? 'Send Reset Link' : 'إرسال رابط إعادة التعيين'}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Back to Login */}
              <div className="mt-6 text-center">
                <Link 
                  to="/auth" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {language === 'en' ? 'Back to Login' : 'العودة لتسجيل الدخول'}
                </Link>
              </div>
            </>
          )}

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {language === 'en' ? '← Back to Store' : '← العودة إلى المتجر'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
