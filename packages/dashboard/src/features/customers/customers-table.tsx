'use client';

import {
  Pagination,
  PopconfirmDeleteButton,
  ResalaTooltip,
  Table,
  TableColumn,
} from '@/components';
import { deleteUser } from '@/fetch/users';
import { formatDate, formatTime } from '@/utils/date-time-formatter';
import { ROUTES } from '@/utils/routes';
import { EditOutlined } from '@ant-design/icons';
import type { ListUsersResponse, User } from '@resala/shared';
import { Button, Flex, Space, Tag } from 'antd';
import Link from 'next/link';

import { ResendEmailVerificationButton } from './resend-email-verification-button';

export const CustomersTable: React.FC<ListUsersResponse['data']> = ({ users, pagination }) => {
  return (
    <Flex vertical gap={10}>
      <Table rowKey={record => record.id} pagination={false} dataSource={users}>
        <TableColumn width="12%" title="First name" dataIndex="firstName" />
        <TableColumn width="12%" title="Last name" dataIndex="lastName" />
        <TableColumn width="12%" title="Phone" dataIndex="phone" />
        <TableColumn width="12%" title="Email" dataIndex="email" />
        <TableColumn width="10%" title="Role" dataIndex="role" />
        <TableColumn
          width="10%"
          title="Verified"
          dataIndex="isEmailVerified"
          render={(isVerified: boolean, user: User) => (
            <Flex>
              <Tag color={isVerified ? 'success' : 'error'}>{isVerified ? 'Yes' : 'No'}</Tag>
              {!isVerified && <ResendEmailVerificationButton email={user.email} />}
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
              <ResalaTooltip title="Edit">
                <Button type="link" size="small">
                  <Link href={ROUTES.EDIT_CUSTOMER(user.id)}>
                    <EditOutlined />
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
