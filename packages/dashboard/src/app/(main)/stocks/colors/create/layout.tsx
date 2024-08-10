import { BackButton } from '@/components';
import ROUTES from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Create Color',
};

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.COLORS}>Colors</Link> },
            { title: 'New' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Card>{children}</Card>
      </Col>
    </Row>
  );
};

export default CreateLayout;
