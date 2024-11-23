import { expect } from 'vitest';

import { ENDPOINT_CONFIGS } from '../../../shared/src/endpoints';
import { getTestServer } from './test-server';

export const getAuthToken = async (admin: boolean) => {
  const email = admin ? 'test-admin@resala.com' : 'test-customer@resala.com';
  const password = 'abcABC@123';

  const { method, url } = ENDPOINT_CONFIGS.login;
  const res = await getTestServer()[method](url).send({ sign: email, password });

  expect(res.statusCode).toBe(200);
  expect(res.body.data).toHaveProperty('accessToken');

  return { Authorization: 'Bearer ' + res.body.data.accessToken };
};
