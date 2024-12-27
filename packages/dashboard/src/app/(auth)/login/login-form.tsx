'use client';

import { signIn } from '@/actions/auth.client';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/routes';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const { push } = useRouter();
  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ sign, password }: { sign: string; password: string }): Promise<unknown> => {
      if (sign.includes('@')) {
        return signIn.email({ email: sign, password });
      }

      return signIn.phoneNumber({ phoneNumber: sign, password });
    },
    onSuccess: () => {
      push(ROUTES.DASHBOARD);
    },
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
