'use client';

import { logout } from '@/actions/auth';
import { useMutation } from '@/hooks';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Modal, Spin } from 'antd';
import React from 'react';

export const LogoutButton: React.FC = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
  });

  if (isLoading) {
    return (
      <Modal
        open={true}
        footer={null}
        closable={false}
        centered
        className="w-min"
        classNames={{
          content: 'w-min bg-transparent shadow-none',
        }}
      >
        <Spin />
      </Modal>
    );
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
