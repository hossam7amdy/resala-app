import { ENDPOINT_CONFIGS } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import prisma from '../lib/prisma/index.js';
import { UserService, inventoryService } from '../services/index.js';
import { getTestServer } from './setup/testServer.js';

describe('TEST /categories endpoint', () => {
  let client: TestAgent<superset.Test>;
  const userService = new UserService(prisma);

  const firstName = 'test';
  const lastName = 'test';
  const email = `test_${Date.now()}@test.com`;
  const password = 'abcABC@123';
  const phone = `01${`${Date.now()}`.slice(-9)}`;

  beforeAll(async () => {
    client = await getTestServer();

    await registerNewUser({
      email,
      password,
      phone,
      firstName,
      lastName,
    });
  }, 10000);

  it('it should return categories list', async () => {});

  const registerNewUser = async (payload: {
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
  }) => {
    const { method, url } = ENDPOINT_CONFIGS.register;

    const res = await client[method](url).send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true });
  };

  const getAuthToken = async () => {
    const res = await loginUser(email, password);

    return { Authorization: 'Bearer ' + res.data.accessToken };
  };

  const makeUserAdmin = async () => {
    const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;
    const res = await client[method](url).set(await getAuthToken());

    return userService.updateUser(res.body.data.id, { role: 'ADMIN' });
  };

  const loginUser = async (sign: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign, password });

    expect(result.statusCode).toBe(200);
    return result.body;
  };
});
