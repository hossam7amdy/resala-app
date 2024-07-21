'use client';

import { deleteUser } from '@/actions/user';
import { DeleteButton, Pagination, Tooltip } from '@/components';
import ROUTES from '@/lib/routes';
import { formatDate } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { ListUsersResponse } from '@resala/shared';
import { Button, Flex, Space, Table, Tag } from 'antd';
import Link from 'next/link';

const CustomersTable: React.FC<ListUsersResponse['data']> = ({ users, pagination }) => {
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
          { title: 'Actions', dataIndex: 'actions' },
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
          actions: (
            <Space>
              <Tooltip title="Edit">
                <Button type="link" size="small">
                  <Link href={ROUTES.EDIT_CUSTOMER(user.id)}>
                    <EditFilled />
                  </Link>
                </Button>
              </Tooltip>

              <DeleteButton deleteAction={deleteUser.bind(null, user.id)} />
            </Space>
          ),
        }))}
      />
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};

export default CustomersTable;
