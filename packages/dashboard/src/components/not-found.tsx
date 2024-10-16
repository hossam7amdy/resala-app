'use client';

import { ROUTES } from '@/routes';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const NotFound: React.FC<{ message: string }> = ({
  message = 'Sorry, the page you visited does not exist.',
}) => {
  const { replace } = useRouter();
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      replace(ROUTES.DASHBOARD);
    }
  }, [replace, timer]);

  return (
    <Result
      status="404"
      title="404"
      subTitle={message}
      extra={
        <Link replace href={ROUTES.DASHBOARD}>
          <Button size="large" type="primary">
            Back Home
          </Button>
        </Link>
      }
    >
      <p className="text-center font-semibold">Redirecting in {timer} seconds...</p>
    </Result>
  );
};
