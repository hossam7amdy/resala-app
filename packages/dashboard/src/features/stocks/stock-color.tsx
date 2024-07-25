import React from 'react';

export const StockColor: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: 5,
        width: 15,
        height: 15,
        border: '1px solid #eee',
        fontSize: 'large',
        backgroundColor: color,
      }}
    />
  );
};
