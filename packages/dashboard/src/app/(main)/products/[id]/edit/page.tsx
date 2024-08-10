import { BackButton, FormSkeleton } from '@/components';
import { listAllCategories } from '@/data/category';
import { findProduct } from '@/data/product';
import { Form } from '@/features/products/create-form';
import ROUTES from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const EditProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'Edit' },
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
  const [categories, product] = await Promise.all([listAllCategories(), findProduct(id)]);

  return <Form categories={categories} product={product!} />;
};

export default EditProductPage;
