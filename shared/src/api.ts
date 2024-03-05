import { Address, User } from '@prisma/client';

type Request<T> = T;
type Response<T> =
  | {
      success: true;
      message?: string;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

export type LoginRequest = Request<Pick<User, 'email' | 'password'>>;
export type LoginResponse = Response<{
  accessToken: string;
}>;

export type RegisterRequest = Request<Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>>;
export type RegisterResponse = Response<{
  accessToken: string;
}>;

export type ForgotPasswordRequest = Request<Pick<User, 'email'>>;
export type ForgotPasswordResponse = Response<{}>;

export type ResetPasswordRequest = Request<{ code: string } & Pick<User, 'email' | 'password'>>;
export type ResetPasswordResponse = Response<{}>;

export type GetSelfRequest = Request<undefined>; // No data needed
export type GetSelfResponse = Response<Omit<User, 'password' | 'iterations' | 'salt' | 'token'>>;

export type UpdateSelfRequest = Request<Partial<Pick<User, 'phone' | 'firstName' | 'lastName'>>>;
export type UpdateSelfResponse = Response<{}>;

export type ChangePasswordRequest = Request<{
  oldPassword: string;
  newPassword: string;
}>;
export type ChangePasswordResponse = Response<{}>;

export type AdminCreateUserRequest = Request<
  Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'role'> &
    Partial<Pick<User, 'phone'>> // Optional
>;
export type AdminCreateUserResponse = Response<{}>;

export type AdminGetUserRequest = Request<undefined>; // Only path params
export type AdminGetUserResponse = Response<
  Omit<User, 'password' | 'iterations' | 'salt' | 'token'>
>;

export type AdminGetUsersListRequest = Request<undefined>; // No data needed
export type AdminGetUsersListResponse = Response<{
  total: number;
  users: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>[];
}>;

export type AdminUpdateUserRequest = Request<
  Pick<User, 'firstName' | 'lastName' | 'role'> & Partial<Pick<User, 'phone'>>
>;
export type AdminUpdateUserResponse = Response<{}>;

export type AdminDeleteUserRequest = Request<undefined>; // Only path params
export type AdminDeleteUserResponse = Response<{}>;

export type CreateAddressRequest = Omit<Address, 'id'>;
export type CreateAddressResponse = Response<{}>;

export type UpdateAddressRequest = Address;
export type UpdateAddressResponse = Response<{}>;

export type DeleteAddressRequest = Request<undefined>; // Only path params
export type DeleteAddressResponse = Response<{}>;
