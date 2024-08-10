import { BackButton, FormSkeleton } from '@/components';
import { listAllCategories } from '@/data/category';
import { Form } from '@/features/products/create-form';
import ROUTES from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const CreateProductPage = () => {
  return (
    <Row gutter={[10, 20]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'New' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card>
          <Suspense fallback={<FormSkeleton />}>
            <CreateProductForm />
          </Suspense>
        </Card>
      </Col>
    </Row>
  );
};

const CreateProductForm = async () => {
  const categories = await listAllCategories();

  return <Form categories={categories} />;
};

export default CreateProductPage;
