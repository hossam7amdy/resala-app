import { cn } from '@/lib/classnames';
import React from 'react';

export const StockColor: React.FC<{ color: string }> = ({ color }) => {
  return (
    <span
      className={cn('inline-block p-1 w-3 h-3 border border-solid border-[#eee]')}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
