'use server';

import { cookies } from 'next/headers';

const cookieName = 'jwt';

export const setCookie = (token: string, expireDate: string) => {
  cookies().set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    // expires: new Date(expireDate),
    sameSite: 'lax',
    path: '/',
  });
};

export const getCookie = () => {
  return cookies().get(cookieName);
};

export const deleteCookie = () => {
  cookies().delete(cookieName);
};
