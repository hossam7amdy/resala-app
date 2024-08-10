'use client';

import { Grid, Layout } from 'antd';
import type { LayoutProps } from 'antd';
import React from 'react';

export const Content: React.FC<LayoutProps> = ({ children, ...props }) => {
  const { lg } = Grid.useBreakpoint();

  return (
    <Layout.Content style={{ marginLeft: lg ? 200 : 80, minHeight: '100vh' }} {...props}>
      {children}
    </Layout.Content>
  );
};
