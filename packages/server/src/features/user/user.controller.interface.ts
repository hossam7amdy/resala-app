import type {
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressRequest,
  DeleteAddressResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  ListAddressRequest,
  ListAddressResponse,
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

export type CreateUserAddress = ExpressHandlerWithParams<
  undefined,
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
  undefined,
  DeleteAddressResponse,
  DeleteAddressRequest['query'],
  LocalUser
>;

export type ListUserAddress = ExpressHandlerWithParams<
  undefined,
  undefined,
  ListAddressResponse,
  ListAddressRequest['query'],
  LocalUser
>;

export interface IUserController {
  getUser: GetUser;
  updateUser: UpdateUser;
  listUsers: ListUsers;
  deleteUser: DeleteUser;
  createUserAddress: CreateUserAddress;
  updateUserAddress: UpdateUserAddress;
  deleteUserAddress: DeleteUserAddress;
  listUserAddress: ListUserAddress;
}
