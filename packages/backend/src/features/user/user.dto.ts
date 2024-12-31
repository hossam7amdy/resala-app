import type { GetUserResponse, ListUsersRequest, ListUsersResponse } from '@resala/shared';

export type GetUserResponseDto = GetUserResponse['data'];

export type ListUsersParamsDto = ListUsersRequest['query'];
export type ListUsersResponseDto = ListUsersResponse['data'];
