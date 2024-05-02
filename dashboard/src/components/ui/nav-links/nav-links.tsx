'use client';

import ROUTES from '@/lib/routes';
import {
  FileProtectOutlined,
  HomeOutlined,
  ProductOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import styles from './nav-links.module.css';

const links = [
  { name: 'Home', href: ROUTES.DASHBOARD, icon: HomeOutlined },
  { name: 'Categories', href: ROUTES.CATEGORIES, icon: TagOutlined },
  { name: 'Products', href: ROUTES.PRODUCTS, icon: ProductOutlined },
  { name: 'Orders', href: ROUTES.ORDERS, icon: FileProtectOutlined },
  { name: 'Customers', href: ROUTES.CUSTOMERS, icon: UserOutlined },
];

export const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className={styles['links']}>
      {links.map(({ name, href, icon }) => {
        const LinkIcon = icon;
        return (
          <li key={name}>
            <Link
              href={href}
              className={`${styles['link-item']} ${pathname.startsWith(href) && styles['link-active']}`}
            >
              <LinkIcon />
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
