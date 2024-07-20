'use client';

import { login } from '@/actions/auth';
import ErrorMessage from '@/components/error-message';
import useSubmitForm from '@/hooks/useSubmitForm';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';

const LoginForm = () => {
  const { pending, error, dispatch } = useSubmitForm(login);

  return (
    <Form size="large" name="login" layout="vertical" autoComplete="off" onFinish={dispatch}>
      <FormItem rules={[{ required: true }]} name="sign" label="Sign" required>
        <Input placeholder="Enter email or phone" autoFocus />
      </FormItem>
      <FormItem rules={[{ required: true }]} name="password" label="Password" required>
        <Password placeholder="Enter password" />
      </FormItem>
      {error?.message && <ErrorMessage message={error.message} />}
      <FormItem noStyle>
        <Button type="primary" block htmlType="submit" loading={pending}>
          Sign in
        </Button>
      </FormItem>
    </Form>
  );
};

export default LoginForm;
