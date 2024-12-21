import { getUserById } from '@/actions/users';
import type { Params } from '@/types';
import type { Metadata } from 'next';
import React from 'react';

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const id = params.id;
  const user = await getUserById(id);
  return {
    title: user?.name || user.firstName,
  };
};

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  return <>{children}</>;
};

export default Layout;
