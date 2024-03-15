import { User } from '@prisma/client';
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

export interface Locals {
  user: Omit<User, 'password' | 'salt' | 'iterations'>;
}

export interface GetProfile
  extends RequestHandler<undefined, GetProfileResponse, GetProfileRequest, undefined, Locals> {}

export interface UpdateProfile
  extends RequestHandler<
    undefined,
    UpdateProfileResponse,
    UpdateProfileRequest,
    undefined,
    Locals
  > {}

export interface AdminGetUser
  extends RequestHandler<
    { userId: string },
    AdminGetUserResponse,
    AdminGetUserRequest,
    undefined,
    Locals
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
    { userId: string },
    AdminDeleteUserResponse,
    AdminDeleteUserRequest,
    undefined,
    Locals
  > {}

export interface AdminCreateUser
  extends RequestHandler<
    undefined,
    AdminCreateUserResponse,
    AdminCreateUserRequest,
    undefined,
    Locals
  > {}

export interface AdminUpdateUser
  extends RequestHandler<
    { userId: string },
    AdminUpdateUserResponse,
    AdminUpdateUserRequest,
    undefined,
    Locals
  > {}
