import { ProductTable } from '@/app/dashboard/products/product-table';
import type { DefaultRequestQuery } from '@resala/shared';
import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
    <div style={{ padding: 10 }}>
      <Title>Products</Title>
      <Suspense key={page + limit + query} fallback={<Table loading />}>
        <ProductTable query={query} limit={limit} page={page} deleted={deleted} />
      </Suspense>
    </div>
  );
};

export default ProductPage;
