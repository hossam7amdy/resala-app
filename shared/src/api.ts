/**
 * @file This file contains all the types for the API requests and responses.
 */
import { Address, User } from '@prisma/client';

// Utility types
interface SafeUser extends Omit<User, 'password' | 'iterations' | 'salt'> {}

export interface ResBody {
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
export interface RegisterResponse extends ResBody {}

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

export interface ResetPasswordRequest {
  email: User['email'];
  password: User['password'];
  code: string;
}
export interface ResetPasswordResponse extends ResBody {}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse extends ResBody {}

// User types
export interface GetProfileRequest {} // No data needed
export interface GetProfileResponse extends ResBody {
  data: SafeUser;
}

export interface UpdateProfileRequest extends Pick<User, 'phone' | 'firstName' | 'lastName'> {}
export interface UpdateProfileResponse extends ResBody {
  data: SafeUser;
}

export interface GetUserAddressListRequest {}
export interface GetUserAddressListResponse extends ResBody {
  data: Address[];
}

export interface AdminGetUserRequest {} // Only path params
export interface AdminGetUserResponse extends ResBody {
  data: SafeUser;
}

export interface AdminGetUsersListRequest {} // No data needed
export interface AdminGetUsersListResponse extends ResBody {
  data: {
    pagination: {
      page: number;
      limit: number;
      total: number; // Total number of users in the database (for pagination)
    };
    users: SafeUser[];
  };
}

export interface AdminUpdateUserRequest extends Pick<User, 'firstName' | 'lastName' | 'role'> {
  phone?: User['phone'];
}
export interface AdminUpdateUserResponse extends ResBody {
  data: SafeUser;
}

export interface AdminDeleteUserRequest {} // Only path params
export interface AdminDeleteUserResponse extends ResBody {}

// Address types
export interface CreateAddressRequest extends Omit<Address, 'id'> {}
export interface CreateAddressResponse extends ResBody {
  data: Address;
}

export interface UpdateAddressRequest extends Partial<Address> {
  state: Address['state'];
  city: Address['city'];
  street: Address['street'];
}
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
