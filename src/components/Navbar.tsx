import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import FlyingCartItem from '@/components/FlyingCartItem';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { getTotalItems, cartIconRef, flyingItem } = useCart();
  const location = useLocation();

  const navLinks = [
    { key: 'home', to: '/' },
    { key: 'products', to: '/products' },
    { key: 'about', to: '/about' },
    { key: 'reviews', to: '/reviews' },
    { key: 'contact', to: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const itemCount = getTotalItems();

  // Get cart icon position for flying animation
  const getCartPosition = () => {
    if (cartIconRef.current) {
      const rect = cartIconRef.current.getBoundingClientRect();
      return { x: rect.left + rect.width / 2 - 40, y: rect.top + rect.height / 2 - 40 };
    }
    return { x: window.innerWidth - 100, y: 50 };
  };

  return (
    <>
      {/* Flying Cart Animation */}
      <AnimatePresence>
        {flyingItem && (
          <FlyingCartItem
            image={flyingItem.image}
            startPosition={{ x: flyingItem.x - 40, y: flyingItem.y - 40 }}
            endPosition={getCartPosition()}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="font-display text-2xl md:text-3xl font-bold text-gradient-neon glow-text-cyan"
              >
                TBO
              </motion.span>
              <span className="font-display text-xl md:text-2xl font-semibold text-foreground">
                STORE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.to}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive(link.to)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {t(link.key)}
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Selector with Animation */}
              <motion.div 
                className="flex items-center gap-1 bg-muted rounded-lg p-1"
                layout
              >
                <motion.button
                  onClick={() => setLanguage('en')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition-all duration-300 ${
                    language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-base">🇺🇸</span>
                  <span className="hidden sm:inline">EN</span>
                </motion.button>
                <motion.button
                  onClick={() => setLanguage('ar')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition-all duration-300 ${
                    language === 'ar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-base">🇸🇦</span>
                  <span className="hidden sm:inline">AR</span>
                </motion.button>
              </motion.div>

              {/* Search & Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Search className="w-5 h-5" />
                </Button>
              </motion.div>
              <Link to="/cart">
                <motion.div 
                  ref={cartIconRef}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="neon" size="icon" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <AnimatePresence>
                      {itemCount > 0 && (
                        <motion.span
                          key="cart-count"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center font-bold"
                        >
                          {itemCount > 99 ? '99+' : itemCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 border-t border-border overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive(link.to)
                            ? 'text-primary bg-primary/10'
                            : 'text-muted-foreground hover:text-primary hover:bg-muted'
                        }`}
                      >
                        {t(link.key)}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
