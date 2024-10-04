import type { User as ResalaUser } from '@resala/shared';
import type { User } from 'next-auth';
// The `JWT` interface can be found in the `next-auth/jwt` submodule
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { JWT } from 'next-auth/jwt';

export type AuthUser = ResalaUser & User;

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends AuthUser {
    accessToken: string;
    refreshToken?: string;
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: AuthUser;
    accessToken: string;
    expiresAt: number;
    refreshToken?: string;
    error?: 'RefreshTokenError';
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: AuthUser;
    accessToken: string;
    expiresAt: number;
    refreshToken?: string;
    error?: 'RefreshTokenError';
  }
}
