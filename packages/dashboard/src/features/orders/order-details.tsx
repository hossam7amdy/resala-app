import type { GetOrderResponse } from '@resala/shared';
import { Tabs } from 'antd';
import React from 'react';

import { OrderDetailsTab } from './order-details-tab';
import { PaymentDetailsTab } from './payment-details-tab';
import { ShippingDetailsTab } from './shipping-details-tab';

export const OrderDetails: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  return (
    <Tabs
      items={[
        {
          key: 'shipping',
          tabKey: 'shipping',
          label: 'Shipping Details',
          children: <ShippingDetailsTab order={order} />,
        },
        {
          key: 'order',
          tabKey: 'order',
          label: 'Order Details',
          children: <OrderDetailsTab order={order} />,
        },
        {
          key: 'payment',
          tabKey: 'payment',
          label: 'Payment Details',
          children: <PaymentDetailsTab order={order} />,
          disabled: !order.paymentDetails,
        },
      ]}
    />
  );
};
