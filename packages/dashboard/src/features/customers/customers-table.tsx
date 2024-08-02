'use client';

import { deleteUser } from '@/actions/user';
import { Pagination, PopconfirmDeleteButton, ResalaTooltip, TableColumn } from '@/components';
import ROUTES from '@/lib/routes';
import { formatDate, formatTime } from '@/lib/util';
import { EditFilled } from '@ant-design/icons';
import type { ListUsersResponse, User } from '@resala/shared';
import { Button, Flex, Space, Table, Tag } from 'antd';
import Link from 'next/link';

export const CustomersTable: React.FC<ListUsersResponse['data']> = ({ users, pagination }) => {
  return (
    <Flex vertical gap={10}>
      <Table
        rowKey={record => record.id}
        scroll={{ x: true, y: 500 }}
        pagination={false}
        dataSource={users}
      >
        <TableColumn width="12%" title="First name" dataIndex="firstName" />
        <TableColumn width="12%" title="Last name" dataIndex="lastName" />
        <TableColumn width="12%" title="Phone" dataIndex="phone" />
        <TableColumn width="12%" title="Email" dataIndex="email" />
        <TableColumn width="10%" title="Role" dataIndex="role" />
        <TableColumn
          width="10%"
          title="Verified"
          dataIndex="isVerified"
          render={isVerified => (
            <Tag color={isVerified ? 'success' : 'error'}>{isVerified ? 'Yes' : 'No'}</Tag>
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
              <ResalaTooltip title="Edit">
                <Button type="link" size="small">
                  <Link href={ROUTES.EDIT_CUSTOMER(user.id)}>
                    <EditFilled />
                  </Link>
                </Button>
              </ResalaTooltip>

              <PopconfirmDeleteButton
                onConfirmDelete={() => deleteUser(user.id)}
                disabled={user.role === 'ADMIN'}
              />
            </Space>
          )}
        />
      </Table>
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};
