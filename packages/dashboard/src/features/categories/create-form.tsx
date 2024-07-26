'use client';

import { createCategory } from '@/actions/category';
import { useMutation, useNotification } from '@/hooks';
import { validationPatterns } from '@resala/shared';
import type { Category } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

export const CreateForm = ({ category }: { category?: Category }) => {
  const router = useRouter();

  const [form] = Form.useForm();

  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      form.resetFields();
      notification.success('Category created successfully');
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
        enName: category?.enName,
        arName: category?.arName,
      }}
    >
      <Form.Item
        required
        rules={[{ required: true, ...validationPatterns.validateEnglishCharacters }]}
        name="enName"
        label="English Name"
        style={{ flex: 1 }}
      >
        <Input placeholder="Enter English name" autoFocus />
      </Form.Item>
      <Form.Item
        required
        rules={[{ required: true, ...validationPatterns.validateArabicCharacters }]}
        name="arName"
        label="الأسم بالعربية"
        style={{ direction: 'rtl', flex: 1 }}
      >
        <Input placeholder="أكتب الأسم بالعربية" min={3} max={10} />
      </Form.Item>

      <Flex gap={10}>
        <Form.Item noStyle>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Create
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

export default CreateForm;
