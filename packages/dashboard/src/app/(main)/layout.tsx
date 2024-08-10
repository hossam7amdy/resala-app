import { SideNav } from '@/components';
import { Content, Sider } from '@/components';
import { Layout as AntLayout } from 'antd';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <AntLayout hasSider>
      <Sider>
        <SideNav />
      </Sider>
      <Content>{children}</Content>
    </AntLayout>
  );
};

export default Layout;
