import BackButton from '@/component/back-button';
import { listProductStocks } from '@/data/product';
import UploadForm from '@/feature/products/upload-form';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import React from 'react';

const UploadImagesPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const stocks = await listProductStocks(params.id);
  const colors = stocks.map(stock => stock.color);

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
