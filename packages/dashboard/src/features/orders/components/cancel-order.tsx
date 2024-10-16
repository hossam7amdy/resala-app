import { deleteOrder } from '@/fetch/orders';
import { useMutation, useNotification } from '@/hooks';
import type { GetOrderResponse } from '@resala/shared';
import { Button, Popconfirm } from 'antd';
import React from 'react';

export const CancelOrder: React.FC<{ order: GetOrderResponse['data'] }> = ({ order }) => {
  const notification = useNotification();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ orderId, userId }: { orderId: number; userId: number }) =>
      deleteOrder(orderId, userId),
    onSuccess: () => {
      notification.success('Ordered cancelled successfully');
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Popconfirm
      open={isLoading || undefined}
      title="Are you want to cancel this order?"
      description="This action cannot be undone."
      onConfirm={() => mutate({ orderId: order.id, userId: order.user?.id as number })}
      okType="default"
      okText="Yes"
      cancelText="No"
      cancelButtonProps={{ type: 'primary', disabled: isLoading }}
    >
      <Button danger type="link" disabled={order.orderStatus === 'CANCELLED'}>
        Cancel
      </Button>
    </Popconfirm>
  );
};
