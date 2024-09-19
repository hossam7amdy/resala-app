'use client';

import { NotAuthorized } from '@/components/not-authorized';
import { login } from '@/fetch/auth';
import { Result, Spin } from 'antd';
import React, { useEffect } from 'react';

const GoogleCallbackPage: React.FC<{
  searchParams?: { accessToken?: string; refreshToken?: string };
}> = ({ searchParams }) => {
  const { accessToken, refreshToken } = searchParams ?? {};

  useEffect(() => {
    if (accessToken && refreshToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      login({ accessToken, refreshToken } as any);
    }
  }, [accessToken, refreshToken]);

  if (!accessToken || !refreshToken) {
    return <NotAuthorized />;
  }

  return <Result icon={<Spin />} />;
};

export default GoogleCallbackPage;
