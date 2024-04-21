import { GetProfileResponse, LoginResponse } from '@resala/shared';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: GetProfileResponse['data'] & LoginResponse['data'];
  }
}
