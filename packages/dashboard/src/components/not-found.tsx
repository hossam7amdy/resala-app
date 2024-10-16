'use client';

import { ROUTES } from '@/routes';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const NotFound: React.FC<{ message: string }> = ({
  message = 'Sorry, the page you visited does not exist.',
}) => {
  const router = useRouter();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [router, timer]);

  return (
    <Result
      status="404"
      title="404"
      subTitle={message}
      extra={
        <Button size="large" type="primary" onClick={() => router.push(ROUTES.DASHBOARD)}>
          Back Home
        </Button>
      }
    >
      <p className="text-center font-semibold">Redirecting in {timer} seconds...</p>
    </Result>
  );
};
