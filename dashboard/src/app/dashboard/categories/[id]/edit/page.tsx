import EditForm from '@/components/categories/edit-form';
import { findCategoryById, listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card } from 'antd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import styles from './page.module.css';

const EditCategoryPage = async ({ params }: { params: { id: string } }) => {
  const [categories, category] = await Promise.all([
    listAllCategories(),
    findCategoryById(params.id),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[
          { title: <Link href={ROUTES.CATEGORIES}>Categories</Link> },
          { title: 'Edit Category' },
        ]}
      />
      <br />
      <Suspense fallback={<Card loading />}>
        <Card className={styles['form-card']}>
          <EditForm category={category} categories={categories} />
        </Card>
      </Suspense>
    </div>
  );
};

export default EditCategoryPage;
