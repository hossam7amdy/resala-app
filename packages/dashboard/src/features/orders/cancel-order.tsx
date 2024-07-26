import { deleteOrder } from '@/actions/order';
import { useMutation, useNotification } from '@/hooks';
import type { GetOrderResponse } from '@resala/shared';
import { Button, Popconfirm } from 'antd';
import React from 'react';

const CancelOrder: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  const notification = useNotification();

  const { mutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      notification.success('Ordered cancelled successfully');
    },
    onError: error => {
      notification.error(error.message);
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
