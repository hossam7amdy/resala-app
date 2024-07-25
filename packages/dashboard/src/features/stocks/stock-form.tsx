'use client';

import { createStock, updateStock } from '@/actions/stock';
import { useMutation, useNotifications } from '@/hooks';
import { Button, Flex, Form, InputNumber, type UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';
import React from 'react';

type FormValues = {
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
  images?: UploadFile[];
};

interface StockFormProps {
  stock: Partial<{
    id: number;
    colorId: number;
    sizeId: number;
    productId: number;
    quantity: number;
  }>;
  selectSize: React.ReactNode;
  selectColor: React.ReactNode;
  selectProduct: React.ReactNode;
}
export const StockForm: React.FC<StockFormProps> = ({
  stock,
  selectColor,
  selectSize,
  selectProduct,
}) => {
  const router = useRouter();
  const [form] = useForm<FormValues>();
  const notification = useNotifications();

  const isCreate = !stock?.id;
  const submit = isCreate ? createStock : updateStock.bind(null, stock.id!);
  const { isLoading, mutate } = useMutation({
    mutationFn: submit,
    onSuccess() {
      form.resetFields();
      notification.success(`Stock has been ${isCreate ? 'created' : 'updated'} successfully`);
      !isCreate && router.back(); // Redirect to the previous page if it's an update
    },
    onError(error) {
      notification.error(error.message);
    },
  });

  return (
    <Form
      form={form}
      name="stock-form"
      layout="vertical"
      onFinish={mutate}
      size="large"
      initialValues={{ ...stock }}
    >
      {selectProduct}

      {selectColor}

      {selectSize}

      <Form.Item required rules={[{ required: true }]} hasFeedback name="quantity" label="Quantity">
        <InputNumber placeholder="Enter quantity" min={0} max={100000} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item noStyle>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
          <Button type="default" block onClick={router.back} disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
