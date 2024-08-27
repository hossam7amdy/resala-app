'use client';

import { verifyEmail } from '@/actions/auth';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/utils/routes';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Flex, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ConfirmEmailForm: React.FC<{ token?: string }> = ({ token }) => {
  const router = useRouter();
  const notification = useNotification();
  const [isLoading, setIsLoading] = useState(true);

  const { mutate, error } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: error => {
      setIsLoading(false);
      notification.error(error.message);
    },
  });

  useEffect(() => {
    if (!token?.trim()) {
      notification.error('Invalid verification link');
      router.replace(ROUTES.LOGIN);
    } else {
      mutate({ token });
    }
  }, [token]);

  return (
    <Card loading={isLoading} bordered={false} style={{ height: '100%', boxShadow: 'none' }}>
      <Flex vertical align="center">
        <Typography.Title style={{ textAlign: 'center' }} level={3}>
          {error ? 'Invalid confirmation link' : 'Your email has been verified'}
        </Typography.Title>

        <Empty
          style={{ marginBlockEnd: '20px' }}
          image={error ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />}
          imageStyle={{ fontSize: '80px', marginBlockEnd: '20px' }}
          description={
            error
              ? error.message
              : 'Your email has been verified successfully, you can now sign in to your account.'
          }
        />

        <Button
          block
          size="large"
          type="primary"
          onClick={() => {
            if (!error) {
              router.replace(ROUTES.LOGIN);
            }
          }}
        >
          {error ? 'Resend Email' : 'Sign In to your account'}
        </Button>
      </Flex>
    </Card>
  );
};
