'use client';

import { Pagination, Table, TableColumn } from '@/components';
import { formatCurrency } from '@/utils/currency-formatter';
import { formatDate, formatTime } from '@/utils/date-time-formatter';
import type { ListOrdersResponse } from '@resala/shared';
import { Flex } from 'antd';

import { CancelOrder } from './cancel-order';
import { OrderDetails } from './order-details';
import { OrderStatus } from './order-status';
import { PaymentStatus } from './payment-status';

interface TableProps {
  total: number;
  orders: ListOrdersResponse['data']['orders'];
}
export const OrdersTable: React.FC<TableProps> = ({ orders, total }) => {
  return (
    <Flex vertical gap={10}>
      <Table
        rowClassName={() => 'table-row-pointer'}
        rowKey={record => record.id}
        pagination={false}
        dataSource={orders}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: order => <OrderDetails order={order} />,
        }}
      >
        <TableColumn title="ID" dataIndex="id" width="9%" />
        <TableColumn
          width="13%"
          title="Client"
          dataIndex="user"
          render={user => (
            <Flex vertical gap={5}>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
            </Flex>
          )}
        />
        <TableColumn
          width="13%"
          title="Amount"
          dataIndex="total"
          render={amount => formatCurrency(amount)}
        />
        <TableColumn width="13%" title="Method" dataIndex="paymentMethod" />
        <TableColumn
          width="13%"
          title="Payment Status"
          render={order => <PaymentStatus order={order} />}
          onCell={() => ({
            onClick: e => e.stopPropagation(),
          })}
        />
        <TableColumn
          width="13%"
          title="Order Status"
          render={order => <OrderStatus order={order} />}
          onCell={() => ({
            onClick: e => e.stopPropagation(),
          })}
        />
        <TableColumn
          width="13%"
          title="Created Time"
          dataIndex="createdAt"
          render={date => (
            <Flex vertical>
              <span>{formatDate(date)}</span>
              <span>{formatTime(date)}</span>
            </Flex>
          )}
        />
        <TableColumn
          width="13%"
          title="Actions"
          render={order => <CancelOrder order={order} />}
          onCell={() => ({
            onClick: e => e.stopPropagation(),
          })}
        />
      </Table>
      <Flex justify="center">
        <Pagination totalPages={total} />
      </Flex>
    </Flex>
  );
};
