import { callEndpoint } from '@/app/lib/fetch';
import { AdminGetUsersListResponse, ENDPOINT_CONFIGS } from '@resala/shared';
import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products - Admin Resala',
};

export default async function Page() {
  return (
    <main style={{ padding: 10 }}>
      <Title>Customers</Title>
      <Suspense fallback={<Table loading />}>
        <UserTable />
      </Suspense>
    </main>
  );
}

async function UserTable() {
  const response = await callEndpoint<{}, AdminGetUsersListResponse>(
    ENDPOINT_CONFIGS.adminGetUsersList
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
          title: 'Name',
          dataIndex: 'firstName',
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
      dataSource={response?.data.users.map(user => ({
        key: user.id,
        name: user.firstName + ' ' + user.lastName,
        createdAt: new Date(user.createdAt).toLocaleString(),
      }))}
    />
  );
}
