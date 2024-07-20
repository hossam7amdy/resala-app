'use client';

import { createStock, updateStock } from '@/actions/stock';
import { useMutation } from '@/hooks';
import { App, Button, Flex, Form, InputNumber, type UploadFile } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import React from 'react';

import ErrorMessage from '../../components/error-message';

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
const StockForm: React.FC<StockFormProps> = ({ stock, selectColor, selectSize, selectProduct }) => {
  const router = useRouter();
  const [form] = useForm<FormValues>();
  const { notification } = App.useApp();

  const isCreate = !stock?.id;
  const submit = isCreate ? createStock : updateStock.bind(null, stock.id!);
  const { error, isLoading, mutate } = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      form.resetFields();
      // message.success(`Stock has been ${isCreate ? 'created' : 'updated'} successfully`);
      notification.success({
        message: 'Success',
        description: `Stock has been ${isCreate ? 'created' : 'updated'} successfully`,
      });
      !isCreate && router.back(); // Redirect to the previous page if it's an update
    },
  });

  return (
    <Form
      form={form}
      name="stock-form"
      layout="vertical"
      // eslint-disable-next-line no-unused-vars
      onFinish={mutate}
      size="large"
      initialValues={{ ...stock }}
    >
      {selectProduct}

      {selectColor}

      {selectSize}

      <FormItem required rules={[{ required: true }]} hasFeedback name="quantity" label="Quantity">
        <InputNumber placeholder="Enter quantity" min={0} max={100000} style={{ width: '100%' }} />
      </FormItem>

      {error?.message && <ErrorMessage message={error.message} />}

      <FormItem noStyle>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
          <Button type="default" block onClick={router.back} disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </FormItem>
    </Form>
  );
};

export default StockForm;
