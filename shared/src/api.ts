import { Address, User } from '@prisma/client';

interface Response<T = undefined> {
  success: boolean;
  message?: string;
  data: T;
}
export interface ReqQuery {
  page?: string;
  query?: string;
}

export interface LoginRequest extends Pick<User, 'email' | 'password'> {}
export interface LoginResponse
  extends Response<{
    accessToken: string;
  }> {}

export interface RegisterRequest
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> {}
export interface RegisterResponse
  extends Response<{
    accessToken: string;
  }> {}

export interface VerifyEmailRequest {} // Only path params
export interface VerifyEmailResponse extends Response {}

export interface ResendVerificationEmailRequest extends Pick<User, 'email'> {}
export interface ResendVerificationEmailResponse extends Response {}

export interface ForgotPasswordRequest extends Pick<User, 'email'> {}
export interface ForgotPasswordResponse extends Response {}

export interface ResetPasswordRequest extends Pick<User, 'email' | 'password'> {
  code: string;
}
export interface ResetPasswordResponse extends Response {}

export interface GetProfileRequest {} // No data needed
export interface GetProfileResponse
  extends Response<Omit<User, 'password' | 'iterations' | 'salt' | 'token'>> {}

export interface UpdateProfileRequest extends Pick<User, 'phone' | 'firstName' | 'lastName'> {}
export interface UpdateProfileResponse extends Response {}

export interface GetUserAddressListRequest {}
export interface GetUserAddressListResponse extends Response<Address[]> {}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse extends Response {}

export interface AdminCreateUserRequest
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'role'>,
    Partial<Pick<User, 'phone'>> {}
export interface AdminCreateUserResponse
  extends Response<Omit<User, 'password' | 'salt' | 'iterations' | 'token'>> {}

export interface AdminGetUserRequest {} // Only path params
export interface AdminGetUserResponse
  extends Response<Omit<User, 'password' | 'iterations' | 'salt' | 'token'>> {}

export interface AdminGetUsersListRequest {} // No data needed
export interface AdminGetUsersListResponse
  extends Response<{
    total: number;
    users: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>[];
  }> {}

export interface AdminUpdateUserRequest
  extends Pick<User, 'firstName' | 'lastName' | 'role'>,
    Partial<Pick<User, 'phone'>> {}
export interface AdminUpdateUserResponse extends Response {}

export interface AdminDeleteUserRequest {} // Only path params
export interface AdminDeleteUserResponse extends Response {}

export interface CreateAddressRequest extends Omit<Address, 'id'> {}
export interface CreateAddressResponse extends Response<Address> {}

export interface UpdateAddressRequest extends Address {}
export interface UpdateAddressResponse extends Response<Address> {}

export interface DeleteAddressRequest {} // Only path params
export interface DeleteAddressResponse extends Response {}
