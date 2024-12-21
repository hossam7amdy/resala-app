'use client';

import { updateOrderStatus } from '@/actions/orders';
import { useMutation, useNotification } from '@/hooks';
import type { GetOrderResponse, OrderStatusType } from '@resala/shared';
import { Popconfirm, Select, Tag } from 'antd';
import type { TagProps } from 'antd';
import React, { useEffect, useState } from 'react';

const StatusTag: React.FC<{ status: OrderStatusType }> = ({ status }) => {
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
export const OrderStatus: React.FC<OrderStatusProps> = ({
  order: { id, orderStatus, paymentStatus },
}) => {
  const notifications = useNotification();

  const [popOpen, setPopOpen] = useState(false);

  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatusType>();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateOrderStatus.bind(null, id),
    onSuccess: () => {
      setPopOpen(false);
      notifications.success('Order has been updated successfully');
    },
    onError: error => {
      notifications.error(error.message);
    },
  });

  useEffect(() => {
    setNewOrderStatus(orderStatus);
  }, [orderStatus]);

  const onCancel = () => {
    setNewOrderStatus(orderStatus);
    setPopOpen(false);
  };

  const onChange = (status: OrderStatusType) => {
    setNewOrderStatus(status);
    setPopOpen(true);
  };

  return (
    <Popconfirm
      open={popOpen || isLoading}
      title="Are you sure?"
      description={
        <>
          <b>Warning:</b> This will change the status of the order from
          <StatusTag status={orderStatus} />
          to <StatusTag status={newOrderStatus as OrderStatusType} />
        </>
      }
      onConfirm={() => mutate({ paymentStatus, orderStatus: newOrderStatus! })}
      onCancel={onCancel}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Select
        size="small"
        variant="borderless"
        style={{ width: 'max-content' }}
        defaultValue={orderStatus}
        value={newOrderStatus}
        options={[
          {
            label: <StatusTag status={'PENDING'} />,
            value: 'PENDING',
          },
          {
            label: <StatusTag status={'FULFILLED'} />,
            value: 'FULFILLED',
          },
          {
            label: <StatusTag status={'SHIPPED'} />,
            value: 'SHIPPED',
          },
          {
            label: <StatusTag status={'DELIVERED'} />,
            value: 'DELIVERED',
          },
          {
            label: <StatusTag status={'CANCELLED'} />,
            value: 'CANCELLED',
            disabled: true,
          },
        ]}
        onChange={onChange}
        disabled={isLoading || orderStatus === 'CANCELLED'}
      />
    </Popconfirm>
  );
};
