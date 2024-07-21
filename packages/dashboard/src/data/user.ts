'use server';

import { callEndpoint } from '@/lib/fetch';
import type {
  DefaultRequestQuery,
  GetUserRequest,
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const getProfile = async () => {
  noStore();

  const response = await callEndpoint<GetUserRequest, GetUserResponse>(ENDPOINT_CONFIGS.getUser);

  return response.data;
};

export const getUserById = async (id: number | string) => {
  noStore();

  try {
    const response = await callEndpoint<GetUserRequest, GetUserResponse>(ENDPOINT_CONFIGS.getUser, {
      params: { userId: Number(id) },
    });

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const listUsersPaginated = async (params: DefaultRequestQuery['query']) => {
  noStore();

  const response = await callEndpoint<ListUsersRequest, ListUsersResponse>(
    ENDPOINT_CONFIGS.listUsers,
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
