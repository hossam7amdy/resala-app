'use client';

import { createStock, updateStock } from '@/actions/stock';
import { useSubmitForm } from '@/hooks';
import { Button, Flex, Form, InputNumber } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useRouter } from 'next/navigation';
import React from 'react';

import ErrorMessage from '../../components/error-message';

interface EditFormProps {
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
const StockForm: React.FC<EditFormProps> = ({ stock, selectColor, selectSize, selectProduct }) => {
  const [form] = useForm();
  const router = useRouter();

  const isCreate = !stock?.id;
  const submit = isCreate ? createStock : updateStock.bind(null, stock.id!);
  const { error, pending, dispatch } = useSubmitForm(submit, form);

  return (
    <Form
      form={form}
      name="stock-form"
      layout="vertical"
      onFinish={dispatch}
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
          <Button type="primary" htmlType="submit" block loading={pending}>
            Submit
          </Button>
          <Button type="default" block onClick={router.back} disabled={pending}>
            Cancel
          </Button>
        </Flex>
      </FormItem>
    </Form>
  );
};

export default StockForm;
