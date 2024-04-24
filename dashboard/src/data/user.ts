'use server';

import { callEndpoint } from '@/lib/fetch';
import type { GetProfileRequest, GetProfileResponse } from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';

export const getProfile = async () => {
  return await callEndpoint<GetProfileRequest, GetProfileResponse>(ENDPOINT_CONFIGS.getCurrentUser);
};
