import { ENDPOINT_CONFIGS } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { userAssertions } from './helpers/customAssertions.js';
import { getTestServer } from './helpers/testServer.js';

const ADMIN_USER = {
  email: 'admin@resala.com',
  phone: '01500000000',
  password: 'abcABC@123',
};
const CUSTOMER_USER = {
  email: 'customer@resala.com',
  phone: '01500000001',
  password: 'abcABC@123',
};

const genRandomUser = () => {
  return {
    email: `test_${Date.now()}@mail.com`,
    password: 'abcABC@123',
    firstName: 'test',
    lastName: 'test',
    phone: `01${`${Date.now()}`.slice(-9)}`,
  };
};

describe('TEST /auth endpoints', () => {
  let client: TestAgent<superset.Test>;

  beforeAll(async () => {
    client = await getTestServer();
  });

  describe(`TEST ${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, () => {
    it('should not be able to register a new user, missing (firstName, lastName)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;

      const randUser = genRandomUser();
      const res = await client[method](url).send({
        email: randUser.email,
        password: randUser.password,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it(`should able to register a new user with complete data`, async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        success: true,
      });
    });

    it('should fail to register an already exist email', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
        email: CUSTOMER_USER.email,
      });

      expect(res.statusCode).toBe(409);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail to register an already exist phone', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
        phone: CUSTOMER_USER.phone,
      });

      expect(res.statusCode).toBe(409);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail to register with wrong data (short password)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
        password: 'abc', // short password
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail to register with wrong data (no capital character)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
        password: 'password',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail to register with wrong data (invalid email)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
        email: 'email', // invalid email
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.login.method.toUpperCase()} ${ENDPOINT_CONFIGS.login.url}`, () => {
    it('should login with complete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        sign: CUSTOMER_USER.email,
        password: CUSTOMER_USER.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: {
          user: userAssertions,
          expiresAt: expect.any(String),
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        },
      });
    });

    it('should fail to login with non-existent user', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        sign: `notfound_${CUSTOMER_USER.email}`,
        password: CUSTOMER_USER.password,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail to login without sign property (email/phone)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        password: CUSTOMER_USER.password,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.changePassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.changePassword.url}`, () => {
    it('should change password with complete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send({
          oldPassword: ADMIN_USER.password,
          newPassword: ADMIN_USER.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
      });
    });

    it('should fail to change password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send({
          oldPassword: CUSTOMER_USER.password,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail change password with wrong data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send({
          oldPassword: CUSTOMER_USER.password,
          newPassword: 'password', // doesn't meet the requirements
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.forgotPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.forgotPassword.url}`, () => {
    it('should forgot password with complete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
      const res = await client[method](url).send({ email: CUSTOMER_USER.email });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: {
          expiresAt: expect.any(String),
          resetToken: expect.any(String),
        },
      });
    });

    it('should fail forgot password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
      const res = await client[method](url).send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should fail forgot password with wrong data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
      const res = await client[method](url).send({ email: 'email' });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.resetPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.resetPassword.url}`, () => {
    it('should reset password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.resetPassword;
      const res = await client[method](url).send({
        email: CUSTOMER_USER.email,
        password: CUSTOMER_USER.password,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should reset password with wrong data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.resetPassword;
      const res = await client[method](url).send({
        email: CUSTOMER_USER.email,
        code: 'code',
        password: CUSTOMER_USER.password,
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  const getAuthToken = async () => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url)
      .send({
        sign: ADMIN_USER.email,
        password: ADMIN_USER.password,
      })
      .expect(200);

    return { Authorization: 'Bearer ' + result.body.data.accessToken };
  };
});
