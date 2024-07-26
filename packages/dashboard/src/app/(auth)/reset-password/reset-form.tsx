'use client';

import { resetPassword } from '@/actions/auth';
import { useMutation, useNotification } from '@/hooks';
import { Button, Form, Input } from 'antd';

export const ResetPasswordForm = () => {
  const notification = useNotification();
  const { isLoading, mutate } = useMutation({
    mutationFn: resetPassword,
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form size="large" name="reset-password" layout="vertical" onFinish={mutate} autoComplete="off">
      <Form.Item
        required
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email', message: 'Not valid E-mail!' }]}
      >
        <Input placeholder="Enter your email" autoFocus />
      </Form.Item>
      <Form.Item required name="code" label="Code" rules={[{ required: true }]}>
        <Input placeholder="Enter reset code" />
      </Form.Item>
      <Form.Item required name="password" label="New Password" rules={[{ required: true }]}>
        <Input placeholder="Enter your new password" />
      </Form.Item>
      <Form.Item noStyle>
        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Confirm Password
        </Button>
      </Form.Item>
    </Form>
  );
};
