import BackButton from '@/component/back-button';
import FormSkeleton from '@/component/form-skeleton';
import CreateForm from '@/feature/categories/create-form';
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
            <CreateForm />
          </Suspense>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateCategoryPage;
