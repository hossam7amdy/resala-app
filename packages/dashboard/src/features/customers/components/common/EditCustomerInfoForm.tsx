'use client';

import { updateUser } from '@/fetch/users';
import { useMutation, useNotification } from '@/hooks';
import { useCurrentUser } from '@/hooks';
import type { User } from '@resala/shared';
import { Role, validationPatterns } from '@resala/shared';
import { Button, Flex, Form, Input, Select } from 'antd';
import { isValidPhoneNumber } from 'libphonenumber-js';
import React from 'react';

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: Role;
}

interface EditCustomerFormProps {
  disable?: boolean;
  customer: User;
  onDone?: () => void;
  onCancel?: () => void;
}

export const EditCustomerForm: React.FC<EditCustomerFormProps> = ({
  disable = false,
  customer,
  onDone,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const notification = useNotification();
  const { user, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { isLoading, mutate } = useMutation({
    mutationFn: (values: FormValues) => {
      const name = `${values.firstName} ${values.lastName}`;
      return updateUser(customer.id, { ...values, name });
    },
    onSuccess: () => {
      notification.success('Customer updated successfully');
      form.resetFields();
      onDone?.();
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  const disableRoleField = isLoadingCurrentUser || disable || user?.role !== 'admin';

  return (
    <Form
      disabled={disable}
      form={form}
      name="edit-customer"
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
        name="phoneNumber"
        label="Phone Number"
        required
        hasFeedback
        rules={[
          { required: true },
          { ...validationPatterns.validatePhoneLength },
          {
            validator: (_, value) => {
              return isValidPhoneNumber(value, 'EG')
                ? Promise.resolve()
                : Promise.reject('Invalid phone number');
            },
          },
        ]}
      >
        <Input placeholder="+201XXXXXXXXX" />
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
        <Input disabled placeholder="example@mail.com" />
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
          disabled={disableRoleField}
          options={[
            { label: 'Admin', value: Role.ADMIN },
            { label: 'Staff', value: Role.STAFF },
            { label: 'Customer', value: Role.USER },
          ]}
        />
      </Form.Item>

      <Form.Item noStyle>
        <Flex gap={10}>
          <Button type="default" onClick={onCancel} block disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Update
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
