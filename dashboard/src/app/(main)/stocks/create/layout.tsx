'use client';

import { createStock } from '@/actions/stock';
import BackButton from '@/components/ui/back-button';
import ErrorMessage from '@/components/ui/error-message';
import useSubmitForm from '@/hooks/use-submit-form';
import ROUTES from '@/lib/routes';
import { Breadcrumb, Col, Row } from 'antd';
import { Form as AntForm, Button, Flex, InputNumber } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface CreateStockLayoutProps {
  selectColor: React.ReactNode;
  selectProduct: React.ReactNode;
  selectSize: React.ReactNode;
  searchParams: { productId: string };
}
const CreateStockLayout = ({
  searchParams,
  selectSize,
  selectProduct,
  selectColor,
}: CreateStockLayoutProps) => {
  const [form] = useForm();
  const router = useRouter();

  const { error, pending, dispatch } = useSubmitForm(createStock, form);

  return (
    <Row gutter={[10, 20]} style={{ padding: 20 }}>
      <Col span={24}>
        <Breadcrumb
          items={[
            { title: <BackButton /> },
            { title: <Link href={ROUTES.STOCKS}>Stocks</Link> },
            { title: 'Create' },
          ]}
        />
      </Col>

      <Col span={24}>
        <AntForm
          form={form}
          name="stock-form"
          layout="vertical"
          onFinish={dispatch}
          autoComplete="off"
          size="large"
          initialValues={{ productId: searchParams?.productId }}
        >
          {selectProduct}

          {selectColor}

          {selectSize}

          <FormItem
            required
            rules={[{ required: true }]}
            hasFeedback
            name="quantity"
            label="Quantity"
          >
            <InputNumber
              placeholder="Enter quantity"
              min={0}
              max={100000}
              style={{ width: '100%' }}
            />
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
        </AntForm>
      </Col>
    </Row>
  );
};

export default CreateStockLayout;
