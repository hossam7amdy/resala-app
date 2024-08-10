'use client';

import ROUTES from '@/utils/routes';
import {
  FileProtectOutlined,
  HomeOutlined,
  ProductOutlined,
  SkinOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// import styles from './nav-links.module.css';

// const links = [
//   { name: 'Home', href: ROUTES.DASHBOARD, Icon: HomeOutlined },
//   { name: 'Categories', href: ROUTES.CATEGORIES, Icon: TagOutlined },
//   { name: 'Products', href: ROUTES.PRODUCTS, Icon: ProductOutlined },
//   { name: 'Stocks', href: ROUTES.STOCKS, Icon: SkinOutlined },
//   { name: 'Orders', href: ROUTES.ORDERS, Icon: FileProtectOutlined },
//   { name: 'Customers', href: ROUTES.CUSTOMERS, Icon: UserOutlined },
// ];

// export const NavLinks = () => {
//   const pathname = usePathname();

//   return (
//     <ul className={styles['links']}>
//       {links.map(({ name, href, Icon }) => {
//         const LinkIcon = Icon;
//         return (
//           <li key={name}>
//             <Link
//               href={href}
//               className={`${styles['link-item']} ${pathname.startsWith(href) && styles['link-active']}`}
//             >
//               <LinkIcon />
//               <span>{name}</span>
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
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
    key: 'stocks',
    label: 'Stocks',
    icon: <SkinOutlined />,
    children: [
      {
        key: ROUTES.STOCKS,
        label: <Link href={ROUTES.STOCKS}>Stocks</Link>,
      },
      {
        key: ROUTES.COLORS,
        label: <Link href={ROUTES.COLORS}>Colors</Link>,
      },
      {
        key: ROUTES.SIZES,
        label: <Link href={ROUTES.SIZES}>Sizes</Link>,
      },
    ],
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

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const NavLinks: React.FC = () => {
  const pathname = usePathname();

  const [, ...keys] = pathname.split('/');
  const activeKeys = keys.map((_, i) => `/${keys.slice(0, i + 1).join('/')}`);
  const [stateOpenKeys, setStateOpenKeys] = useState(activeKeys);

  const onOpenChange: MenuProps['onOpenChange'] = openKeys => {
    const currentOpenKey = openKeys.find(key => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      console.log('close', openKeys);
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[`/${keys.join('/')}`]}
      items={items}
      style={{ fontWeight: 600, background: 'transparent' }}
    />
  );
};

export default NavLinks;
