'use server';

import { callEndpoint } from '@/fetch';
import type {
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
      params: { userId: id.toString() },
    });

    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const listUsers = async (query: ListUsersRequest['query']) => {
  noStore();

  const response = await callEndpoint<ListUsersRequest, ListUsersResponse>(
    ENDPOINT_CONFIGS.listUsers,
    { query }
  );

  return response.data;
};
