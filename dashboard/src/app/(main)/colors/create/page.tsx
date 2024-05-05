import CreateForm from '@/components/colors/form';
import BackButton from '@/components/ui/back-button';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const CreateColorPage = () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.COLORS}>Colors</Link> },
            { title: 'Create New' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Card>
          <CreateForm />
        </Card>
      </Col>
    </Row>
  );
};

export default CreateColorPage;
