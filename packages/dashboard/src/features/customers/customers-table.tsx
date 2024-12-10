'use client';

import { Pagination, Table, TableColumn } from '@/components';
import { ROUTES } from '@/routes';
import { formatDate, formatTime } from '@/utils/date-time-formatter';
import { type ListUsersResponse, type User } from '@resala/shared';
import { Flex, Space, Tag } from 'antd';
import Link from 'next/link';

export const CustomersTable: React.FC<ListUsersResponse> = ({ data }) => {
  return (
    <Flex vertical gap={10}>
      <Table rowKey={record => record.id} pagination={false} dataSource={data}>
        <TableColumn width="12%" title="First name" dataIndex="firstName" />
        <TableColumn width="12%" title="Last name" dataIndex="lastName" />
        <TableColumn width="12%" title="Phone" dataIndex="phone" />
        <TableColumn width="12%" title="Email" dataIndex="email" />
        <TableColumn width="10%" title="Role" dataIndex="role" />
        <TableColumn
          width="10%"
          title="Verified"
          dataIndex="isEmailVerified"
          render={(isVerified: boolean) => (
            <Flex>
              <Tag color={isVerified ? 'success' : 'error'}>{isVerified ? 'Yes' : 'No'}</Tag>
            </Flex>
          )}
        />
        <TableColumn
          width="12%"
          title="Last login"
          dataIndex="lastLogin"
          render={lastLogin =>
            lastLogin ? (
              <Flex vertical>
                <span>{formatDate(lastLogin)}</span>
                <span>{formatTime(lastLogin)}</span>
              </Flex>
            ) : (
              <Tag color="warning">Never</Tag>
            )
          }
        />
        <TableColumn
          width="10%"
          title="Joined Date"
          dataIndex="createdAt"
          render={createdAt => formatDate(createdAt)}
        />
        <TableColumn
          width="10%"
          title="Actions"
          render={(_, user: User) => (
            <Space>
              <Link href={ROUTES.EDIT_CUSTOMER(user.id)}>edit</Link>
              <Link className="text-red-500" href={ROUTES.EDIT_CUSTOMER(user.id)}>
                ban
              </Link>
            </Space>
          )}
        />
      </Table>

      <Flex justify="center">
        <Pagination total={data.length} />
      </Flex>
    </Flex>
  );
};
