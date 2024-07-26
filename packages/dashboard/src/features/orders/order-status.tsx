'use client';

import { updateOrderStatus } from '@/actions/order';
import { useMutation, useNotification } from '@/hooks';
import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { GetOrderResponse } from '@resala/shared';
import { OrderStatus as OrderStatusEnum } from '@resala/shared';
import { Button, Flex, Form, Select, Tag } from 'antd';
import { useState } from 'react';

interface OrderStatusProps {
  id: string | number;
  status: GetOrderResponse['data']['orderStatus'];
}
const OrderStatus: React.FC<OrderStatusProps> = ({ id, status }) => {
  const notifications = useNotification();
  const [editMode, setEditMode] = useState(false);
  const { isLoading, mutate } = useMutation({
    mutationFn: updateOrderStatus.bind(null, id),
    onSuccess: () => {
      notifications.success('Order status has been updated successfully');
      setEditMode(false);
    },
    onError: error => {
      notifications.error(error.message);
    },
  });

  if (editMode) {
    return (
      <Form size="small" name="order-status" onFinish={mutate} initialValues={{ status }}>
        <Form.Item name="status" noStyle>
          <Select
            options={[
              {
                label: 'Pending',
                value: OrderStatusEnum.PENDING,
                disabled: status === 'PENDING',
              },
              {
                label: 'Fulfilled',
                value: OrderStatusEnum.FULFILLED,
                disabled: status === 'FULFILLED',
              },
              {
                label: 'Shipped',
                value: OrderStatusEnum.SHIPPED,
                disabled: status === 'SHIPPED',
              },
              {
                label: 'Delivered',
                value: OrderStatusEnum.DELIVERED,
                disabled: status === 'DELIVERED',
              },
            ]}
          />
        </Form.Item>

        <Form.Item noStyle>
          <Flex gap={5}>
            <Button icon={<CheckOutlined />} type="text" htmlType="submit" loading={isLoading} />
            <Button
              icon={<CloseOutlined />}
              type="text"
              onClick={() => setEditMode(false)}
              disabled={isLoading}
            />
          </Flex>
        </Form.Item>
      </Form>
    );
  }

  return (
    <Flex>
      <Status status={status} />
      <Button
        size="small"
        type="text"
        icon={<FormOutlined />}
        onClick={() => setEditMode(true)}
        disabled={isLoading || status === 'CANCELLED'}
      />
    </Flex>
  );
};

const Status = ({ status }: Pick<OrderStatusProps, 'status'>) => {
  let color = 'default';

  switch (status) {
    case 'PENDING':
      color = 'warning';
      break;
    case 'FULFILLED':
      color = 'success';
      break;
    case 'CANCELLED':
      color = 'error';
      break;
  }

  return (
    <Tag style={{ fontWeight: 500 }} color={color} bordered={false}>
      {status}
    </Tag>
  );
};

export default OrderStatus;
