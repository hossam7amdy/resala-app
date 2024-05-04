import { listUsersPaginated } from '@/data/user';
import { formatDate } from '@/lib/util';
import { Table as AntTable, Flex } from 'antd';

import Pagination from '../ui/pagination';

interface TableProps {
  page: number;
  limit: number;
  query: string;
}
const CustomersTable = async ({ page, limit, query }: TableProps) => {
  const users = await listUsersPaginated({ page, limit, query });

  return (
    <>
      <AntTable
        scroll={{ x: 768, y: 500 }}
        pagination={false}
        columns={[
          { title: 'First Name', dataIndex: 'firstName' },
          { title: 'Last Name', dataIndex: 'lastName' },
          { title: 'Phone', dataIndex: 'phone' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Role', dataIndex: 'role' },
          { title: 'Email Verified', dataIndex: 'isVerified' },
          { title: 'Last Login', dataIndex: 'lastLogin' },
          { title: 'Created At', dataIndex: 'createdAt' },
        ]}
        dataSource={users.users.map(user => ({
          ...user,
          key: user.id,
          isVerified: user.isVerified ? 'Yes' : 'No',
          lastLogin: user.lastLogin ? formatDate(user.lastLogin) : 'Never',
          createdAt: formatDate(user.createdAt),
        }))}
      />
      <Flex justify="center">
        <Pagination totalPages={users.pagination.total} />
      </Flex>
    </>
  );
};

export default CustomersTable;
