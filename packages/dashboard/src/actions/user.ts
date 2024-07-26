'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import type {
  DeleteUserRequest,
  DeleteUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const updateUser = async (id: string | number, payload: UpdateUserRequest['body']) => {
  const response = await callEndpoint<UpdateUserRequest, UpdateUserResponse>(
    ENDPOINT_CONFIGS.updateUser,
    { params: { userId: Number(id) }, body: payload }
  );

  revalidatePath(ROUTES.CUSTOMERS);
  return response;
};

export const deleteUser = async (id: string | number) => {
  await callEndpoint<DeleteUserRequest, DeleteUserResponse>(ENDPOINT_CONFIGS.deleteUser, {
    params: { userId: Number(id) },
  });

  revalidatePath(ROUTES.CUSTOMERS);
};
