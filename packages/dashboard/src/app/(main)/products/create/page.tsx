import Form from '@/components/products/create-form';
import BackButton from '@/components/ui/back-button';
import FormSkeleton from '@/components/ui/form-skeleton';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import type { Category } from '@resala/shared';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const CreateProductPage = () => {
  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.PRODUCTS}>Products</Link> },
            { title: 'Create New Product' },
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

  const flatCategories: Category[] = [];
  categories.forEach(category => {
    // eslint-disable-next-line no-unused-vars
    const { subCategories, mainCategory: _, ...currentCategory } = category;

    if (subCategories.length > 0) {
      subCategories.forEach(sub => {
        flatCategories.push(sub);
      });
    } else {
      flatCategories.push(currentCategory);
    }
  });

  return <Form categories={flatCategories} />;
};

export default CreateProductPage;
