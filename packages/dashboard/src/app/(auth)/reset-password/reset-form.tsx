'use client';

import { resetPassword } from '@/fetch/auth';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/routes';
import { validationPatterns } from '@resala/shared';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';

interface FormValues {
  code: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ResetPasswordFormProps {
  email: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email }) => {
  const route = useRouter();
  const [form] = Form.useForm();
  const { error: notificationError, success: notificationSuccess } = useNotification();
  const { isLoading, mutate } = useMutation({
    mutationFn: (values: FormValues) => resetPassword({ ...values, email }),
    onSuccess: () => {
      form.resetFields();
      route.replace(ROUTES.LOGIN);
      notificationSuccess('Password reset successfully');
    },
    onError: error => {
      notificationError(error.message);
    },
  });

  return (
    <Form size="large" name="reset-password" layout="vertical" onFinish={mutate} autoComplete="off">
      <Form.Item
        hasFeedback
        name="newPassword"
        label="New Password"
        rules={[
          { required: true },
          { ...validationPatterns.validatePasswordLength },
          { ...validationPatterns.passwordContainsLowerCaseCharacter },
          { ...validationPatterns.passwordContainsNumericCharacters },
          { ...validationPatterns.passwordContainsUpperCaseCharacter },
        ]}
        normalize={value => value.trim()}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        hasFeedback
        name="confirmNewPassword"
        label="Confirm New Password"
        dependencies={['newPassword']}
        rules={[
          { required: true },
          { ...validationPatterns.validatePasswordLength },
          { ...validationPatterns.passwordContainsLowerCaseCharacter },
          { ...validationPatterns.passwordContainsNumericCharacters },
          { ...validationPatterns.passwordContainsUpperCaseCharacter },
          ({ getFieldValue }) => ({
            validator: (_, value) => {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        normalize={value => value.trim()}
      >
        <Input.Password placeholder="Re-enter Password" />
      </Form.Item>

      <Form.Item noStyle>
        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Confirm Password
        </Button>
      </Form.Item>
    </Form>
  );
};
