'use server';

import { callEndpoint } from '@/lib/fetch';
import type {
  AdminGetUserRequest,
  AdminGetUserResponse,
  AdminGetUsersListRequest,
  AdminGetUsersListResponse,
  DefaultRequestQuery,
  GetProfileRequest,
  GetProfileResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const getProfile = async () => {
  noStore();

  const response = await callEndpoint<GetProfileRequest, GetProfileResponse>(
    ENDPOINT_CONFIGS.getCurrentUser
  );

  return response.data;
};

export const getUserById = async (id: number | string) => {
  noStore();

  try {
    const response = await callEndpoint<AdminGetUserRequest, AdminGetUserResponse>(
      ENDPOINT_CONFIGS.adminGetUser,
      { params: { userId: Number(id) } }
    );

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const listUsersPaginated = async (params: DefaultRequestQuery['query']) => {
  noStore();

  const response = await callEndpoint<AdminGetUsersListRequest, AdminGetUsersListResponse>(
    ENDPOINT_CONFIGS.adminListUsers,
    {
      query: {
        page: Number(params.page),
        limit: Number(params.limit),
        query: params?.query || '',
      },
    }
  );

  return response.data;
};
