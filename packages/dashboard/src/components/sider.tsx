'use client';

import { Grid, Layout, type SiderProps } from 'antd';
import React from 'react';

import { boxShadow } from '../app/theme.config';

const { Sider: AntSider } = Layout;
const { useBreakpoint } = Grid;

export const Sider: React.FC<SiderProps> = ({ children, ...props }) => {
  const { md } = useBreakpoint();

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
      collapsed={!md}
      {...props}
    >
      {children}
    </AntSider>
  );
};
