import BackButton from '@/component/back-button';
import FormSkeleton from '@/component/form-skeleton';
import { listAllCategories } from '@/data/category';
import { findProductById } from '@/data/product';
import Form from '@/feature/products/create-form';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const EditProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'Edit Product' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card>
          <Suspense fallback={<FormSkeleton />}>
            <EditProductForm id={params.id} />
          </Suspense>
        </Card>
      </Col>
    </Row>
  );
};

const EditProductForm = async ({ id }: { id: string }) => {
  const [categories, product] = await Promise.all([listAllCategories(), findProductById(id)]);

  return <Form categories={categories} product={product!} />;
};

export default EditProductPage;
