import { Search } from '@/components';
import { ROUTES } from '@/utils/routes';
import { Breadcrumb, Button, Col, Flex, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Products',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb items={[{ title: 'Products' }]} />
      </Col>

      <Col span={24}>
        <Flex gap={10} align="center" justify="space-between">
          <Search placeholder="Find product" />
          <Link href={ROUTES.CREATE_PRODUCT}>
            <Button type="primary">Add Product</Button>
          </Link>
        </Flex>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

export default Layout;
