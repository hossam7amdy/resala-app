import Form from '@/components/products/create-form';
import BackButton from '@/components/ui/back-button';
import FormSkeleton from '@/components/ui/form-skeleton';
import { listAllCategories } from '@/data/category';
import { findProductById } from '@/data/product';
import ROUTES from '@/lib/routes';
import type { Category } from '@resala/shared';
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

  return <Form categories={flatCategories} product={product!} />;
};

export default EditProductPage;
