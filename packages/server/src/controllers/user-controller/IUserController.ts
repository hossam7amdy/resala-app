import type {
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressRequest,
  DeleteAddressResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserAddressListRequest,
  GetUserAddressListResponse,
  GetUserRequest,
  GetUserResponse,
  ListUsersRequest,
  ListUsersResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type GetUser = ExpressHandlerWithParams<
  GetUserRequest['params'],
  undefined,
  GetUserResponse,
  undefined,
  LocalUser
>;

export type UpdateUser = ExpressHandlerWithParams<
  UpdateUserRequest['params'],
  UpdateUserRequest['body'],
  UpdateUserResponse
>;

export type ListUsers = ExpressHandler<
  undefined,
  ListUsersResponse,
  ListUsersRequest['query'],
  LocalUser
>;

export type DeleteUser = ExpressHandlerWithParams<
  DeleteUserRequest['params'],
  undefined,
  DeleteUserResponse,
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
  getUser: GetUser;
  updateUser: UpdateUser;
  listUsers: ListUsers;
  deleteUser: DeleteUser;
  createUserAddress: CreateUserAddress;
  updateUserAddress: UpdateUserAddress;
  deleteUserAddress: DeleteUserAddress;
  getUserAddressList: GetUserAddressList;
}
