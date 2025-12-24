import React from 'react';
import sarSymbol from '@/assets/sar-symbol.png';

interface SarSymbolProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SarSymbol: React.FC<SarSymbolProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6',
  };

  return (
    <img 
      src={sarSymbol} 
      alt="SAR" 
      className={`inline-block ${sizeClasses[size]} ${className}`}
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  );
};

export default SarSymbol;
