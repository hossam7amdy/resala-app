'use client';

import { login } from '@/actions/auth';
import useSubmitForm from '@/hooks/use-submit-form';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import Text from 'antd/es/typography/Text';

const LoginForm = () => {
  const { error, pending, dispatch } = useSubmitForm(login);

  return (
    <Form size="large" name="login" layout="vertical" onFinish={dispatch} autoComplete="off">
      <FormItem rules={[{ required: true }]} name="sign" label="Sign" required>
        <Input placeholder="Enter email or phone" autoFocus />
      </FormItem>
      <FormItem rules={[{ required: true }]} name="password" label="Password" required>
        <Password placeholder="Enter password" />
      </FormItem>
      {error?.message && <Text type="danger">{error.message}</Text>}
      <FormItem noStyle>
        <Button type="primary" block htmlType="submit" loading={pending}>
          Sign in
        </Button>
      </FormItem>
    </Form>
  );
};

export default LoginForm;
