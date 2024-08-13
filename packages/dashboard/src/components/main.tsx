import type { LayoutProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

export const Main: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Content style={{ marginLeft: 200, minHeight: '100vh', padding: 20 }} {...props}>
      {children}
    </Content>
  );
};
