import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Create Stock',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
