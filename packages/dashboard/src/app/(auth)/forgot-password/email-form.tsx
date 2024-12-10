'use client';

import { forgetPassword } from '@/fetch/auth.client';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/routes';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

export const EmailForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: ({ email }: { email: string }) =>
      forgetPassword({ email, redirectTo: window.location.origin + '/reset-password' }),
    onSuccess: () => {
      form.resetFields();
      notification.success('Reset password link sent successfully');
      router.replace(ROUTES.LOGIN);
    },
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form
      size="large"
      form={form}
      name="forgot-password"
      layout="vertical"
      onFinish={mutate}
      autoComplete="off"
    >
      <Form.Item
        required
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email', message: 'Not valid E-mail!' }]}
      >
        <Input placeholder="Enter your email" autoFocus />
      </Form.Item>
      <Form.Item noStyle>
        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};
