'use client';

import { loginWithProvider } from '@/fetch/auth';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export const LoginWithGoogleButton: React.FC = () => {
  return (
    <div className="pt-5">
      <Button block size="large" icon={<GoogleOutlined />} onClick={loginWithProvider}>
        Login with Google
      </Button>
    </div>
  );
};
