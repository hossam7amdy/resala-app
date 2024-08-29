'use server';

import { callEndpoint } from '@/services/callEndpoint';
import { ROUTES } from '@/utils/routes';
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
    { params: { userId: id.toString() }, body: payload }
  );

  revalidatePath(ROUTES.CUSTOMERS);
  return response;
};

export const deleteUser = async (id: string | number) => {
  const response = await callEndpoint<DeleteUserRequest, DeleteUserResponse>(
    ENDPOINT_CONFIGS.deleteUser,
    { params: { userId: id.toString() } }
  );

  revalidatePath(ROUTES.CUSTOMERS);

  return response;
};
