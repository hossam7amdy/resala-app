'use client';

import { configuration } from '@/configuration';
import { GoogleOutlined } from '@ant-design/icons';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export const LoginWithGoogleButton: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState<string>();

  useEffect(() => {
    setRedirectUrl(location.origin + '/callback/google');
  }, []);

  return (
    <div className="pt-5">
      <Button
        block
        size="large"
        disabled={!redirectUrl}
        icon={<GoogleOutlined />}
        href={`${configuration.baseUrl}${ENDPOINT_CONFIGS.loginWithGoogle.url}?redirectUrl=${redirectUrl}`}
      >
        Login with Google
      </Button>
    </div>
  );
};
