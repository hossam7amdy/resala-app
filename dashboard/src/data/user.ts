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

  const response = await callEndpoint<GetProfileRequest, GetProfileResponse>(
    ENDPOINT_CONFIGS.getCurrentUser
  );

  return response.data;
};

export const listUsersPaginated = async (searchParams: {
  page: number;
  limit: number;
  query: string;
}) => {
  noStore();

  const response = await callEndpoint<AdminGetUsersListRequest, AdminGetUsersListResponse>(
    ENDPOINT_CONFIGS.adminGetUsersList,
    {
      query: {
        page: Number(searchParams.page),
        limit: Number(searchParams.limit),
        query: searchParams?.query || '',
        deleted: true,
      },
    }
  );

  return response.data;
};
