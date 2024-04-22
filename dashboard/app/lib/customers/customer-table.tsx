import { callEndpoint } from '@/app/lib/fetch';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { AdminGetUsersListRequest, AdminGetUsersListResponse } from '@resala/shared';
import { Table } from 'antd';

export const CustomerTable = async () => {
  const response = await callEndpoint<AdminGetUsersListRequest, AdminGetUsersListResponse>(
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
};
