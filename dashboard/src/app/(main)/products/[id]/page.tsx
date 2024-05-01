import BackButton from '@/components/ui/back-button';
import { findProductById } from '@/data/product';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await findProductById(params.id);

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'Product Details' },
          ]}
        />
      </Col>
      <Col span={24}>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </Col>
    </Row>
  );
};

export default ProductPage;
