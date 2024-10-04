'use client';

import { login } from '@/fetch/auth';
import { useMutation, useNotification } from '@/hooks';
import { Button, Form, Input } from 'antd';

export const LoginForm = () => {
  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form size="large" name="login" layout="vertical" autoComplete="off" onFinish={mutate}>
      <Form.Item rules={[{ required: true }]} name="sign" label="Sign" required>
        <Input placeholder="Enter email or phone" autoFocus />
      </Form.Item>
      <Form.Item rules={[{ required: true }]} name="password" label="Password" required>
        <Input.Password placeholder="Enter password" />
      </Form.Item>
      <Form.Item noStyle>
        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};
