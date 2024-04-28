import { CategoryTable } from '@/components/categories/categories-table';
import { TableSearch } from '@/components/categories/table-search';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Button, Flex, Table } from 'antd';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Categories',
};

const CategoryPage = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const query = searchParams.query || '';

  return (
    <div className={styles.page}>
      <Breadcrumb items={[{ title: 'Categories' }]} />
      <br />
      <Flex gap={10}>
        <TableSearch />
        <Button type="primary">
          <Link href={ROUTES.CREATE_CATEGORY}>Create New Category</Link>
        </Button>
      </Flex>
      <br />
      <Suspense fallback={<Table loading />}>
        <CategoryTable query={query} />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
