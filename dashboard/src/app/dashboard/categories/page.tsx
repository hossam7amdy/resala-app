import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CategoryTable } from './category-table';

export const metadata: Metadata = {
  title: 'Categories',
};

const CategoryPage = async () => {
  return (
    <div style={{ padding: 10 }}>
      <Title>Categories</Title>
      <Suspense fallback={<Table loading />}>
        <CategoryTable />
      </Suspense>
    </div>
  );
};

export default CategoryPage;
