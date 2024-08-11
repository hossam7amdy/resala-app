'use server';

import { cookies } from 'next/headers';

export type CookieName = 'jwt' | 'refresh';
type CookieOptions = { token: string; expireDate?: string };

export const setCookie = (name: CookieName = 'jwt', { token, expireDate }: CookieOptions) => {
  return cookies().set(name, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    expires: expireDate ? new Date(expireDate) : undefined,
    sameSite: 'lax',
    path: '/',
  });
};

export const getCookie = async (name: CookieName = 'jwt') => {
  return cookies().get(name);
};

export const deleteCookie = (name: CookieName = 'jwt') => {
  return cookies().delete(name);
};
