'use client';

import { FullscreenSpinner, Menu } from '@/components';
import { useLogout } from '@/hooks';
import { ROUTES } from '@/routes';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const LogoutButton: React.FC = () => {
  const pathname = usePathname();
  const { isLoading, logout } = useLogout();

  const selectedKeys = pathname.split('/').map(path => `/${path}`);

  return (
    <Menu
      selectedKeys={selectedKeys}
      className="font-normal"
      items={[
        {
          key: ROUTES.PROFILE,
          icon: <UserOutlined />,
          label: <Link href={ROUTES.PROFILE}>My profile</Link>,
        },
        {
          danger: true,
          disabled: isLoading,
          key: 'logout',
          icon: isLoading ? <FullscreenSpinner /> : <LogoutOutlined />,
          label: 'Logout',
          onClick: logout,
        },
      ]}
    />
  );
};
