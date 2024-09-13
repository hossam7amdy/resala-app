'use client';

import { verifyEmail } from '@/actions/auth';
import { ROUTES } from '@/utils/routes';
import { Button, Card, Result } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const ConfirmEmailForm: React.FC<{ token?: string }> = ({ token }) => {
  const router = useRouter();
  const [error, setError] = useState<{ message?: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await verifyEmail({ token: token ?? '' });

      if (!response.success) {
        setError({ message: response.message });
      }

      setIsLoading(false);
    })();
  }, [token]);

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
