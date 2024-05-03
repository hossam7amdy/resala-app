import BackButton from '@/components/ui/back-button';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Col, Form, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const EditStockPage = ({ params }: { params: { id: string } }) => {
  console.log('EditStockPage -> params', params);

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.STOCKS}>Stocks</Link> },
            { title: 'Edit' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Form />
      </Col>
    </Row>
  );
};

export default EditStockPage;
