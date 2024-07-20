import { deleteOrder } from '@/actions/order';
import { useMutation } from '@/hooks';
import type { GetOrderResponse } from '@resala/shared';
import { App, Button, Popconfirm } from 'antd';
import React from 'react';

const CancelOrder: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  const { notification } = App.useApp();

  const { mutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      notification.success({
        message: 'Success',
        description: 'Ordered cancelled successfully',
      });
    },
    onError: error => {
      notification.error({
        message: error.name,
        description: error.message,
      });
    },
  });

  return (
    <Popconfirm
      title="Are you want to cancel this order?"
      description="This action cannot be undone."
      onConfirm={() => mutate(order.id)}
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
