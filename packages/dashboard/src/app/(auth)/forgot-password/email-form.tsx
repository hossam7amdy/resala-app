'use client';

import { forgotPassword } from '@/actions/auth';
import { useMutation, useNotification } from '@/hooks';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';

const EmailForm = () => {
  const notification = useNotification();

  const { isLoading, mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: error => {
      notification.error(error.message);
    },
  });

  return (
    <Form
      size="large"
      name="forgot-password"
      layout="vertical"
      onFinish={mutate}
      autoComplete="off"
    >
      <FormItem
        required
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email', message: 'Not valid E-mail!' }]}
      >
        <Input placeholder="Enter your email" autoFocus />
      </FormItem>
      <FormItem noStyle>
        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Reset Password
        </Button>
      </FormItem>
    </Form>
  );
};

export default EmailForm;
