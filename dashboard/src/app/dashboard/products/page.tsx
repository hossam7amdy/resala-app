import { ProductTable } from '@/components/products/product-table';
import ROUTES from '@/lib/routes';
import type { DefaultRequestQuery } from '@resala/shared';
import { Breadcrumb, Button, Flex, Table } from 'antd';
import Search from 'antd/es/input/Search';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Products',
};

const ProductPage = async ({
  searchParams,
}: {
  searchParams?: Partial<DefaultRequestQuery['query']>;
}) => {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const query = searchParams?.query || '';
  const deleted = searchParams?.deleted || false;

  return (
    <div className={styles.page}>
      <Breadcrumb items={[{ title: 'Products' }]} />
      <br />
      <Flex gap={10} align="center" justify="space-between">
        <Search placeholder="Find product" />
        <Button type="primary">
          <Link href={ROUTES.CREATE_PRODUCT}>Create New Product</Link>
        </Button>
      </Flex>
      <br />
      <Suspense key={page + limit + query} fallback={<Table loading />}>
        <ProductTable query={query} limit={limit} page={page} deleted={deleted} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
