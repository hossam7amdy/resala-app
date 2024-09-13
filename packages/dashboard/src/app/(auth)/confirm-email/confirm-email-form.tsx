'use client';

import { verifyEmail } from '@/actions/auth';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/utils/routes';
import { Button, Card, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const ConfirmEmailForm: React.FC<{ token?: string }> = ({ token }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { error: notificationError } = useNotification();

  const verifyEmailCallback = useCallback(
    (variables: { token: string }) => verifyEmail(variables),
    []
  );

  const handleSuccess = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(
    (error: { message: string }) => {
      setIsLoading(false);
      notificationError(error.message);
    },
    [notificationError]
  );

  const { mutate, error } = useMutation({
    mutationFn: verifyEmailCallback,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  useEffect(() => {
    mutate({ token: token ?? '' });
  }, [token, mutate]);

  return (
    <Card size="small" loading={isLoading} bordered={false} className="shadow-none">
      <Result
        status={error ? 'error' : 'success'}
        title={error ? 'Invalid confirmation link' : 'Your email has been verified'}
        subTitle={
          error
            ? error.message
            : 'Your email has been verified successfully, you can now sign in to your account.'
        }
        extra={
          <Button
            block
            size="large"
            type="primary"
            onClick={() => {
              router.replace(ROUTES.LOGIN);
            }}
          >
            Go to login
          </Button>
        }
      />
    </Card>
  );
};
