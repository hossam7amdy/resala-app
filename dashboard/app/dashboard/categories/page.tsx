import { callEndpoint } from '@/app/lib/fetch';
import {
  ENDPOINT_CONFIGS,
  GetCategoriesListRequest,
  GetCategoriesListResponse,
} from '@resala/shared';
import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Categories - Admin Resala',
};

export default async function Page() {
  return (
    <main style={{ padding: 10 }}>
      <Title>Categories</Title>
      <Suspense fallback={<Table loading />}>
        <CategoryTable />
      </Suspense>
    </main>
  );
}

async function CategoryTable() {
  const response = await callEndpoint<GetCategoriesListRequest, GetCategoriesListResponse>(
    ENDPOINT_CONFIGS.listCategories
  );

  return (
    <Table
      pagination={{ total: response?.data.length, pageSize: 10 }}
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
      dataSource={response?.data.map(category => ({
        key: category.id,
        enName: category.enName,
        arName: category.arName,
        createdAt: new Date(category.createdAt).toLocaleString(),
      }))}
    />
  );
}
