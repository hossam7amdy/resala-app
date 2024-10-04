'use client';

import { updateUser } from '@/fetch/users';
import { useMutation, useNotification } from '@/hooks';
import { Role, type User, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ResendEmailVerificationButton } from './resend-email-verification-button';

interface EditFormProps {
  disable?: boolean;
  customer: Partial<User>;
}

export const EditForm: React.FC<EditFormProps> = ({ disable = false, customer }) => {
  const router = useRouter();

  const [form] = Form.useForm();

  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateUser.bind(null, customer.id!),
    onSuccess: () => {
      notification.success('Customer updated successfully');

      form.resetFields();

      router.back();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form
      disabled={disable}
      form={form}
      name="edit-customer"
      size="large"
      layout="vertical"
      initialValues={{ ...customer }}
      onFinish={mutate}
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
        <Input
          disabled
          placeholder="example@mail.com"
          addonAfter={
            !customer.isEmailVerified && (
              <ResendEmailVerificationButton email={customer?.email ?? ''} />
            )
          }
        />
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
          disabled={customer.role === Role.ADMIN || disable}
          options={[
            { label: 'Admin', value: Role.ADMIN },
            { label: 'Moderator', value: Role.MODERATOR },
            { label: 'Customer', value: Role.CUSTOMER },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Flex gap={10}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Update
          </Button>
          <Button type="default" onClick={router.back} block disabled={isLoading}>
            Cancel
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
