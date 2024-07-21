import { PrismaClient } from '@prisma/client';
import { ENDPOINT_CONFIGS, type Role } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import UserRepository from '../repositories/UserRepository.js';
import { UserService } from '../services/index.js';
import { userAssertions } from './helpers/customAssertions.js';
import { getTestServer } from './helpers/testServer.js';

describe('TEST /users endpoint', () => {
  let client: TestAgent<superset.Test>;
  let userService: UserService;

  const firstName = 'test';
  const lastName = 'test';
  const email = `test_${Date.now()}@test.com`;
  const password = 'abcABC@123';
  const phone = `01${`${Date.now()}`.slice(-9)}`;

  beforeAll(async () => {
    client = await getTestServer();

    userService = new UserService(new UserRepository(new PrismaClient()));

    await registerNewUser({
      email,
      password,
      phone,
      firstName,
      lastName,
    });

    await makeUserAdmin();
  });

  it('should get current logged in user', async () => {
    const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: userAssertions,
    });
  });

  it('should update current logged in user', async () => {
    const { method, url } = ENDPOINT_CONFIGS.updateCurrentUser;

    const res = await client[method](url)
      .set(await getAuthToken())
      .send({ firstName, lastName, phone });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: userAssertions,
    });
  });

  it("it should get a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.getUser;

    const res = await client[method](url.replace(':userId', user.id)).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: userAssertions });
  });

  it('it should get users list', async () => {
    const { method, url } = ENDPOINT_CONFIGS.listUsers;

    await client[method](url)
      .set(await getAuthToken())
      .expect(200);
  });

  it("it should update a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.updateUser;

    const res = await client[method](url.replace(':userId', user.id))
      .set(await getAuthToken())
      .send({ firstName: 'test1', lastName: 'test1', role: 'CUSTOMER', phone: '01000000000' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: userAssertions });
  });

  it("it should delete a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.deleteUser;

    await client[method](url.replace(':userId', user.id))
      .set(await getAuthToken())
      .expect(200);
  });

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

    // make him admin
    return userService.updateUser(res.body.data.id, { role: 'ADMIN' as Role });
  };

  const loginUser = async (sign: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign, password });

    expect(result.statusCode).toBe(200);
    return result.body;
  };

  const getLastUser = async () => {
    const { method, url } = ENDPOINT_CONFIGS.listUsers;

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body.data.users.length).toBeGreaterThan(0);

    return res.body.data.users.pop();
  };
});
