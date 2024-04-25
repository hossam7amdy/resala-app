import CreateCategoryForm from '@/components/categories/create-form';
import { listAllCategories } from '@/data/category';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Card } from 'antd';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './page.module.css';

const CreateCategoryPage = async () => {
  const categories = await listAllCategories();

  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[
          { title: <Link href={ROUTES.CATEGORIES}>Categories</Link> },
          { title: 'Create New Category' },
        ]}
      />
      <Suspense fallback={<Card loading />}>
        <Card className={styles['form-card']}>
          <CreateCategoryForm categories={categories} />
        </Card>
      </Suspense>
    </div>
  );
};

export default CreateCategoryPage;
