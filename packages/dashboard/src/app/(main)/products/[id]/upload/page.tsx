import BackButton from '@/components/back-button';
import { listProductStocks } from '@/data/product';
import UploadForm from '@/features/products/upload-form';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import { notFound } from 'next/navigation';
import React from 'react';

const UploadImagesPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const stocks = await listProductStocks(params.id);

  if (!stocks) {
    return notFound();
  }

  const colors = stocks?.map(stock => stock.color);

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: 'Products', href: ROUTES.PRODUCTS },
            { title: 'Upload' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card>
          <UploadForm id={params.id} colors={colors} />
        </Card>
      </Col>
    </Row>
  );
};

export default UploadImagesPage;
