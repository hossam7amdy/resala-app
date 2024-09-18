'use client';

import { configuration } from '@/configuration';
import { GoogleOutlined } from '@ant-design/icons';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export const LoginWithGoogleButton = () => {
  const [redirectUrl, setRedirectUrl] = useState<string>();

  useEffect(() => {
    if (window !== undefined) {
      setRedirectUrl(encodeURIComponent(window.location.origin + '/callback/google'));
    }
  }, []);

  return (
    <div className="pt-5">
      <Button
        disabled={!redirectUrl}
        block
        size="large"
        icon={<GoogleOutlined />}
        href={`${configuration.baseUrl}${ENDPOINT_CONFIGS.loginWithGoogle.url}?redirectUrl=${redirectUrl}`}
      >
        Login with Google
      </Button>
    </div>
  );
};
