'use client';

import { updateUser } from '@/actions/user';
import { ErrorMessage } from '@/components';
import { useSubmitForm } from '@/hooks';
import { Role, type User, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface EditFormProps {
  customer: Partial<User>;
}

const EditForm: React.FC<EditFormProps> = ({ customer }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const submit = updateUser.bind(null, customer.id!);
  const { isSuccess, error, pending, dispatch } = useSubmitForm(submit, form);

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess, router]);

  return (
    <Form
      form={form}
      name="edit-customer"
      size="large"
      layout="vertical"
      initialValues={{ ...customer }}
      onFinish={dispatch}
    >
      <Flex gap={10}>
        <Form.Item
          style={{ flex: 1 }}
          name="firstName"
          label="First Name"
          required
          hasFeedback
          rules={[
            { required: true },
            { min: 2, max: 50, message: 'First name must be between 2 and 50 characters' },
          ]}
        >
          <Input placeholder="Mohamed" />
        </Form.Item>
        <Form.Item
          style={{ flex: 1 }}
          name="lastName"
          label="Last Name"
          required
          hasFeedback
          rules={[
            { required: true },
            { min: 2, max: 50, message: 'Last name must be between 2 and 50 characters' },
          ]}
        >
          <Input placeholder="Hossam" />
        </Form.Item>
      </Flex>

      <Form.Item
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        name="phone"
        label="Phone"
        required
        hasFeedback
        rules={[{ required: true }, { ...validationPatterns.validatePhoneLength }]}
      >
        <Input placeholder="01XXXXXXXXX" />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        name="email"
        label="Email"
        required
        hasFeedback
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input placeholder="example@mail.com" disabled />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        name="role"
        label="Role"
        required
        hasFeedback
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select Role"
          options={[
            { label: 'Admin', value: Role.ADMIN },
            { label: 'Moderator', value: Role.MODERATOR },
            { label: 'Customer', value: Role.CUSTOMER },
          ]}
        />
      </Form.Item>

      {error?.message && <ErrorMessage message={error.message} />}

      <Form.Item>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={pending}>
            Update
          </Button>
          <Button type="default" onClick={router.back} block disabled={pending}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
