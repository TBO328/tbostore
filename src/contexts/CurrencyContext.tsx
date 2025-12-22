import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'SAR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  exchangeRate: number;
}

const EXCHANGE_RATE = 3.75; // 1 USD = 3.75 SAR

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as Currency) || 'SAR';
  });

  const formatPrice = (priceInSAR: number): string => {
    if (currency === 'SAR') {
      return `${priceInSAR.toFixed(2)} ر.س`;
    } else {
      const priceInUSD = priceInSAR / EXCHANGE_RATE;
      return `$${priceInUSD.toFixed(2)}`;
    }
  };

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: handleSetCurrency, 
      formatPrice,
      exchangeRate: EXCHANGE_RATE 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
