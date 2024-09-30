import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit discount',
};

const EditDiscountLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default EditDiscountLayout;
