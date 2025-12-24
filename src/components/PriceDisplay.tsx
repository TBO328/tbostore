import React from 'react';
import sarSymbol from '@/assets/sar-symbol.png';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useTheme } from '@/contexts/ThemeContext';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showOriginal?: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  price, 
  originalPrice, 
  size = 'md', 
  className = '',
  showOriginal = true 
}) => {
  const { currency, exchangeRate } = useCurrency();
  const { theme } = useTheme();

  const sizeClasses = {
    sm: { text: 'text-sm', symbol: 'h-3 w-3' },
    md: { text: 'text-lg', symbol: 'h-4 w-4' },
    lg: { text: 'text-xl', symbol: 'h-5 w-5' },
    xl: { text: 'text-3xl', symbol: 'h-6 w-6' },
  };

  const displayPrice = currency === 'SAR' ? price : price / exchangeRate;
  const displayOriginalPrice = originalPrice ? (currency === 'SAR' ? originalPrice : originalPrice / exchangeRate) : null;

  // Invert color for light mode (dark symbol) or dark mode (light symbol)
  const symbolFilter = theme === 'light' 
    ? 'brightness(0)' // Make it black for light mode
    : 'brightness(0) invert(1)'; // Make it white for dark mode

  if (currency === 'USD') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className={`font-arabic font-bold text-primary ${sizeClasses[size].text}`}>
          ${displayPrice.toFixed(2)}
        </span>
        {showOriginal && displayOriginalPrice && (
          <span className={`text-muted-foreground line-through ${size === 'xl' ? 'text-lg' : 'text-sm'}`}>
            ${displayOriginalPrice.toFixed(2)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-arabic font-bold text-primary flex items-center gap-1 ${sizeClasses[size].text}`}>
        {displayPrice.toFixed(2)}
        <img 
          src={sarSymbol} 
          alt="ر.س" 
          className={`inline-block ${sizeClasses[size].symbol}`}
          style={{ filter: symbolFilter }}
        />
      </span>
      {showOriginal && displayOriginalPrice && (
        <span className={`text-muted-foreground line-through flex items-center gap-1 ${size === 'xl' ? 'text-lg' : 'text-sm'}`}>
          {displayOriginalPrice.toFixed(2)}
          <img 
            src={sarSymbol} 
            alt="ر.س" 
            className={`inline-block ${size === 'xl' ? 'h-4 w-4' : 'h-3 w-3'} opacity-60`}
            style={{ filter: symbolFilter }}
          />
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
