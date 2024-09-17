'use client';

import { FullscreenSpinner } from '@/components';
import { logout } from '@/fetch/auth';
import { useMutation } from '@/hooks';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';

export const LogoutButton: React.FC = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
  });

  if (isLoading) {
    return <FullscreenSpinner />;
  }

  return (
    <Menu
      style={{ background: 'inherit', fontWeight: 'inherit' }}
      items={[
        {
          danger: true,
          disabled: isLoading,
          key: 'logout',
          icon: isLoading ? <LoadingOutlined spin /> : <LogoutOutlined />,
          label: 'Logout',
          onClick: async () => {
            await mutate({});
          },
        },
      ]}
    />
  );
};
