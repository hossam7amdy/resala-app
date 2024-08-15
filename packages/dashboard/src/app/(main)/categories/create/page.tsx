import { BackButton, FormSkeleton } from '@/components';
import CreateForm from '@/features/categories/create-form';
import { ROUTES } from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

const CreateCategoryPage = () => {
  return (
    <Row gutter={[10, 50]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.CATEGORIES}>Categories</Link> },
            { title: 'New' },
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
