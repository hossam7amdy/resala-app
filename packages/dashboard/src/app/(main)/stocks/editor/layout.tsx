import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'Create Stock',
};

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};

export default Layout;
