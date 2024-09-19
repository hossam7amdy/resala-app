'use server';

import { callEndpoint } from '@/fetch';
import { ROUTES } from '@/routes';
import type {
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidateTag } from 'next/cache';

export const getProfile = async () => {
  const response = await callEndpoint<GetUserRequest, GetUserResponse>(ENDPOINT_CONFIGS.getUser);

  return response.data;
};

export const getUserById = async (id: number | string) => {
  const response = await callEndpoint<GetUserRequest, GetUserResponse>(ENDPOINT_CONFIGS.getUser, {
    params: { userId: id.toString() },
    cache: 'no-store',
  });

  return response.data;
};

export const listUsers = async (query: ListUsersRequest['query']) => {
  const response = await callEndpoint<ListUsersRequest, ListUsersResponse>(
    ENDPOINT_CONFIGS.listUsers,
    {
      query,
      next: { tags: [ROUTES.CUSTOMERS] },
    }
  );

  return response.data;
};

export const updateUser = async (id: string | number, payload: UpdateUserRequest['body']) => {
  const response = await callEndpoint<UpdateUserRequest, UpdateUserResponse>(
    ENDPOINT_CONFIGS.updateUser,
    { params: { userId: id.toString() }, body: payload }
  );

  revalidateTag(ROUTES.CUSTOMERS);
  return response;
};

export const deleteUser = async (id: string | number) => {
  const response = await callEndpoint<DeleteUserRequest, DeleteUserResponse>(
    ENDPOINT_CONFIGS.deleteUser,
    { params: { userId: id.toString() } }
  );

  revalidateTag(ROUTES.CUSTOMERS);

  return response;
};
