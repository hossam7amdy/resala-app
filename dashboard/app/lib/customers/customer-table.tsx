// import { callEndpoint } from '@/app/lib/fetch';
// import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { AdminGetUsersListResponse } from '@resala/shared';
import { Table } from 'antd';

export const CustomerTable = async () => {
  // const response = await callEndpoint<AdminGetUsersListRequest, AdminGetUsersListResponse>(
  //   ENDPOINT_CONFIGS.adminGetUsersList
  // );

  const products: AdminGetUsersListResponse['data']['users'] = [];

  return (
    <Table
      pagination={{
        total: products.length,
        current: 1,
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
      dataSource={products}
    />
  );
};
