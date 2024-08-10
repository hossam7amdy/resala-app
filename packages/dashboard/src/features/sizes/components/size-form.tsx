'use client';

import { type Size, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { useMutateSize } from '..';

interface SizeFormProps {
  size?: Size;
  onCancel?: () => void;
}
export const SizeForm: React.FC<SizeFormProps> = ({ size, onCancel }) => {
  const [form] = useForm();

  const { isLoading, mutate } = useMutateSize({ id: size?.id, onSuccess: onCancel });

  return (
    <Form
      form={form}
      name={`size-form-${size?.id}`}
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
            {size?.id ? 'Update' : 'Create'}
          </Button>
          <Button type="default" onClick={onCancel} block disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
