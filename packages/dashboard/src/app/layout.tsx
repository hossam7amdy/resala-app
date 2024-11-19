import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import { ConfigureAmplifyClientSide } from './amplify-cognito-config';
import StyledComponentsRegistry from './antd-registry';
import AppConfigProvider from './app-config-provider';
import './globals.css';

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
        <ConfigureAmplifyClientSide />
        <StyledComponentsRegistry>
          <AntdRegistry>
            <AppConfigProvider>{children}</AppConfigProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
