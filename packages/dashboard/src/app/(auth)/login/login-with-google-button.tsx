'use client';

import { GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { signInWithRedirect } from 'aws-amplify/auth';
import React from 'react';

export const LoginWithGoogleButton: React.FC = () => {
  return (
    <div className="pt-5">
      <Button
        block
        size="large"
        icon={<GoogleOutlined />}
        onClick={() => signInWithRedirect({ provider: 'Google' })}
      >
        Login with Google
      </Button>
    </div>
  );
};
