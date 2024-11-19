'use client';

import { login } from '@/fetch/auth';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/routes';
import { Button, Form, Input } from 'antd';
import { Hub } from 'aws-amplify/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const LoginForm = () => {
  const { replace } = useRouter();
  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    onError: error => {
      notification.error(error.message);
    },
  });

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signedIn' || event === 'signInWithRedirect') {
        replace(ROUTES.DASHBOARD);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [replace]);

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
