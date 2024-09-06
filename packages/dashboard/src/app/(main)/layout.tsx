import { Header, Main, Sider } from '@/components/layout';
import { Layout as AntLayout } from 'antd';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <AntLayout>
      <Header />
      <Sider />
      <Main>{children}</Main>
    </AntLayout>
  );
};

export default Layout;
