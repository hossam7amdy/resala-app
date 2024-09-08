'use client';

import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, type DrawerProps } from 'antd';
import React, { useState } from 'react';

import { LogoutButton } from './logout-button';
import { NavLinks } from './nav-links/nav-links';
import { UserInfo } from './user-info';

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
