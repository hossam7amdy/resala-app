import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sizes',
};

const ColorsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ColorsLayout;
