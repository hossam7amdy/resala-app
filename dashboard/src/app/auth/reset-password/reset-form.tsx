'use client';

import { resetPassword } from '@/actions/auth';
import useSubmitForm from '@/hooks/use-submit-form';
import { Button, Form, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import Text from 'antd/es/typography/Text';

const ResetPasswordForm = () => {
  const { errMsg, pending, dispatch } = useSubmitForm(resetPassword);

  return (
    <Form
      size="large"
      name="reset-password"
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
      <FormItem required name="code" label="Code" rules={[{ required: true }]}>
        <Input placeholder="Enter reset code" />
      </FormItem>
      <FormItem required name="password" label="New Password" rules={[{ required: true }]}>
        <Input placeholder="Enter your new password" />
      </FormItem>
      {errMsg && <Text type="danger">{errMsg}</Text>}
      <FormItem noStyle>
        <Button type="primary" block htmlType="submit" loading={pending}>
          Confirm Password
        </Button>
      </FormItem>
    </Form>
  );
};

export default ResetPasswordForm;
