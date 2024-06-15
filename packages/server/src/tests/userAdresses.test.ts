import { ENDPOINT_CONFIGS } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import prisma from '../lib/prisma/index.js';
import { UserService } from '../services/index.js';
import { getTestServer } from './setup/testServer.js';

const addressAssertions = {
  id: expect.any(Number),
  state: expect.any(String),
  city: expect.any(String),
  street: expect.any(String),
  phone: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  building: expect.any(String),
  floor: expect.any(Number),
  address: expect.any(String),
  country: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const userAssertions = {
  id: expect.any(Number),
  email: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  phone: expect.any(String),
  role: expect.any(String),
  isVerified: expect.any(Boolean),
  // @ts-expect-error lastLogin is a string or null
  lastLogin: expect.toBeNullOrString(),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  // @ts-expect-error lastLogin is a string or null
  deletedAt: expect.toBeNullOrString(),
};

describe('TEST /users/self/addresses endpoint', () => {
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

    await makeUserAdmin();
  }, 10000);

  it('should get current logged in user', async () => {
    const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      success: true,
      data: userAssertions,
    });
  });

  it('should create user address', async () => {
    const address = {
      state: 'الجيزة',
      city: 'السادس من أكتوبر',
      street: 'المنطقة الصناعية الثالثة',
      phone: '01010000000',
      firstName: 'firstName',
      lastName: 'lastName',
      building: 'building', // optional
      floor: 111, // optional
      address: 'address', // optional,
    };

    const { method, url } = ENDPOINT_CONFIGS.createAddress;
    const res = await client[method](url)
      .set(await getAuthToken())
      .send(address);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ success: true, data: addressAssertions });
  });

  it('should update user address', async () => {
    const address = await getLastAddress();

    const { url, method } = ENDPOINT_CONFIGS.updateAddress;
    const res = await client[method](url.replace(':addressId', address.id))
      .set(await getAuthToken())
      .send({
        firstName,
        lastName,
        phone,
        state: 'test address1',
        city: 'test city1',
        street: 'test street1',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: addressAssertions });
  });

  it('should get user address list', async () => {
    const res = await client.get(ENDPOINT_CONFIGS.getAddressList.url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: expect.arrayContaining([addressAssertions]) });
  });

  it('should delete user address', async () => {
    const { url, method } = ENDPOINT_CONFIGS.deleteAddress;

    const address = await getLastAddress();

    const res = await client[method](url.replace(':addressId', address.id)).set(
      await getAuthToken()
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, data: addressAssertions });
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
    return userService.updateUser(res.body.data.id, { role: 'ADMIN' });
  };

  const loginUser = async (sign: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign, password });

    expect(result.statusCode).toBe(200);
    return result.body;
  };

  const getLastAddress = async () => {
    const { method, url } = ENDPOINT_CONFIGS.getAddressList;

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);

    return res.body.data.pop();
  };
});
