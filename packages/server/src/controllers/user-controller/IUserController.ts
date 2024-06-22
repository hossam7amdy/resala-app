import type {
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

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type GetProfile = ExpressHandler<
  GetProfileRequest,
  GetProfileResponse,
  undefined,
  LocalUser
>;

export type UpdateProfile = ExpressHandler<
  UpdateProfileRequest['body'],
  UpdateProfileResponse,
  undefined,
  LocalUser
>;

export type AdminGetUser = ExpressHandlerWithParams<
  AdminGetUserRequest['params'],
  undefined,
  AdminGetUserResponse,
  undefined,
  LocalUser
>;

export type AdminUpdateUser = ExpressHandlerWithParams<
  AdminUpdateUserRequest['params'],
  AdminUpdateUserRequest['body'],
  AdminUpdateUserResponse
>;

export type AdminGetUsersList = ExpressHandler<
  undefined,
  AdminGetUsersListResponse,
  AdminGetUsersListRequest['query'],
  LocalUser
>;

export type AdminDeleteUser = ExpressHandlerWithParams<
  AdminDeleteUserRequest['params'],
  undefined,
  AdminDeleteUserResponse,
  undefined,
  LocalUser
>;

export type CreateUserAddress = ExpressHandler<
  CreateAddressRequest['body'],
  CreateAddressResponse,
  undefined,
  LocalUser
>;

export type UpdateUserAddress = ExpressHandlerWithParams<
  UpdateAddressRequest['params'],
  UpdateAddressRequest['body'],
  UpdateAddressResponse,
  undefined,
  LocalUser
>;

export type DeleteUserAddress = ExpressHandlerWithParams<
  UpdateAddressRequest['params'],
  DeleteAddressRequest,
  DeleteAddressResponse,
  undefined,
  LocalUser
>;

export type GetUserAddressList = ExpressHandler<
  GetUserAddressListRequest,
  GetUserAddressListResponse,
  undefined,
  LocalUser
>;

export default interface IUserController {
  getProfile: GetProfile;
  updateProfile: UpdateProfile;
  adminGetUser: AdminGetUser;
  adminUpdateUser: AdminUpdateUser;
  adminListUsers: AdminGetUsersList;
  adminDeleteUser: AdminDeleteUser;
  createUserAddress: CreateUserAddress;
  updateUserAddress: UpdateUserAddress;
  deleteUserAddress: DeleteUserAddress;
  getUserAddressList: GetUserAddressList;
}
