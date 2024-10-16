import { OrderStatusChart } from '@/features/dashboard/order-status-chart';
import { getOrdersStatus } from '@/fetch/dashboard';
import { Card } from 'antd';
import React from 'react';

const OrdersStatus = async () => {
  const ordersStatus = await getOrdersStatus();

  return (
    <Card size="small" title="Orders status">
      <OrderStatusChart orders={ordersStatus} />
    </Card>
  );
};

export default OrdersStatus;
