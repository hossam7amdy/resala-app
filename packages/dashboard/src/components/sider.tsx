'use client';

import { Grid, Layout } from 'antd';
import type { SiderProps } from 'antd';
import React from 'react';

import { boxShadow } from '../app/theme.config';

export const Sider: React.FC<SiderProps> = ({ children, ...props }) => {
  const { lg } = Grid.useBreakpoint();

  return (
    <Layout.Sider
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
      {children}
    </Layout.Sider>
  );
};
