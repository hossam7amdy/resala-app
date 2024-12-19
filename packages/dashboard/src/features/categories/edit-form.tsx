'use client';

import { updateCategory } from '@/fetch/category';
import { useMutation, useNotification } from '@/hooks';
import { type GetCategoryResponse, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const EditForm: React.FC<{ category: GetCategoryResponse['data'] }> = ({ category }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateCategory.bind(null, String(category.id)),
    onSuccess: () => {
      form.resetFields();

      notification.success('Category updated successfully');

      router.back();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form
      form={form}
      size="large"
      name="create-category"
      layout="vertical"
      onFinish={mutate}
      initialValues={{
        enName: category.enName,
        arName: category.arName,
      }}
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
          rules={[
            {
              required: true,
              ...validationPatterns.validateArabicCharacters,
            },
          ]}
          name="arName"
          label="الأسم بالعربية"
          style={{ direction: 'rtl', flex: 1 }}
        >
          <Input placeholder="أكتب الأسم بالعربية" min={3} max={10} />
        </Form.Item>
      </Flex>

      <Flex gap={10}>
        <Form.Item noStyle>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Update
          </Button>
        </Form.Item>
        <Form.Item noStyle>
          <Button block disabled={isLoading} onClick={() => router.back()}>
            Cancel
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export { EditForm };
