import { SideNav } from '@/components/ui/side-nav';
import { Layout as AppLayout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <AppLayout hasSider>
      <Sider
        className={styles.sider}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <SideNav />
      </Sider>
      <Content style={{ marginLeft: 200, minHeight: '100vh' }}>{children}</Content>
    </AppLayout>
  );
};

export default Layout;
