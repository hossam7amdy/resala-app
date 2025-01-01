import { findCategoryById } from '@/actions/category';
import { BackButton, FormSkeleton } from '@/components';
import { CategoryEditor } from '@/features/categories';
import { ROUTES } from '@/routes';
import type { Params } from '@/types';
import { Breadcrumb, Card, Col, Row } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const EditCategoryPage = async (props: { params: Params }) => {
  const params = await props.params;
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

  return <CategoryEditor category={category} />;
};

export default EditCategoryPage;
