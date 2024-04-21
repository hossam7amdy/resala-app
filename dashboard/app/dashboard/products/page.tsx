import { callEndpoint } from '@/app/lib/fetch';
import {
  DefaultRequestQuery,
  ENDPOINT_CONFIGS,
  GetProductsListRequest,
  GetProductsListResponse,
} from '@resala/shared';
import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products - Admin Resala',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Partial<DefaultRequestQuery['query']>;
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const query = searchParams?.query || '';

  return (
    <div style={{ padding: 10 }}>
      <Title>Products</Title>
      <Suspense key={page + limit + query} fallback={<Table loading />}>
        <ProductTable query={query} limit={limit} page={page} />
      </Suspense>
    </div>
  );
}

async function ProductTable(query: { page: number; limit: number; query: string }) {
  const response = await callEndpoint<GetProductsListRequest, GetProductsListResponse>(
    ENDPOINT_CONFIGS.getProductsList,
    // @ts-expect-error
    { query: query }
  );

  return (
    <Table
      pagination={{
        total: response?.data.pagination.total,
        current: response?.data.pagination.page,
        pageSize: 10,
      }}
      columns={[
        {
          title: 'English',
          dataIndex: 'enName',
        },
        {
          title: 'Arabic',
          dataIndex: 'arName',
        },
        {
          title: 'Create Date',
          dataIndex: 'createdAt',
        },
      ]}
      dataSource={response?.data.products.map(product => ({
        key: product.id,
        enName: product.enName,
        arName: product.arName,
        createdAt: new Date(product.createdAt).toLocaleString(),
      }))}
    />
  );
}
