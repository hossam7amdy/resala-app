import { classnames } from '@/lib/classnames';
import React from 'react';

export const StockColor: React.FC<{ color: string }> = ({ color }) => {
  return (
    <span
      className={classnames('inline-block p-1 w-3 h-3 border border-solid border-[#eee]')}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
