'use server';

import { ROUTES } from '@/routes';
import { userService } from '@/services';
import {
  type DeleteUserResponse,
  type GetUserResponse,
  type ListUsersRequest,
  type ListUsersResponse,
  ListUsersSchema,
  type UpdateUserRequest,
  type UpdateUserResponse,
} from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const getUserById = async (id: number | string): Promise<GetUserResponse['data']> => {
  try {
    return await userService.find(+id);
  } catch (e) {
    return notFound();
  }
};

export const listUsers = async (
  query: ListUsersRequest['query']
): Promise<ListUsersResponse['data']> => {
  const parsed = ListUsersSchema.parse({ query });

  const page = parsed.query.page ?? 1;
  const limit = parsed.query.limit ?? 10;
  const search = parsed.query.search;

  const users = await userService.list({ page, limit, search });
  return { users, pagination: { page, limit, total: users.length } };
};

export const updateUser = async (
  id: string | number,
  payload: UpdateUserRequest['body']
): Promise<UpdateUserResponse> => {
  try {
    const data = await userService.update(+id, payload);
    revalidatePath(ROUTES.CUSTOMERS);
    revalidatePath(ROUTES.EDIT_CUSTOMER(id));
    return { data };
  } catch (e) {
    return { error: (e as Error).message } as UpdateUserResponse;
  }
};

export const deleteUser = async (id: string | number): Promise<DeleteUserResponse> => {
  try {
    const data = await userService.delete(+id);
    revalidatePath(ROUTES.CUSTOMERS);
    return { data } as DeleteUserResponse;
  } catch (e) {
    return { error: (e as Error).message } as DeleteUserResponse;
  }
};
