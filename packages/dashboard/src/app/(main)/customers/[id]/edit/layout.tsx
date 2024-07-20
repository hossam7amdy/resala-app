import { BackButton } from '@/components';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit Customer',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Row gutter={[10, 50]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.CUSTOMERS}>Customers</Link> },
            { title: 'Edit' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card>{children}</Card>
      </Col>
    </Row>
  );
};

export default Layout;
