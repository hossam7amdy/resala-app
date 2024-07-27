'use client';

import { updateOrderStatus } from '@/actions/order';
import { useMutation, useNotification } from '@/hooks';
import type { GetOrderResponse, OrderStatusType } from '@resala/shared';
import { OrderStatus as OrderStatusEnum } from '@resala/shared';
import { Popconfirm, Select, Tag } from 'antd';
import type { TagProps } from 'antd';
import React, { useState } from 'react';

const StatusTag = ({ status }: { status: OrderStatusType }) => {
  let color: TagProps['color'] = 'default';

  switch (status) {
    case 'PENDING':
      color = 'warning';
      break;
    case 'FULFILLED':
      color = 'processing';
      break;
    case 'CANCELLED':
      color = 'error';
      break;
    case 'SHIPPED':
      color = 'processing';
      break;
    case 'DELIVERED':
      color = 'success';
      break;
  }

  return (
    <Tag style={{ fontWeight: 500, width: 80 }} color={color} bordered={false}>
      {status}
    </Tag>
  );
};

interface OrderStatusProps {
  order: GetOrderResponse['data'];
}
export const OrderStatus: React.FC<OrderStatusProps> = ({ order }) => {
  const { id, orderStatus, paymentStatus } = order;

  const [newOrderStatus, setNewOrderStatus] = useState(orderStatus);

  const notifications = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateOrderStatus.bind(null, id),
    onSuccess: () => {
      notifications.success('Order has been updated successfully');
    },
    onError: error => {
      notifications.error(error.message);
    },
  });

  return (
    <Popconfirm
      open={orderStatus !== newOrderStatus || isLoading}
      title="Are you sure?"
      description={`to change order status from ${orderStatus} to ${newOrderStatus}`}
      onConfirm={() => mutate({ paymentStatus, orderStatus: newOrderStatus })}
      onCancel={() => setNewOrderStatus(orderStatus)}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Select
        size="small"
        variant="borderless"
        style={{ width: 'max-content' }}
        value={newOrderStatus}
        options={[
          {
            label: <StatusTag status={OrderStatusEnum.PENDING} />,
            value: OrderStatusEnum.PENDING,
            disabled: orderStatus === OrderStatusEnum.PENDING,
          },
          {
            label: <StatusTag status={OrderStatusEnum.FULFILLED} />,
            value: OrderStatusEnum.FULFILLED,
            disabled: orderStatus === OrderStatusEnum.FULFILLED,
          },
          {
            label: <StatusTag status={OrderStatusEnum.SHIPPED} />,
            value: OrderStatusEnum.SHIPPED,
            disabled: orderStatus === OrderStatusEnum.SHIPPED,
          },
          {
            label: <StatusTag status={OrderStatusEnum.DELIVERED} />,
            value: OrderStatusEnum.DELIVERED,
            disabled: orderStatus === OrderStatusEnum.DELIVERED,
          },
          {
            label: <StatusTag status={OrderStatusEnum.CANCELLED} />,
            value: OrderStatusEnum.CANCELLED,
            disabled: true,
          },
        ]}
        onChange={setNewOrderStatus}
        disabled={orderStatus === 'CANCELLED'}
      />
    </Popconfirm>
  );
};
