'use client';

import { Table } from '@/components';
import { ROUTES } from '@/routes';
import { formatDate } from '@/utils/date-time-formatter';
import type { ListUsersResponse } from '@resala/shared';
import { type TableProps } from 'antd';
import { useRouter } from 'next/navigation';

import { BanUserCell } from './BanUserCell';
import { EmailCell } from './EmailCell';
import { LocationCell } from './LocationCell';

const columns: TableProps<ListUsersResponse['data'][number]>['columns'] = [
  {
    title: 'Customer name',
    render: (_, user) => user.firstName + ' ' + user.lastName,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (_, user) => <EmailCell user={user} />,
  },
  {
    title: 'Location',
    dataIndex: 'addresses',
    render: addresses => <LocationCell addresses={addresses} />,
  },
  {
    title: 'Orders',
    dataIndex: 'ordersCount',
    render: ordersCount => <span>{ordersCount} orders</span>,
  },
  {
    title: 'Joined Date',
    dataIndex: 'createdAt',
    render: createdAt => formatDate(createdAt),
  },
  {
    title: 'Actions',
    onCell: () => ({ onClick: e => e.stopPropagation() }),
    render: (_, user) => <BanUserCell user={user} />,
  },
];

export const CustomersTable: React.FC<ListUsersResponse> = ({ data }) => {
  const { push } = useRouter();

  return (
    <Table
      size="small"
      rowHoverable
      rowKey={record => record.id}
      pagination={false}
      dataSource={data}
      columns={columns}
      onRow={record => ({
        className: 'cursor-pointer',
        onClick: () => push(ROUTES.CUSTOMER_DETAILS(record.id)),
      })}
    />
  );
};
