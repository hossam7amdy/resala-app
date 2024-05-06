import BackButton from '@/components/ui/back-button';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const CreateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.SIZES}>Sizes</Link> },
            { title: 'Create New' },
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
