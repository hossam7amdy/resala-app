'use client';

import { signIn } from '@/actions/auth.client';
import { ROUTES } from '@/routes';
import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export const LoginWithGoogleButton: React.FC = () => {
  return (
    <div className="pt-5">
      <Button
        block
        size="large"
        icon={<GoogleOutlined />}
        onClick={() => {
          signIn.social({
            provider: 'google',
            callbackURL: location.origin + ROUTES.DASHBOARD,
          });
        }}
      >
        Login with Google
      </Button>
    </div>
  );
};
