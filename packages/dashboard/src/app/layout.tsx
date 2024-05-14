import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import StyledComponentsRegistry from './antd-registry';
import './globals.css';
import theme from './theme.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Resala - Admin Dashboard',
    template: '%s | Resala',
  },
  description: 'Resala Admin Dashboard for store management.',
};

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
