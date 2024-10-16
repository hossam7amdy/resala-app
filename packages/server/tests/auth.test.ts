import { ENDPOINT_CONFIGS } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { JwtManager } from '../src/features/auth/jwt.manager.js';
import { getTestServer } from './setup/test-server.js';

describe('TEST /auth endpoints', () => {
  let jwtManager: JwtManager;
  let client: TestAgent<superset.Test>;

  const customerUserObj = {
    firstName: 'customer',
    lastName: 'user',
    email: 'customer@resala.com',
    phone: '01500000001',
    password: 'abcABC@123',
  };

  const genRandomUser = () => ({
    email: `random_${Date.now()}@mail.com`,
    password: 'abcABC@123',
    firstName: 'random',
    lastName: 'user',
    phone: `01${`${Date.now()}`.slice(-9)}`,
  });

  beforeAll(async () => {
    jwtManager = new JwtManager();
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
      const res = await client[method](url).send(customerUserObj);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        success: true,
      });
    });

    it('should fail to register an already exist email', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        ...genRandomUser(),
        email: customerUserObj.email,
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
        phone: customerUserObj.phone,
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
        sign: customerUserObj.email,
        password: customerUserObj.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
      });
    });

    it('should fail to login with non-existent user', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        sign: `notfound_${customerUserObj.email}`,
        password: customerUserObj.password,
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
        password: customerUserObj.password,
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
      const randomUserObj = genRandomUser();

      const { method: registerMethod, url: registerUrl } = ENDPOINT_CONFIGS.register;
      await client[registerMethod](registerUrl).send(randomUserObj).expect(201);

      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken(randomUserObj.email, randomUserObj.password))
        .send({
          oldPassword: randomUserObj.password,
          newPassword: 'abcABC123#',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject({
        success: true,
      });
    });

    it('should fail to change password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken(customerUserObj.email, customerUserObj.password))
        .send({
          oldPassword: customerUserObj.password,
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
        .set(await getAuthToken(customerUserObj.email, customerUserObj.password))
        .send({
          oldPassword: customerUserObj.password,
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
      const res = await client[method](url).send({ email: customerUserObj.email });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: expect.any(String),
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
        newPassword: customerUserObj.password,
        confirmNewPassword: customerUserObj.password,
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });

    it('should reset password with wrong data', async () => {
      const token = jwtManager.signReset({ id: '2', email: customerUserObj.email });

      const { method, url } = ENDPOINT_CONFIGS.resetPassword;
      const res = await client[method](url)
        .set({ Authorization: 'Bearer ' + token })
        .send({
          newPassword: 'password',
          confirmNewPassword: customerUserObj.password,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  const getAuthToken = async (email: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;

    const res = await client[method](url).send({ sign: email, password });

    expect(res.statusCode).toBe(200);

    return { Authorization: 'Bearer ' + res.body.data.accessToken };
  };
});
