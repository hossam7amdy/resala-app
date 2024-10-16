'use client';

import { Menu } from '@/components';
import { ROUTES } from '@/routes';
import {
  FileProtectOutlined,
  HomeOutlined,
  ProductOutlined,
  SkinOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    key: ROUTES.DASHBOARD,
    label: <Link href={ROUTES.DASHBOARD}>Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: ROUTES.CATEGORIES,
    label: <Link href={ROUTES.CATEGORIES}>Categories</Link>,
    icon: <TagOutlined />,
  },
  {
    key: ROUTES.PRODUCTS,
    label: <Link href={ROUTES.PRODUCTS}>Products</Link>,
    icon: <ProductOutlined />,
  },
  {
    key: ROUTES.STOCKS,
    label: <Link href={ROUTES.STOCKS}>Stocks</Link>,
    icon: <SkinOutlined />,
  },
  {
    key: ROUTES.ORDERS,
    label: <Link href={ROUTES.ORDERS}>Orders</Link>,
    icon: <FileProtectOutlined />,
  },
  {
    key: ROUTES.CUSTOMERS,
    label: <Link href={ROUTES.CUSTOMERS}>Customers</Link>,
    icon: <UserOutlined />,
  },
];

export const NavLinks: React.FC = () => {
  const pathname = usePathname();

  const selectedKeys = pathname.split('/').map(path => `/${path}`);

  return <Menu selectedKeys={selectedKeys} items={items} />;
};
