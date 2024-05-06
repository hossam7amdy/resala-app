'use client';

import { updateOrderStatus } from '@/actions/order';
import useSubmitForm from '@/hooks/use-submit-form';
import { CheckOutlined, CloseOutlined, FormOutlined } from '@ant-design/icons';
import type { GetOrderResponse } from '@resala/shared';
import { Button, Flex, Form, Select, Tag } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import useMessage from 'antd/lib/message/useMessage';
import { useEffect, useState } from 'react';

interface OrderStatusProps {
  id: string | number;
  status: GetOrderResponse['data']['orderStatus'];
}
const OrderStatus = ({ status }: OrderStatusProps) => {
  const [messageApi, contextHolder] = useMessage();
  const [editMode, setEditMode] = useState(false);
  const { pending, error, dispatch } = useSubmitForm(updateOrderStatus.bind(null, status));

  useEffect(() => {
    if (error.message) {
      messageApi.error(error.message);
    }
  }, [error?.message]);

  if (editMode) {
    return (
      <>
        {contextHolder}
        <Form size="small" name="order-status" onFinish={dispatch} initialValues={{ status }}>
          <FormItem name="status" noStyle>
            <Select
              options={[
                { label: 'Pending', value: 'PENDING' },
                { label: 'Fulfilled', value: 'FULFILLED' },
              ]}
            />
          </FormItem>

          <FormItem noStyle>
            <Flex gap={5}>
              <Button icon={<CheckOutlined />} type="text" htmlType="submit" loading={pending} />
              <Button
                icon={<CloseOutlined />}
                type="text"
                onClick={() => setEditMode(false)}
                disabled={pending}
              />
            </Flex>
          </FormItem>
        </Form>
      </>
    );
  }

  return (
    <Flex>
      <Status status={status} />
      <Button size="small" type="text" icon={<FormOutlined />} onClick={() => setEditMode(true)} />
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
    <Tag style={{ fontWeight: 500 }} color={color}>
      {status}
    </Tag>
  );
};

export default OrderStatus;
