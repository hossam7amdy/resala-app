'use client';

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
  { name: 'Home', href: '/dashboard', icon: HomeOutlined },
  { name: 'Categories', href: '/dashboard/categories', icon: TagOutlined },
  { name: 'Products', href: '/dashboard/products', icon: ProductOutlined },
  { name: 'Orders', href: '/dashboard/orders', icon: FileProtectOutlined },
  { name: 'Customers', href: '/dashboard/customers', icon: UserOutlined },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className={styles['links']}>
      {links.map(({ name, href, icon }) => {
        const LinkIcon = icon;
        return (
          <li key={name}>
            <Link
              href={href}
              className={`${styles['link-item']} ${pathname === href && styles['link-active']}`}
            >
              <LinkIcon />
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
