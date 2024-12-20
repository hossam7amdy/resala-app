import { Search } from '@/components';
import { Col, Row } from 'antd';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Stocks',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Search />
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default Layout;
