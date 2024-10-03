'use client';

import { Pagination, TableColumn } from '@/components';
import { formatCurrency } from '@/utils/currency-formatter';
import { formatDate, formatTime } from '@/utils/date-time-formatter';
import type { ListOrdersResponse } from '@resala/shared';
import { Flex, Table } from 'antd';

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
      <Table<ListOrdersResponse['data']['orders'][number]>
        scroll={{ x: 768, y: 500 }}
        rowClassName={() => 'table-row-pointer'}
        rowKey={record => record.id}
        pagination={false}
        dataSource={orders}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: order => <OrderDetails order={order} />,
        }}
      >
        <TableColumn
          ellipsis
          title="Client"
          dataIndex="user"
          render={user => (
            <Flex vertical gap={5}>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
            </Flex>
          )}
        />
        <TableColumn title="Amount" dataIndex="total" render={amount => formatCurrency(amount)} />
        <TableColumn
          width={150}
          title="Payment Status"
          render={order => <PaymentStatus order={order} />}
          onCell={() => ({
            onClick: e => e.stopPropagation(),
          })}
        />
        <TableColumn
          title="Order Status"
          width={150}
          render={order => <OrderStatus order={order} />}
          onCell={() => ({
            onClick: e => e.stopPropagation(),
          })}
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
        <TableColumn
          title="Actions"
          render={order => <CancelOrder order={order} />}
          onCell={() => ({
            onClick: e => e.stopPropagation(),
          })}
        />
      </Table>
      <Flex justify="center">
        <Pagination total={total} />
      </Flex>
    </Flex>
  );
};
