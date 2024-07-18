import type { GetOrderResponse } from '@resala/shared';
import { Tabs } from 'antd';
import React from 'react';

export const OrderDetails: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  return (
    <Tabs
      items={[
        {
          key: 'customer',
          tabKey: 'customer',
          label: 'Customer Details',
          children: <pre>{JSON.stringify(order.user, null, 2)}</pre>,
        },
        {
          key: 'payment',
          tabKey: 'payment',
          label: 'Payment Details',
          children: <pre>{JSON.stringify(order.paymentDetails, null, 2)}</pre>,
          disabled: !order.paymentDetails,
        },
        {
          key: 'shipping',
          tabKey: 'shipping',
          label: 'Shipping Details',
          children: <pre>{JSON.stringify(order.shippingDetails, null, 2)}</pre>,
        },
        {
          key: 'order',
          tabKey: 'order',
          label: 'Order Details',
          children: <pre>{JSON.stringify(order.orderItems, null, 2)}</pre>,
        },
      ]}
    />
  );
};
