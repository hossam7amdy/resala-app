import { ENDPOINT_CONFIGS, withParams, withQueryParams } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { getTestServer } from './helpers/test-server.js';

describe.skip('TEST /addresses endpoint', () => {
  let client: TestAgent<superset.Test>;

  let userId: number;
  const firstName = 'test';
  const lastName = 'test';
  const email = `test_${Date.now()}@test.com`;
  const password = 'abcABC@123';
  const phone = `01${`${Date.now()}`.slice(-9)}`;

  const country = 'Egypt';
  const state = 'الجيزة';
  const city = 'السادس من أكتوبر';
  const street = 'المنطقة الصناعية الثالثة';
  const building = 'building'; // optional
  const floor = 111; // optional
  const address = 'address'; // optional,

  beforeAll(async () => {
    client = getTestServer();

    await registerNewUser({
      email,
      password,
      phone,
      firstName,
      lastName,
    });

    const { data } = await loginUser(email, password);
    userId = data.user.id;
  });

  it('should get current logged in user', async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.getUser, userId.toString());

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
  });

  it('should create user address', async () => {
    const addressObj = {
      userId,
      country,
      state,
      city,
      street,
      building,
      floor,
      address,
      firstName,
      lastName,
      phone,
    };

    const { method, url } = ENDPOINT_CONFIGS.createAddress;
    const res = await client[method](url)
      .set(await getAuthToken())
      .send(addressObj);

    expect(res.statusCode).toBe(201);
  });

  it('should update user address', async () => {
    const addressList = await listUserAddresses();

    const endpointConfig = withParams(ENDPOINT_CONFIGS.updateAddress, addressList[0].id.toString());
    const { url, method } = withQueryParams(endpointConfig, { userId });
    const res = await client[method](url)
      .set(await getAuthToken())
      .send({
        userId,
        firstName,
        lastName,
        phone,
        state: 'test address1',
        city: 'test city1',
        street: 'test street1',
      });

    expect(res.statusCode).toBe(200);
  });

  it('should get user address list', async () => {
    const { method, url } = withQueryParams(ENDPOINT_CONFIGS.listAddress, { userId });
    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
  });

  it(`should allow only logged user's to get there addresses`, async () => {
    const { method, url } = withQueryParams(ENDPOINT_CONFIGS.listAddress, { userId });
    const res = await client[method](url);

    expect(res.statusCode).toBe(401);
  });

  it('should delete user address', async () => {
    const addressList = await listUserAddresses();

    const endpointConfig = withParams(ENDPOINT_CONFIGS.deleteAddress, addressList[0].id.toString());
    const { method, url } = withQueryParams(endpointConfig, { userId });

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
  });

  it('should not allow user to create more than 3 addresses', async () => {
    const addressObj = {
      userId,
      country,
      state,
      city,
      street,
      building,
      floor,
      address,
      firstName,
      lastName,
      phone,
    };

    const addressList = await listUserAddresses();

    for (let i = 0; i < Math.max(3 - addressList.length, 0); i++) {
      const { method, url } = ENDPOINT_CONFIGS.createAddress;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send(addressObj);

      expect(res.statusCode).toBe(201);
    }

    const { method, url } = ENDPOINT_CONFIGS.createAddress;
    const res = await client[method](url)
      .set(await getAuthToken())
      .send(addressObj);

    expect(res.statusCode).toBe(400); // or the expected error code
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

  const loginUser = async (sign: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign, password });

    expect(result.statusCode).toBe(200);
    return result.body;
  };

  const listUserAddresses = async () => {
    const { method, url } = withQueryParams(ENDPOINT_CONFIGS.listAddress, { userId });

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);

    return res.body.data;
  };
});
