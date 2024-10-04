import type { LayoutProps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

export const Main: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Content
      className="ml-0 sm:ml-[80px] lg:ml-[200px]"
      style={{ marginLeft: 200, minHeight: '100vh', padding: 20 }}
      {...props}
    >
      {children}
    </Content>
  );
};
