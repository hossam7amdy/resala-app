import { callEndpoint } from '@/lib/fetch';
import type {
  AdminGetUsersListRequest,
  AdminGetUsersListResponse,
  GetProfileRequest,
  GetProfileResponse,
} from '@resala/shared';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { unstable_noStore as noStore } from 'next/cache';

export const getProfile = async () => {
  noStore();

  return await callEndpoint<GetProfileRequest, GetProfileResponse>(ENDPOINT_CONFIGS.getCurrentUser);
};

export const listUsersPaginated = async () => {
  noStore();

  return await callEndpoint<AdminGetUsersListRequest, AdminGetUsersListResponse>(
    ENDPOINT_CONFIGS.adminGetUsersList
  );
};
