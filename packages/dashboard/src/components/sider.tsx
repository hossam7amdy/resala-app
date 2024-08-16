import type { SiderProps } from 'antd';
import AntSider from 'antd/es/layout/Sider';
import React from 'react';

import { boxShadow } from '../app/theme.config';

export const Sider: React.FC<SiderProps> = ({ children, ...props }) => {
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
      {...props}
    >
      {children}
    </AntSider>
  );
};
