import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout as AppLayout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

import SideNav from '../ui/side-nav';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={{ user: {}, expires: '2022-12-31T23:59:59Z' }}>
      <AntdRegistry>
        <AppLayout hasSider>
          <Sider className={styles.sider}>
            <SideNav />
          </Sider>
          <Content>{children}</Content>
        </AppLayout>
      </AntdRegistry>
    </SessionProvider>
  );
}
