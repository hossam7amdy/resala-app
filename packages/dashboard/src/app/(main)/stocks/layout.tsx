import { ROUTES } from '@/routes';
import { Tabs } from 'antd';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const headersList = headers();

  const activeKey = headersList.get('x-pathname') || ROUTES.STOCKS;

  return (
    <Tabs
      defaultActiveKey={activeKey}
      items={[
        {
          key: ROUTES.STOCKS,
          label: <Link href={ROUTES.STOCKS}>Stocks</Link>,
          children,
        },
        {
          key: ROUTES.COLORS,
          label: <Link href={ROUTES.COLORS}>Colors</Link>,
          children,
        },
        {
          key: ROUTES.SIZES,
          label: <Link href={ROUTES.SIZES}>Sizes</Link>,
          children,
        },
      ]}
    />
  );
};

export default Layout;
