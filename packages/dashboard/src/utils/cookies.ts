'use server';

import { cookies } from 'next/headers';

type CookieName = 'jwt-token' | 'refresh-token';
type CookieOptions = { token: string; expireDate?: string };

const isProd = process.env.NODE_ENV === 'production';
const prefix = isProd ? '' : '__Dev-xxx.';

export const setCookie = (name: CookieName = 'jwt-token', { token, expireDate }: CookieOptions) => {
  return cookies().set(`${prefix}${name}`, token, {
    httpOnly: false,
    secure: isProd,
    expires: expireDate ? new Date(expireDate) : undefined,
    sameSite: 'strict',
    path: '/',
  });
};

export const getCookie = async (name: CookieName = 'jwt-token') => {
  return cookies().get(`${prefix}${name}`);
};

export const deleteCookie = (name: CookieName = 'jwt-token') => {
  return cookies().delete(`${prefix}${name}`);
};
