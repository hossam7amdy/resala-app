import { BackButton, FormSkeleton } from '@/components';
import EditForm from '@/features/categories/edit-form';
import { findCategoryById } from '@/fetch/category';
import { ROUTES } from '@/utils/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const EditCategoryPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 50]}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.CATEGORIES}>Categories</Link> },
            { title: 'Edit' },
          ]}
        />
      </Col>
      <Col span={24}>
        <Card>
          <Suspense fallback={<FormSkeleton />}>
            <EditCategoryForm id={params.id} />
          </Suspense>
        </Card>
      </Col>
    </Row>
  );
};

const EditCategoryForm = async ({ id }: { id: string }) => {
  const category = await findCategoryById(id);

  if (!category) {
    notFound();
  }

  return <EditForm category={category} />;
};

export default EditCategoryPage;
