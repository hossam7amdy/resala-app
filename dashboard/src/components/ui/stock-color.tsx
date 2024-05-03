import { SkinFilled } from '@ant-design/icons';
import React from 'react';

export const StockColor = ({ color }: { color: string }) => {
  return (
    <SkinFilled
      style={{
        padding: 5,
        borderRadius: 15,
        border: '1px solid #eee',
        fontSize: 'large',
        color: color,
      }}
    />
  );
};

export default StockColor;
