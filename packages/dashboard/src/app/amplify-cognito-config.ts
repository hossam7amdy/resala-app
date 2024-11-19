'use client';

import { authConfig } from '@/configuration/auth';
import { Amplify } from 'aws-amplify';

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export const ConfigureAmplifyClientSide = () => {
  return null;
};
