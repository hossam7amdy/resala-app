'use client';

import { logout } from '@/fetch/auth';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export const NotAuthorized: React.FC<{ message?: string }> = ({
  message = 'Sorry, you are not authorized to access this page.',
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const logoutCallback = useCallback(async () => {
    setIsLoading(true);
    try {
      await logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      logoutCallback();
    }
  }, [logoutCallback, router, timer]);

  return (
    <Result
      status="403"
      title="Not Authorized"
      subTitle={message}
      extra={
        <Button disabled={isLoading} size="large" type="primary" onClick={logoutCallback}>
          Go to login
        </Button>
      }
    >
      <p className="text-center font-semibold">Redirecting in {timer} seconds...</p>
    </Result>
  );
};
