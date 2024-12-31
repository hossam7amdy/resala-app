'use client';

import { type GetCategoryResponse } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useCreateOrUpdateCategory } from '..';

const CategoryEditor: React.FC<{ category?: GetCategoryResponse['data'] }> = ({ category }) => {
  const [form] = Form.useForm();
  const { back } = useRouter();
  const { handleSubmit, isLoading } = useCreateOrUpdateCategory({ id: category?.id, form });

  return (
    <Form
      form={form}
      size="large"
      name="create-category"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={category}
    >
      <Flex gap={10}>
        <Form.Item
          required
          rules={[{ required: true }]}
          name="enName"
          label="English Name"
          style={{ flex: 1 }}
        >
          <Input placeholder="Enter English name" autoFocus />
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true }]}
          name="arName"
          label="الأسم بالعربية"
          style={{ direction: 'rtl', flex: 1 }}
        >
          <Input placeholder="أكتب الأسم بالعربية" min={3} max={10} />
        </Form.Item>
      </Flex>

      <Form.Item noStyle>
        <Flex gap={10}>
          <Button block disabled={isLoading} onClick={back}>
            Cancel
          </Button>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Confirm
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export { CategoryEditor };
