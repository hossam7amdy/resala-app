import CreateForm from '@/components/categories/create-form';
import BackButton from '@/components/ui/back-button';
import FormSkeleton from '@/components/ui/form-skeleton';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const CreateCategoryPage = () => {
  return (
    <Row gutter={[10, 50]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.CATEGORIES}>Categories</Link> },
            { title: 'Create New Category' },
          ]}
        />
      </Col>

      <Col span={24}>
        <Card>
          <Suspense fallback={<FormSkeleton />}>
            <CreateCategoryForm />
          </Suspense>
        </Card>
      </Col>
    </Row>
  );
};

const CreateCategoryForm = async () => {
  const categories = await listAllCategories();

  return <CreateForm categories={categories} />;
};

export default CreateCategoryPage;
