'use client';

import { Pagination } from '@/components';
import { formatDate } from '@/lib/util';
import type { AdminGetUsersListResponse } from '@resala/shared';
import { Flex, Table, Tag } from 'antd';

const CustomersTable: React.FC<AdminGetUsersListResponse['data']> = ({ users, pagination }) => {
  return (
    <Flex vertical gap={10}>
      <Table
        rowKey={record => record.id}
        scroll={{ x: true, y: 500 }}
        pagination={false}
        columns={[
          { title: 'First name', dataIndex: 'firstName' },
          { title: 'Last name', dataIndex: 'lastName' },
          { title: 'Phone', dataIndex: 'phone' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Role', dataIndex: 'role' },
          { title: 'Verified', dataIndex: 'isVerified' },
          { title: 'Last login', dataIndex: 'lastLogin' },
          { title: 'Joined Date', dataIndex: 'createdAt' },
        ]}
        dataSource={users.map(user => ({
          ...user,
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
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};

export default CustomersTable;
