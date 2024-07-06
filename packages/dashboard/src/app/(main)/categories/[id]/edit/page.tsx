import BackButton from '@/components/back-button';
import FormSkeleton from '@/components/form-skeleton';
import { findCategoryById } from '@/data/category';
import EditForm from '@/features/categories/edit-form';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const EditCategoryPage = async ({ params }: { params: { id: string } }) => {
  return (
    <Row gutter={[10, 50]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.CATEGORIES}>Categories</Link> },
            { title: 'Edit Category' },
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
