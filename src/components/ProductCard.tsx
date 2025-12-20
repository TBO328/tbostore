import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { language, t } = useLanguage();
  const { addToCart, triggerFlyAnimation, cartIconRef } = useCart();
  const imageRef = useRef<HTMLImageElement>(null);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (imageRef.current && cartIconRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      triggerFlyAnimation(
        { x: imageRect.left + imageRect.width / 2, y: imageRect.top + imageRect.height / 2 },
        product.image
      );
    }

    addToCart({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      image: product.image,
    });
    
    toast.success(t('addedToCart'));
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className="group relative bg-gradient-card rounded-2xl overflow-hidden border border-border transition-all duration-500 hover:border-primary/50 neon-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-neon-cyan">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full shadow-neon-magenta">
              BEST
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute top-4 right-4 z-20 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked ? 'bg-secondary text-secondary-foreground shadow-neon-magenta' : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          <img
            ref={imageRef}
            src={product.image}
            alt={language === 'ar' ? product.nameAr : product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          {/* Neon Glow Effect on Hover */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{
            background: 'radial-gradient(ellipse at center bottom, hsl(var(--neon-cyan) / 0.2), transparent 70%)',
          }} />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {language === 'ar' ? product.categoryAr : product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 line-clamp-2">
            {language === 'ar' ? product.nameAr : product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display text-xl font-bold text-primary glow-text-cyan">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button variant="neon" className="w-full group/btn" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            {t('addToCart')}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
