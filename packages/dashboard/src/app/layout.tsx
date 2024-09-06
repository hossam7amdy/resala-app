import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import React from 'react';

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
        <StyledComponentsRegistry>
          <AntdRegistry>
            <AppConfigProvider>
              <SessionProvider>{children}</SessionProvider>
            </AppConfigProvider>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default Layout;
