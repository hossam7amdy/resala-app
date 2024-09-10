import { resendVerificationEmail } from '@/actions/auth';
import { deleteUser } from '@/actions/user';
import { Pagination, PopconfirmDeleteButton, ResalaTooltip, Table } from '@/components';
import { listUsers } from '@/data/user';
import { formatDate, formatTime } from '@/utils/date-time-formatter';
import { ROUTES } from '@/utils/routes';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ListUsersRequest } from '@resala/shared';
import { Button, Flex, Space, Tag } from 'antd';
import Link from 'next/link';

const CustomerPage = async ({ searchParams }: { searchParams?: ListUsersRequest['query'] }) => {
  const { users, pagination } = await listUsers(searchParams ?? {});

  return (
    <Flex vertical gap={10}>
      <Table
        pagination={false}
        columns={[
          { width: '12%', title: 'First name', dataIndex: 'firstName' },
          { width: '12%', title: 'Last name', dataIndex: 'lastName' },
          { width: '12%', title: 'Phone', dataIndex: 'phone' },
          { width: '12%', title: 'Email', dataIndex: 'email' },
          { width: '10%', title: 'Role', dataIndex: 'role' },
          { width: '10%', title: 'Verified', dataIndex: 'verified' },
          { width: '12%', title: 'Last login', dataIndex: 'lastLogin' },
          { width: '10%', title: 'Joined Date', dataIndex: 'createdAt' },
          { width: '10%', title: 'Actions', dataIndex: 'actions' },
        ]}
        dataSource={users.map(user => ({
          ...user,
          verified: (
            <Flex>
              <Tag color={user.isEmailVerified ? 'success' : 'error'}>
                {user.isEmailVerified ? 'Yes' : 'No'}
              </Tag>
              {!user.isEmailVerified && (
                <Button
                  icon={<ReloadOutlined />}
                  size="small"
                  onClick={async () => {
                    'use server';
                    return resendVerificationEmail(user.email);
                  }}
                />
              )}
            </Flex>
          ),
          lastLogin: user.lastLogin ? (
            <Flex vertical>
              <span>{formatDate(user.lastLogin)}</span>
              <span>{formatTime(user.lastLogin)}</span>
            </Flex>
          ) : (
            <Tag color="warning">Never</Tag>
          ),
          createdAt: formatDate(user.createdAt),
          actions: (
            <Space>
              <ResalaTooltip title="Edit">
                <Button type="link" size="small">
                  <Link href={ROUTES.EDIT_CUSTOMER(user.id)}>
                    <EditOutlined />
                  </Link>
                </Button>
              </ResalaTooltip>

              <PopconfirmDeleteButton
                onConfirmDelete={deleteUser.bind(null, user.id)}
                disabled={user.role === 'ADMIN'}
              />
            </Space>
          ),
          key: user.id,
        }))}
      />
      <Flex justify="center">
        <Pagination totalPages={pagination.total} />
      </Flex>
    </Flex>
  );
};

export default CustomerPage;
