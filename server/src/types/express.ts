import { User } from '@prisma/client';
import {
  AdminDeleteUserRequest,
  AdminDeleteUserResponse,
  AdminGetUserRequest,
  AdminGetUserResponse,
  AdminGetUsersListRequest,
  AdminGetUsersListResponse,
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressRequest,
  DeleteAddressResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GetProfileRequest,
  GetProfileResponse,
  GetUserAddressListRequest,
  GetUserAddressListResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ReqQuery,
  ResBody,
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@resala/shared';
import { RequestHandler } from 'express';

export interface LocalUser {
  user: Pick<
    User,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'isVerified'
    | 'phone'
    | 'role'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
  >;
}

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  ResBody | Res,
  Req,
  ReqQuery,
  LocalUser
>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Params,
  ResBody | Res,
  Req,
  ReqQuery,
  LocalUser
>;

export type GetProfile = ExpressHandler<GetProfileRequest, GetProfileResponse>;

export type UpdateProfile = ExpressHandler<UpdateProfileRequest, UpdateProfileResponse>;

export type AdminGetUser = ExpressHandlerWithParams<
  { userId: string },
  AdminGetUserRequest,
  AdminGetUserResponse
>;

export type AdminUpdateUser = ExpressHandlerWithParams<
  { userId: string },
  AdminUpdateUserRequest,
  AdminUpdateUserResponse
>;

export type AdminGetUsersList = ExpressHandler<AdminGetUsersListRequest, AdminGetUsersListResponse>;

export type AdminDeleteUser = ExpressHandlerWithParams<
  { userId: string },
  AdminDeleteUserRequest,
  AdminDeleteUserResponse
>;

export type CreateUserAddress = ExpressHandler<CreateAddressRequest, CreateAddressResponse>;

export type UpdateUserAddress = ExpressHandlerWithParams<
  { addressId: string },
  UpdateAddressRequest,
  UpdateAddressResponse
>;

export type DeleteUserAddress = ExpressHandlerWithParams<
  { addressId: string },
  DeleteAddressRequest,
  DeleteAddressResponse
>;

export type GetUserAddressList = ExpressHandler<
  GetUserAddressListRequest,
  GetUserAddressListResponse
>;

export type Login = ExpressHandler<LoginRequest, LoginResponse>;

export type Register = ExpressHandler<RegisterRequest, RegisterResponse>;

export type VerifyEmail = ExpressHandler<VerifyEmailRequest, VerifyEmailResponse>;

export type ForgotPassword = ExpressHandler<ForgotPasswordRequest, ForgotPasswordResponse>;

export type ResetPassword = ExpressHandler<ResetPasswordRequest, ResetPasswordResponse>;

export type ChangePassword = ExpressHandler<ChangePasswordRequest, ChangePasswordResponse>;

export type ResendVerificationEmail = ExpressHandler<
  ResendVerificationEmailRequest,
  ResendVerificationEmailResponse
>;
