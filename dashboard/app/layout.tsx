import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
