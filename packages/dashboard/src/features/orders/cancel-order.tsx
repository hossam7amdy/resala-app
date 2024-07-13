import { deleteOrder } from '@/actions/order';
import type { GetOrderResponse } from '@resala/shared';
import { Button, Popconfirm } from 'antd';
import React from 'react';

const CancelOrder: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  return (
    <Popconfirm
      title="Are you want to cancel this order?"
      description="This action cannot be undone."
      onConfirm={() => deleteOrder(order.id)}
      okType="default"
      cancelButtonProps={{ type: 'primary' }}
    >
      <Button
        danger
        type="link"
        disabled={
          order.orderStatus === 'CANCELLED' ||
          order.paymentStatus === 'VOIDED' ||
          order.paymentStatus === 'REFUNDED'
        }
      >
        Cancel
      </Button>
    </Popconfirm>
  );
};

export default CancelOrder;
