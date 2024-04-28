import CreateForm from '@/components/products/create-form';
import BackButton from '@/components/ui/back-button';
import FormSkeleton from '@/components/ui/form-skeleton';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { type GetCategoryResponse } from '@resala/shared';
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

  const flatCategories: Omit<GetCategoryResponse['data'], 'subCategories'>[] = [];
  categories.forEach(category => {
    const { subCategories, ...main } = category;
    flatCategories.push(main);

    if (subCategories.length > 0) {
      subCategories.forEach(sub => {
        flatCategories.push(sub);
      });
    }
  });

  return <CreateForm categories={flatCategories} />;
};

export default CreateProductPage;
