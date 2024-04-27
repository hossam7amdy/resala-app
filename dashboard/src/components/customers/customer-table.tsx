import { listUsersPaginated } from '@/data/user';
import { formatDate } from '@/lib/util';
import { Table } from 'antd';

export const CustomerTable = async () => {
  const users = await listUsersPaginated();

  return (
    <Table
      pagination={{
        total: users.data.pagination.total,
        current: users.data.pagination.page,
        pageSize: users.data.pagination.limit,
      }}
      columns={[
        {
          title: 'Name',
          dataIndex: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
        },
        {
          title: 'Email Verified',
          dataIndex: 'isVerified',
        },
        {
          title: 'Last Login',
          dataIndex: 'lastLogin',
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
        },
      ]}
      dataSource={users.data.users.map(user => ({
        ...user,
        key: user.id,
        isVerified: user.isVerified ? 'Yes' : 'No',
        lastLogin: user.lastLogin ? formatDate(user.lastLogin) : 'Never',
        createdAt: formatDate(user.createdAt),
      }))}
    />
  );
};
