import { deleteOrder } from '@/actions/order';
import { getOrdersList } from '@/data/orders';
import { formatCurrency, formatDateTime } from '@/lib/util';
import { EyeFilled } from '@ant-design/icons';
import { Table as AntTable, Flex, Space } from 'antd';
import Link from 'next/link';

import DeleteButton from '../ui/delete-button';
import Pagination from '../ui/pagination';
import OrderStatus from './order-status';
import PaymentStatus from './payment-status';

interface TableProps {
  page: number;
  limit: number;
}
const Table = async ({ page, limit }: TableProps) => {
  const { pagination, orders } = await getOrdersList({ page, limit });

  return (
    <Flex vertical gap={10}>
      <AntTable
        scroll={{ x: 768, y: 500 }}
        pagination={false}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Client Name', dataIndex: 'clientName' },
          { title: 'Amount', dataIndex: 'amount' },
          { title: 'Payment Method', dataIndex: 'paymentMethod' },
          { title: 'Payment Status', dataIndex: 'paymentStatus' },
          { title: 'Order Status', dataIndex: 'orderStatus' },
          { title: 'Created At', dataIndex: 'createdAt' },
          { title: 'Actions', dataIndex: 'actions' },
        ]}
        dataSource={orders.map(order => ({
          key: order.id,
          id: order.id,
          clientName: '',
          amount: formatCurrency(order.total),
          paymentMethod: order.paymentMethod,
          paymentStatus: <PaymentStatus status={order.paymentStatus} />,
          orderStatus: <OrderStatus id={order.id} status={order.orderStatus} />,
          createdAt: formatDateTime(order.createdAt),
          actions: (
            <Space>
              <Link href={''}>
                <EyeFilled />
              </Link>
              <DeleteButton
                deleteAction={deleteOrder.bind(null, order.id)}
                disabled={
                  order.orderStatus === 'CANCELLED' ||
                  order.paymentStatus === 'VOIDED' ||
                  order.paymentStatus === 'REFUNDED'
                }
              />
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

export default Table;
