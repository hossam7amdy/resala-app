import { listUsersPaginated } from '@/data/user';
import { formatDate } from '@/lib/util';
import { Flex, Table, Tag } from 'antd';

import Pagination from '../../component/pagination';

interface TableProps {
  page: number;
  limit: number;
  query: string;
}
const CustomersTable = async ({ page, limit, query }: TableProps) => {
  const users = await listUsersPaginated({ page, limit, query });

  return (
    <Flex vertical gap={10}>
      <Table
        scroll={{ x: 768, y: 500 }}
        pagination={false}
        columns={[
          { title: 'First name', dataIndex: 'firstName' },
          { title: 'Last name', dataIndex: 'lastName' },
          { title: 'Phone', dataIndex: 'phone' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Role', dataIndex: 'role' },
          { title: 'Verified', dataIndex: 'isVerified' },
          { title: 'Last login', dataIndex: 'lastLogin' },
          { title: 'Joined', dataIndex: 'createdAt' },
        ]}
        dataSource={users.users.map(user => ({
          ...user,
          key: user.id,
          isVerified: (
            <Tag color={user.isVerified ? 'success' : 'error'}>
              {user.isVerified ? 'Yes' : 'No'}
            </Tag>
          ),
          lastLogin: user.lastLogin ? formatDate(user.lastLogin) : <Tag color="warning">Never</Tag>,
          createdAt: formatDate(user.createdAt),
        }))}
      />
      <Flex justify="center">
        <Pagination totalPages={users.pagination.total} />
      </Flex>
    </Flex>
  );
};

export default CustomersTable;
