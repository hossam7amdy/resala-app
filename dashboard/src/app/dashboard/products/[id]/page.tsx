import ImagesSkeleton from '@/components/products/images-skeleton';
import ImagesTab from '@/components/products/images-tab';
import StocksTab from '@/components/products/stocks-tab';
import BackButton from '@/components/ui/back-button';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Col, Row, Table, Tabs } from 'antd';
import React, { Suspense } from 'react';

const ProductDetails = ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: 'Products', href: ROUTES.PRODUCTS },
            { title: 'Products Details' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Tabs
          defaultActiveKey="images"
          items={[
            {
              key: 'images',
              label: 'Images',
              children: (
                <Suspense fallback={<ImagesSkeleton />}>
                  <ImagesTab id={params.id} />
                </Suspense>
              ),
            },
            {
              key: 'stocks',
              label: 'Stocks',
              children: (
                <Suspense fallback={<Table loading />}>
                  <StocksTab id={params.id} />
                </Suspense>
              ),
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default ProductDetails;
