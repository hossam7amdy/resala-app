'use client';

import { NotAuthorized } from '@/components/not-authorized';
import { login } from '@/fetch/auth';
import { useMutation, useNotification } from '@/hooks';
import { ROUTES } from '@/routes';
import { Button, Result, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

const GoogleCallbackPage: React.FC<{
  searchParams?: { accessToken?: string; refreshToken?: string };
}> = ({ searchParams }) => {
  const { accessToken, refreshToken } = searchParams ?? {};
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const { replace } = useRouter();
  const { error } = useNotification();

  const { mutate } = useMutation({
    mutationFn: login,
    onError: e => {
      error(e?.message);
      replace(ROUTES.LOGIN);
    },
  });

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.click();

      return () => {
        btnRef.current = null;
      };
    }
  }, []);

  if (!accessToken || !refreshToken) {
    return <NotAuthorized />;
  }

  return (
    <Result
      icon={<Spin />}
      extra={[
        <Button
          ref={btnRef}
          key="trigger"
          className="invisible"
          onClick={() => mutate({ accessToken, refreshToken } as never)}
        />,
      ]}
    />
  );
};

export default GoogleCallbackPage;
