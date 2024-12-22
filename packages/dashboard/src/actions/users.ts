'use server';

import { ROUTES } from '@/routes';
import { userService } from '@/services';
import { formatError } from '@/utils/formatError';
import type {
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
} from '@resala/shared';
import { ListUsersSchema } from '@resala/shared';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const getUserById = async (id: string): Promise<GetUserResponse['data']> => {
  try {
    return await userService.find(id);
  } catch {
    return notFound();
  }
};

export const listUsers = async (
  query?: ListUsersRequest['query']
): Promise<ListUsersResponse['data']> => {
  const { page, limit, search } = ListUsersSchema.parse({ query }).query;

  const users = await userService.list({ page, limit, search });
  return users;
};

export const updateUser = async (id: string, payload: UpdateUserRequest['body']) => {
  try {
    const data = await userService.update(id, payload);
    revalidatePath(ROUTES.CUSTOMERS);
    revalidatePath(ROUTES.CUSTOMER_DETAILS(id));
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const data = await userService.delete(id);
    revalidatePath(ROUTES.CUSTOMERS);
    return { data };
  } catch (e) {
    return formatError(e);
  }
};

export const countUsers = async () => {
  return await userService.count();
};
