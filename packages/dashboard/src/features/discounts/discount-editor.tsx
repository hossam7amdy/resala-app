'use client';

import { SelectProductAsync } from '@/components/select-product-async';
import { createDiscount } from '@/fetch/discount';
import { useMutation, useNotification } from '@/hooks';
import type { CreateDiscountRequest, Discount } from '@resala/shared';
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
import { useRouter } from 'next/navigation';
import React from 'react';

type FormValues = CreateDiscountRequest['body'] & {
  dateRange: [Date, Date];
};

const { RangePicker } = DatePicker;

interface DiscountEditorProps {
  discount?: Discount;
  productIds?: number[];
}
export const DiscountEditor: React.FC<DiscountEditorProps> = ({ discount, productIds }) => {
  const [form] = Form.useForm();
  const { back } = useRouter();
  const { success, error } = useNotification();
  const { mutate, isLoading } = useMutation({
    mutationFn: createDiscount,
    onSuccess: () => {
      form.resetFields();
      success('Discount created successfully');
    },
    onError: e => {
      error(e.message);
    },
  });

  const isProductSpecific = !Form.useWatch('isStoreWide', form);
  const isBogo = Form.useWatch('type', form) === 'BOGO';
  const isPercentage = Form.useWatch('type', form) === 'PERCENTAGE';

  const onFinish = ({ dateRange, ...values }: FormValues) => {
    const [start, end] = dateRange;

    return mutate({
      startDate: new Date(start).toISOString(),
      endDate: new Date(end).toISOString(),
      ...values,
    });
  };

  return (
    <Card title="Create new discount">
      <Form
        size="large"
        name="create-discount"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
          ...discount,
          productIds,
          isActive: discount?.isActive ?? true,
          isStoreWide: discount?.isStoreWide ?? false,
        }}
      >
        <Form.Item name="isStoreWide" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={false}>Product specific</Radio>
            <Radio value={true}>Store wide</Radio>
          </Radio.Group>
        </Form.Item>

        {isProductSpecific && (
          <Form.Item name="productIds" label="Select Products" rules={[{ required: true }]}>
            <SelectProductAsync autoFocus mode="multiple" />
          </Form.Item>
        )}

        <Form.Item rules={[{ required: true }]} name="type" label="Select Type">
          <Select
            allowClear
            placeholder="Select discount type"
            options={[
              { label: 'Percentage', value: 'PERCENTAGE' },
              { label: 'Buy X Get Y', value: 'BOGO' },
              { label: 'Fixed', value: 'FIXED', disabled: isProductSpecific },
              { label: 'Bulk', value: 'BULK', disabled: isProductSpecific },
            ]}
          />
        </Form.Item>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="minQty"
              label={isBogo ? 'Buy X' : 'Minimum Quantity'}
              rules={[{ required: true }]}
            >
              <InputNumber placeholder="10" className="w-full" min={1} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="amount"
              label={isBogo ? 'Get Y' : 'Amount'}
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
          <RangePicker className="w-full" />
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Is active</Checkbox>
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
