'use server';

import { callEndpoint } from '@/lib/fetch';
import ROUTES from '@/lib/routes';
import type {
  AdminDeleteUserRequest,
  AdminDeleteUserResponse,
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { revalidatePath } from 'next/cache';

export const updateUser = async (id: string | number, payload: AdminUpdateUserRequest['body']) => {
  try {
    const response = await callEndpoint<AdminUpdateUserRequest, AdminUpdateUserResponse>(
      ENDPOINT_CONFIGS.adminUpdateUser,
      { params: { userId: Number(id) }, body: payload }
    );

    revalidatePath(ROUTES.CUSTOMERS);
    return response;
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteUser = async (id: string | number) => {
  try {
    await callEndpoint<AdminDeleteUserRequest, AdminDeleteUserResponse>(
      ENDPOINT_CONFIGS.adminDeleteUser,
      { params: { userId: Number(id) } }
    );

    revalidatePath(ROUTES.CUSTOMERS);
  } catch (e) {
    const error = e as Error;
    return {
      success: false,
      message: error.message,
    };
  }
};
