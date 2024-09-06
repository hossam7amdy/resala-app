'use client';

import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, type DrawerProps, Skeleton, Space, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { LogoutButton } from './logout-button';
import { NavLinks } from './nav-links/nav-links';

export const UserInfo: React.FC = () => {
  const { data } = useSession();

  const user = data?.user;

  if (!user) {
    return (
      <Space>
        <Skeleton.Avatar active />
        <Skeleton.Input active />
      </Space>
    );
  }

  return (
    <Space>
      <Avatar size="large" shape="square">
        {user.firstName.at(0)}
      </Avatar>

      <div>
        <Typography.Paragraph className="m-0 w-[200px]" ellipsis={{ tooltip: true }}>
          {user.firstName} {user.lastName}
        </Typography.Paragraph>
        <Typography.Paragraph
          type="secondary"
          className="text-xs font-normal m-0 w-[200px]"
          ellipsis={{ tooltip: true }}
        >
          {user.email}
        </Typography.Paragraph>
      </div>
    </Space>
  );
};

export const MobileDrawer: React.FC<DrawerProps> = props => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <Drawer
        open={open}
        closeIcon={false}
        title={<UserInfo />}
        placement="left"
        extra={<Button icon={<CloseOutlined />} onClick={toggleDrawer} />}
        footer={<LogoutButton />}
        onClose={toggleDrawer}
        classNames={{ body: 'px-0' }}
        {...props}
      >
        <div onClick={toggleDrawer}>
          <NavLinks />
        </div>
      </Drawer>

      <Button icon={<MenuOutlined />} onClick={toggleDrawer} />
    </>
  );
};
