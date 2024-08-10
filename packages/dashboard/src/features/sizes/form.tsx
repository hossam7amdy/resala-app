'use client';

import { createSize, updateSize } from '@/actions/size';
import { useMutation, useNotification } from '@/hooks';
import { type GetSizeResponse, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';

interface SizeFormProps {
  size?: GetSizeResponse['data'];
}
const SizeForm = ({ size }: SizeFormProps) => {
  const isEdit = size?.id !== undefined;
  const submit = isEdit ? updateSize.bind(null, size.id) : createSize;

  const [form] = useForm();

  const router = useRouter();

  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      form.resetFields();

      notification.success('Customer updated successfully');

      isEdit ? router.back() : null;
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form
      form={form}
      name="size-form"
      size="large"
      layout="vertical"
      initialValues={size}
      onFinish={mutate}
    >
      <Form.Item
        validateFirst
        name="name"
        label="Size Name"
        required
        hasFeedback
        rules={[
          { required: true },
          { ...validationPatterns.validateEnglishCharacters },
          { min: 1, max: 5, message: 'English name must be between 1 and 5 characters' },
        ]}
      >
        <Input placeholder="XXL" />
      </Form.Item>

      <Form.Item>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
          <Button type="default" onClick={router.back} block disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default SizeForm;
