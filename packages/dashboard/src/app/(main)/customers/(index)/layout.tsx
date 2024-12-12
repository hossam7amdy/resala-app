import { Search } from '@/components';
import { Breadcrumb, Col, Row } from 'antd';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

const Layout: React.FC<{ children: React.ReactNode; pagination: React.ReactNode }> = ({
  children,
  pagination,
}) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Customers' }]} />
      </Col>

      <Col span={24}>
        <Search placeholder="Find customer by name, email or phone number." />
      </Col>

      <Col span={24}>{children}</Col>
      <Col span={24}>{pagination}</Col>
    </Row>
  );
};

export default Layout;
