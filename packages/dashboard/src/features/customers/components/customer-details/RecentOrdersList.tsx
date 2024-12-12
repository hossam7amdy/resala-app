'use client';

import { OrderStatusTag, PaymentStatusTag } from '@/components';
import { formatCurrency } from '@/utils/currency-formatter';
import { formatDateTime } from '@/utils/date-time-formatter';
import type { Order } from '@resala/shared';
import { Card, List, Space } from 'antd';
import Link from 'next/link';
import React from 'react';

interface RecentOrdersListProps {
  orders: Order[];
}
const RecentOrdersList: React.FC<RecentOrdersListProps> = ({ orders }) => {
  return (
    <Card size="small" title={'Recent placed orders'}>
      <List
        rowKey="id"
        dataSource={orders}
        renderItem={order => (
          <List.Item extra={<span className="font-bold">{formatCurrency(+order.total)}</span>}>
            <List.Item.Meta
              title={
                <Space>
                  <Link href={'#'}>#{order.number}</Link>
                  <PaymentStatusTag status={order.paymentStatus} />
                  <OrderStatusTag status={order.orderStatus} />
                </Space>
              }
              description={formatDateTime(order.createdAt)}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export { RecentOrdersList };
