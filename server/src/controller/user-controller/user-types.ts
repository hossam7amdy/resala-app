import {
  AdminCreateUserRequest,
  AdminCreateUserResponse,
  AdminDeleteUserRequest,
  AdminDeleteUserResponse,
  AdminGetUserRequest,
  AdminGetUserResponse,
  AdminGetUsersListRequest,
  AdminGetUsersListResponse,
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
  GetProfileRequest,
  GetProfileResponse,
  ReqQuery,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@resala/shared';
import { RequestHandler } from 'express';

import { LocalUser } from '../../types';

export interface GetProfile
  extends RequestHandler<undefined, GetProfileResponse, GetProfileRequest, undefined, LocalUser> {}

export interface UpdateProfile
  extends RequestHandler<
    undefined,
    UpdateProfileResponse,
    UpdateProfileRequest,
    undefined,
    LocalUser
  > {}

export interface AdminGetUser
  extends RequestHandler<
    { userId: number },
    AdminGetUserResponse,
    AdminGetUserRequest,
    undefined,
    LocalUser
  > {}

export interface AdminGetUsersList
  extends RequestHandler<
    undefined,
    AdminGetUsersListResponse,
    AdminGetUsersListRequest,
    ReqQuery,
    {}
  > {}

export interface AdminDeleteUser
  extends RequestHandler<
    { userId: number },
    AdminDeleteUserResponse,
    AdminDeleteUserRequest,
    undefined,
    LocalUser
  > {}

export interface AdminCreateUser
  extends RequestHandler<
    undefined,
    AdminCreateUserResponse,
    AdminCreateUserRequest,
    undefined,
    LocalUser
  > {}

export interface AdminUpdateUser
  extends RequestHandler<
    { userId: number },
    AdminUpdateUserResponse,
    AdminUpdateUserRequest,
    undefined,
    LocalUser
  > {}
