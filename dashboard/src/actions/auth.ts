'use server';

import { ENDPOINT_CONFIGS } from '@resala/shared';
import type { LoginRequest, LoginResponse } from '@resala/shared';
import { RedirectType, redirect } from 'next/navigation';

import { callEndpoint } from '../lib/fetch';
import { createSession, deleteSession } from '../lib/session';

export const login = async (payload: LoginRequest['body']) => {
  const token = await callEndpoint<LoginRequest, LoginResponse>(ENDPOINT_CONFIGS.login, {
    body: payload,
  });

  createSession(token.data.accessToken, new Date(token.data.expiresAt));
  redirect('/dashboard', RedirectType.replace);
};

export const logout = async () => {
  deleteSession();
  redirect('/auth/login', RedirectType.replace);
};
