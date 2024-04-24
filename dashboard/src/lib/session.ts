'server-only';

import { cookies } from 'next/headers';

const SESSION = 'session';

export const createSession = (token: string, expiresAt: Date) => {
  cookies().set(SESSION, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(expiresAt),
    sameSite: 'lax',
    path: '/',
  });
};

export const getSession = () => {
  return cookies().get(SESSION);
};

export const deleteSession = () => {
  cookies().delete(SESSION);
};
