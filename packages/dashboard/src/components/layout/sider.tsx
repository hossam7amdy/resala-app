'use client';

import { Grid, Layout, type SiderProps } from 'antd';
import React from 'react';

import { boxShadow } from '../../app/theme.config';
import { SideNav } from '../side-nav';

const { Sider: AntSider } = Layout;
const { useBreakpoint } = Grid;

export const Sider: React.FC<SiderProps> = ({ ...props }) => {
  const { lg, sm } = useBreakpoint();

  if (!sm) return null;

  return (
    <AntSider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        boxShadow: boxShadow,
      }}
      collapsed={!lg}
      {...props}
    >
      <SideNav />
    </AntSider>
  );
};
