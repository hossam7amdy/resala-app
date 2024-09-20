import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My profile',
};

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default ProfileLayout;
