import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout as AppLayout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

import SideNav from '../ui/side-nav';
import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  session: any;
}
export default function Layout({ session, children }: LayoutProps) {
  return (
    <AntdRegistry>
      <AppLayout hasSider>
        <Sider className={styles.sider}>
          <SideNav />
        </Sider>
        <Content>{children}</Content>
      </AppLayout>
    </AntdRegistry>
  );
}
