'use client';

import { logout } from '@/fetch/auth';
import { useMutation } from '@/hooks';
import { ROUTES } from '@/routes';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { FullscreenSpinner } from './fullscreen-spinner';
import { Menu } from './menu';

export const UserDropdown: React.FC = () => {
  const { data } = useSession();

  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
  });

  return (
    <Menu
      className="font-normal"
      mode="vertical"
      selectedKeys={[]}
      items={[
        {
          key: 'profile',
          icon: <Avatar size="small">{data?.user.firstName.at(0)}</Avatar>,
          label: <Space>{data?.user?.firstName}</Space>,
          children: [
            {
              key: 'profile',
              icon: <UserOutlined />,
              label: <Link href={ROUTES.PROFILE}>Profile</Link>,
            },
            {
              key: 'logout',
              danger: true,
              icon: isLoading ? <FullscreenSpinner /> : <LogoutOutlined />,
              label: 'Logout',
              onClick: () => mutate({}),
            },
          ],
        },
      ]}
    />
  );
};
