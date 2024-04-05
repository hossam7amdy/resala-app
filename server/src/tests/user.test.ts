import { ENDPOINT_CONFIGS } from '@resala/shared';
import superset from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { userService } from '../service';
import { getTestServer } from './testserver';

jest.mock('nodemailer', () => {
  return {
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(Promise.resolve(true) as never),
    }),
  };
});

/**
 * Mocking the azure storage module
 * @see https://remarkablemark.org/blog/2018/06/28/jest-mock-default-named-export/
 */
jest.mock('../../src/lib/azure-storage/azure', () => ({
  __esModule: true, // this property makes it work
  uploadBlob: jest.fn(),
  deleteBlob: jest.fn(),
}));

describe('TEST /users endpoint', () => {
  let client: TestAgent<superset.Test>;

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

    await client[method](url)
      .set(await getAuthToken())
      .expect(200);
  });

  it('should update current logged in user', async () => {
    const { method, url } = ENDPOINT_CONFIGS.updateCurrentUser;

    const res = await client[method](url)
      .set(await getAuthToken())
      .send({ firstName, lastName, phone });

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true, data: expect.any(Object) });
  });

  it('should create user address', async () => {
    const { method, url } = ENDPOINT_CONFIGS.createAddress;

    const res = await client[method](url)
      .set(await getAuthToken())
      .send({
        firstName,
        lastName,
        phone,
        state: 'الجيزة',
        city: 'السادس من أكتوبر',
        street: 'المنطقة الصناعية الثالثة',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ success: true, data: expect.any(Object) });
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
    expect(res.body).toMatchObject({ success: true, data: expect.any(Object) });
  });

  it('should get user address list', async () => {
    const res = await client.get(ENDPOINT_CONFIGS.getAddressList.url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true, data: expect.any(Array) });
  });

  it('should delete user address', async () => {
    const { url, method } = ENDPOINT_CONFIGS.deleteAddress;

    const address = await getLastAddress();

    const res = await client[method](url.replace(':addressId', address.id)).set(
      await getAuthToken()
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true });
  });

  it("it should get a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.adminGetUser;

    const res = await client[method](url.replace(':userId', user.id)).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true, data: expect.any(Object) });
  });

  it('it should get users list', async () => {
    const { method, url } = ENDPOINT_CONFIGS.adminGetUsersList;

    await client[method](url)
      .set(await getAuthToken())
      .expect(200);
  });

  it("it should update a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.adminUpdateUser;

    const res = await client[method](url.replace(':userId', user.id))
      .set(await getAuthToken())
      .send({ firstName: 'test1', lastName: 'test1', role: 'CUSTOMER', phone: '01000000000' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ success: true, data: expect.any(Object) });
  });

  it("it should delete a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.adminDeleteUser;

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
    expect(res.body).toMatchObject({ success: true });
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
    expect(result.body).toMatchObject({
      success: true,
      data: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number),
      },
    });

    return result.body;
  };

  const getLastAddress = async () => {
    const { method, url } = ENDPOINT_CONFIGS.getAddressList;

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);

    return res.body.data.pop();
  };

  const getLastUser = async () => {
    const { method, url } = ENDPOINT_CONFIGS.adminGetUsersList;

    const res = await client[method](url).set(await getAuthToken());

    expect(res.statusCode).toBe(200);
    expect(res.body.data.users.length).toBeGreaterThan(0);

    return res.body.data.users.pop();
  };
});
