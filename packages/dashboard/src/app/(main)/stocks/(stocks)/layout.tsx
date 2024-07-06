import { Search } from '@/components';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Col, Flex, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Stocks',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Stocks' }]} />
      </Col>
      <Col span={24}>
        <Flex gap={10}>
          <Search />
          <Link href={ROUTES.CREATE_STOCK('')}>
            <Button type="primary">Create New Stock</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default Layout;
