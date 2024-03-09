/**
 * @file This file contains all the types for the API requests and responses.
 */
import { Address, User } from '@prisma/client';

// Utility types
interface ResBody {
  success: boolean;
  message?: string;
}
export interface ReqQuery {
  page?: string;
  query?: string;
}

// Auth types
export interface LoginRequest {
  sign: string;
  password: string;
}
export interface LoginResponse extends ResBody {
  data: {
    expiresIn: number; // in seconds (e.g. 86400 for 1 day)
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterRequest
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName'> {}
export interface RegisterResponse extends LoginResponse {}

export interface VerifyEmailRequest {
  email: User['email'];
  token: string;
}
export interface VerifyEmailResponse extends ResBody {}

export interface ResendVerificationEmailRequest {}
export interface ResendVerificationEmailResponse extends ResBody {}

export interface ForgotPasswordRequest extends Pick<User, 'email'> {}
export interface ForgotPasswordResponse extends ResBody {
  data: {
    resetToken: string;
    expiresIn: number; // in seconds (e.g. 600 for 10 minutes)
  };
}

export interface ResetPasswordRequest extends Pick<User, 'email' | 'password'> {
  code: string;
}
export interface ResetPasswordResponse extends ResBody {}

export interface GetProfileRequest {} // No data needed
export interface GetProfileResponse extends ResBody {
  data: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse extends ResBody {}

// User types
export interface UpdateProfileRequest extends Pick<User, 'phone' | 'firstName' | 'lastName'> {}
export interface UpdateProfileResponse extends ResBody {}

export interface GetUserAddressListRequest {}
export interface GetUserAddressListResponse extends ResBody {
  data: Address[];
}

export interface AdminCreateUserRequest
  extends Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'role'> {
  phone?: User['phone'];
}
export interface AdminCreateUserResponse extends ResBody {
  data: Omit<User, 'password' | 'salt' | 'iterations' | 'token'>;
}

export interface AdminGetUserRequest {} // Only path params
export interface AdminGetUserResponse extends ResBody {
  data: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>;
}

export interface AdminGetUsersListRequest {} // No data needed
export interface AdminGetUsersListResponse extends ResBody {
  data: {
    total: number; // Total number of users in the database (for pagination)
    users: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>[];
  };
}

export interface AdminUpdateUserRequest extends Pick<User, 'firstName' | 'lastName' | 'role'> {
  phone?: User['phone'];
}
export interface AdminUpdateUserResponse extends ResBody {
  data: Omit<User, 'password' | 'iterations' | 'salt' | 'token'>;
}

export interface AdminDeleteUserRequest {} // Only path params
export interface AdminDeleteUserResponse extends ResBody {}

// Address types
export interface CreateAddressRequest extends Omit<Address, 'id'> {}
export interface CreateAddressResponse extends ResBody {
  data: Address;
}

export interface UpdateAddressRequest extends Address {}
export interface UpdateAddressResponse extends ResBody {
  data: Address;
}

export interface DeleteAddressRequest {} // Only path params
export interface DeleteAddressResponse extends ResBody {
  data: {
    id: Address['id'];
  };
}

// Category types

// Product types

// Colors types

// Sizes types

// Stock types

// Cart types

// Wishlist types

// Order types

// Payment types

// Shipping types

// Review types

// Notification types
