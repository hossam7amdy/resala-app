'use client';

import { logout } from '@/fetch/auth';
import { useMutation } from '@/hooks';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ROUTES } from '@/routes';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Skeleton, Space } from 'antd';
import Link from 'next/link';

import { FullscreenSpinner } from './fullscreen-spinner';
import { Menu } from './menu';

export const UserDropdown: React.FC = () => {
  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
  });

  if (isLoadingUser) {
    return (
      <Menu
        selectedKeys={[]}
        items={[
          {
            key: 'user-settings',
            disabled: true,
            icon: <Skeleton.Avatar active />,
            label: <Skeleton.Input size="small" active className="inline-flex align-middle" />,
          },
        ]}
      />
    );
  }

  return (
    <Menu
      className="font-normal"
      mode="vertical"
      selectedKeys={[]}
      items={[
        {
          key: 'user-settings',
          icon: <Avatar size="small">{user?.firstName?.at(0)}</Avatar>,
          label: <Space>{user?.firstName}</Space>,
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
