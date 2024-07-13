'use client';

import { TableColumn } from '@/components';
import { formatCurrency, formatDate, formatTime } from '@/lib/util';
import type { GetOrdersListResponse } from '@resala/shared';
import { Table as AntTable, Flex } from 'antd';

import Pagination from '../../components/pagination';
import CancelOrder from './cancel-order';
import OrderStatus from './order-status';
import PaymentStatus from './payment-status';

interface TableProps {
  total: number;
  orders: GetOrdersListResponse['data']['orders'];
}
const Table: React.FC<TableProps> = ({ orders, total }) => {
  return (
    <Flex vertical gap={10}>
      <AntTable
        rowKey={record => record.id}
        scroll={{ x: true, y: 500 }}
        pagination={false}
        dataSource={orders}
      >
        <TableColumn title="ID" dataIndex="id" />
        <TableColumn
          title="client"
          dataIndex="user"
          render={user => (
            <Flex vertical gap={5}>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
            </Flex>
          )}
        />
        <TableColumn title="Amount" dataIndex="total" render={amount => formatCurrency(amount)} />
        <TableColumn width={100} title="Method" dataIndex="paymentMethod" />
        <TableColumn
          title="Payment Status"
          dataIndex="paymentStatus"
          render={status => <PaymentStatus status={status} />}
        />
        <TableColumn
          title="Order Status"
          render={order => <OrderStatus id={order.id} status={order.orderStatus} />}
        />
        <TableColumn
          title="Created Time"
          dataIndex="createdAt"
          render={date => (
            <Flex vertical>
              <span>{formatDate(date)}</span>
              <span>{formatTime(date)}</span>
            </Flex>
          )}
        />
        <TableColumn title="Actions" render={order => <CancelOrder order={order} />} />
      </AntTable>
      <Flex justify="center">
        <Pagination totalPages={total} />
      </Flex>
    </Flex>
  );
};

export default Table;
