'use client';

import { createDiscount, updateDiscount } from '@/actions/discount';
import { SelectProductAsync } from '@/components/select-product-async';
import { useMutation, useNotification } from '@/hooks';
import type { CreateDiscountRequest } from '@resala/shared';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  InputNumber,
  Radio,
  Row,
  Select,
} from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import React from 'react';

const { RangePicker } = DatePicker;

type FormValues = CreateDiscountRequest['body'] & {
  dateRange: [Dayjs, Dayjs];
};
interface DiscountEditorProps {
  id?: string;
  discount?: CreateDiscountRequest['body'];
}

export const DiscountEditor: React.FC<DiscountEditorProps> = ({ id, discount }) => {
  const [form] = Form.useForm();
  const { back } = useRouter();
  const { success, error } = useNotification();
  const { mutate, isLoading } = useMutation({
    mutationFn: !id ? createDiscount : updateDiscount.bind(null, id),
    onSuccess: data => {
      if (id) back();
      form.resetFields();
      success(data?.message ?? 'Discount has been submitted successfully');
    },
    onError: e => {
      error(e.message);
    },
  });

  const qty = Form.useWatch('minQty', form) ?? 0;
  const amount = Form.useWatch('amount', form) ?? 0;
  const isPercentage = Form.useWatch('type', form) === 'PERCENTAGE';
  const isProductSpecific = Form.useWatch('isStoreWide', form) === false;

  const onFinish = ({ dateRange, ...values }: FormValues) => {
    const [start, end] = dateRange;

    return mutate({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      ...values,
    });
  };

  const shouldDisplayProductIds = isProductSpecific && !id;

  return (
    <Card title="Discount editor">
      <Form
        size="large"
        name="discount-editor"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          ...discount,
          isActive: discount?.isActive ?? true,
          isStoreWide: discount?.isStoreWide ?? false,
          dateRange: [
            discount?.startDate && dayjs(discount.startDate),
            discount?.endDate && dayjs(discount.endDate),
          ],
        }}
      >
        <Form.Item name="isStoreWide" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={false}>Product specific</Radio>
            <Radio value={true}>Store wide</Radio>
          </Radio.Group>
        </Form.Item>

        {shouldDisplayProductIds && (
          <Form.Item name="productIds" label="Select Products" rules={[{ required: true }]}>
            <SelectProductAsync autoFocus mode="multiple" />
          </Form.Item>
        )}

        <Form.Item rules={[{ required: true }]} name="type" label="Select Type">
          <Select
            allowClear
            placeholder="Select discount type"
            options={[
              { label: 'BOGO', value: 'BOGO' },
              { label: 'Percentage', value: 'PERCENTAGE' },
            ]}
          />
        </Form.Item>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="minQty"
              label={`Buy ${qty} ${qty > 1 ? 'items' : 'item'}`}
              rules={[{ required: true }]}
            >
              <InputNumber placeholder="10" className="w-full" min={1} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="amount"
              label={
                isPercentage
                  ? `${amount}% off`
                  : `Get ${amount} ${amount > 1 ? 'items' : 'item'} free`
              }
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="12"
                className="w-full"
                min={1}
                max={isPercentage ? 100 : undefined}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="dateRange"
          label="Discount period"
          rules={[{ type: 'array' as const, required: true }]}
        >
          <RangePicker inputReadOnly className="w-full" />
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Is Active</Checkbox>
        </Form.Item>

        <Form.Item>
          <Flex gap={10}>
            <Button disabled={isLoading} size="large" block onClick={back}>
              Cancel
            </Button>

            <Button loading={isLoading} size="large" block type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Card>
  );
};
