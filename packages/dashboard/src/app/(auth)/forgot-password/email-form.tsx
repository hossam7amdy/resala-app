'use client';

import { forgotPassword } from '@/actions/auth';
import useSubmitForm from '@/hooks/useSubmitForm';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Text from 'antd/es/typography/Text';

const EmailForm = () => {
  const { error, pending, dispatch } = useSubmitForm(forgotPassword);

  return (
    <Form
      size="large"
      name="forgot-password"
      layout="vertical"
      onFinish={dispatch}
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
      {error?.message && <Text type="danger">{error.message}</Text>}
      <FormItem noStyle>
        <Button type="primary" block htmlType="submit" loading={pending}>
          Reset Password
        </Button>
      </FormItem>
    </Form>
  );
};

export default EmailForm;
