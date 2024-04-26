import { CategoryTable } from '@/components/categories/categories-table';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Flex, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Categories',
};

const CategoryPage = async () => {
  return (
    <div className={styles.page}>
      <Breadcrumb items={[{ title: 'Categories' }]} />
      <br />
      <Flex justify="space-between">
        <div></div>
        <Button type="primary">
          <Link href={ROUTES.CREATE_CATEGORY}>Create New Category</Link>
        </Button>
      </Flex>
      <br />
      <Suspense fallback={<Table loading />}>
        <CategoryTable />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
