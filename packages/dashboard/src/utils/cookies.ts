import { cookies } from 'next/headers';
import 'server-only';

export const setCookie = (
  name: string,
  { token, expireDate }: { token: string; expireDate?: string }
) => {
  return cookies().set(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expireDate ? new Date(expireDate) : -1,
    sameSite: 'lax',
    path: '/',
  });
};

export const getCookie = (name: string) => {
  return cookies().get(name);
};

export const deleteCookie = (name: string) => {
  return cookies().delete(name);
};
