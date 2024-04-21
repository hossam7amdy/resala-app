'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(payload: Record<string, string> | undefined) {
  try {
    await signIn('credentials', {
      ...payload,
      redirect: true,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
