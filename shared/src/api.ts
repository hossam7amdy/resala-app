import { Address, User } from '@prisma/client';

// unified response body for all requests
interface ResBody<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ReqQuery {
  page?: string;
  query?: string;
}

export interface LoginRequest {
  sign: string;
  password: string;
}
export interface LoginResponse
  extends ResBody<{
    expiresIn: number; // in seconds (e.g. 86400 for 1 day)
    accessToken: string;
    refreshToken: string;
  }> {}

export interface RegisterRequest
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> {}
export interface RegisterResponse extends LoginResponse {}

export interface VerifyEmailRequest extends Pick<User, 'email'> {
  token: string;
}
export interface VerifyEmailResponse extends ResBody {}

export interface ResendVerificationEmailRequest {}
export interface ResendVerificationEmailResponse extends ResBody {}

export interface ForgotPasswordRequest extends Pick<User, 'email'> {}
export interface ForgotPasswordResponse
  extends ResBody<{
    resetToken: string;
    expiresIn: number; // in seconds (e.g. 600 for 10 minutes)
  }> {}

export interface ResetPasswordRequest extends Pick<User, 'email' | 'password'> {
  code: string;
}
export interface ResetPasswordResponse extends ResBody {}

export interface GetProfileRequest {} // No data needed
export interface GetProfileResponse
  extends ResBody<Omit<User, 'password' | 'iterations' | 'salt' | 'token'>> {}

export interface UpdateProfileRequest extends Pick<User, 'phone' | 'firstName' | 'lastName'> {}
export interface UpdateProfileResponse extends ResBody {}

export interface GetUserAddressListRequest {}
export interface GetUserAddressListResponse extends ResBody<Address[]> {}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse extends ResBody<Pick<User, 'updatedAt'>> {}

export interface AdminCreateUserRequest
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'role'>,
    Partial<Pick<User, 'phone'>> {}
export interface AdminCreateUserResponse
  extends ResBody<Omit<User, 'password' | 'salt' | 'iterations' | 'token'>> {}

export interface AdminGetUserRequest {} // Only path params
export interface AdminGetUserResponse
  extends ResBody<Omit<User, 'password' | 'iterations' | 'salt' | 'token'>> {}

export interface AdminGetUsersListRequest {} // No data needed
export interface AdminGetUsersListResponse
  extends ResBody<{
    total: number;
    users: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>[];
  }> {}

export interface AdminUpdateUserRequest
  extends Pick<User, 'firstName' | 'lastName' | 'role'>,
    Partial<Pick<User, 'phone'>> {}
export interface AdminUpdateUserResponse extends ResBody {}

export interface AdminDeleteUserRequest {} // Only path params
export interface AdminDeleteUserResponse extends ResBody {}

export interface CreateAddressRequest extends Omit<Address, 'id'> {}
export interface CreateAddressResponse extends ResBody<Address> {}

export interface UpdateAddressRequest extends Address {}
export interface UpdateAddressResponse extends ResBody<Address> {}

export interface DeleteAddressRequest {} // Only path params
export interface DeleteAddressResponse extends ResBody {}
