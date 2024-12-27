import { getUserById } from '@/actions/users';
import type { Params } from '@/types';
import type { Metadata } from 'next';
import React from 'react';

export const generateMetadata = async (props: { params: Params }): Promise<Metadata> => {
  const params = await props.params;
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
