import {
  AdminDeleteUserRequest,
  AdminDeleteUserResponse,
  AdminGetUserRequest,
  AdminGetUserResponse,
  AdminGetUsersListRequest,
  AdminGetUsersListResponse,
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressRequest,
  DeleteAddressResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetUserAddressListRequest,
  GetUserAddressListResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@resala/shared';

import { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export interface GetProfile
  extends ExpressHandler<GetProfileRequest, GetProfileResponse, {}, LocalUser> {}

export interface UpdateProfile
  extends ExpressHandler<UpdateProfileRequest['body'], UpdateProfileResponse, {}, LocalUser> {}

export interface AdminGetUser
  extends ExpressHandlerWithParams<
    AdminGetUserRequest['params'],
    undefined,
    AdminGetUserResponse,
    {},
    LocalUser
  > {}

export interface AdminUpdateUser
  extends ExpressHandlerWithParams<
    AdminUpdateUserRequest['params'],
    AdminUpdateUserRequest['body'],
    AdminUpdateUserResponse
  > {}

export interface AdminGetUsersList
  extends ExpressHandler<
    undefined,
    AdminGetUsersListResponse,
    AdminGetUsersListRequest['query'],
    LocalUser
  > {}

export interface AdminDeleteUser
  extends ExpressHandlerWithParams<
    AdminDeleteUserRequest['params'],
    undefined,
    AdminDeleteUserResponse,
    {},
    LocalUser
  > {}

export interface CreateUserAddress
  extends ExpressHandler<CreateAddressRequest['body'], CreateAddressResponse, {}, LocalUser> {}

export interface UpdateUserAddress
  extends ExpressHandlerWithParams<
    UpdateAddressRequest['params'],
    UpdateAddressRequest['body'],
    UpdateAddressResponse,
    {},
    LocalUser
  > {}

export interface DeleteUserAddress
  extends ExpressHandlerWithParams<
    UpdateAddressRequest['params'],
    DeleteAddressRequest,
    DeleteAddressResponse
  > {}

export interface GetUserAddressList
  extends ExpressHandler<GetUserAddressListRequest, GetUserAddressListResponse, {}, LocalUser> {}
