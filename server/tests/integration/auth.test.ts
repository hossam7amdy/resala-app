import { beforeAll, describe, expect, it } from '@jest/globals';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import superset from 'supertest';
import TestAgent from 'supertest/lib/agent';

import '../__mocks__/azure-storage';
import '../__mocks__/mailer';
import { getTestServer } from './testserver';

describe('TEST /auth endpoints', () => {
  let client: TestAgent<superset.Test>;
  let token = '';
  const email = `test_${Date.now()}@mail.com`;
  const password = 'abcABC@123';
  const firstName = 'test';
  const lastName = 'test';
  const phone = `01${`${Date.now()}`.slice(-9)}`;

  beforeAll(async () => {
    client = await getTestServer();
  }, 10000);

  describe(`TEST ${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, () => {
    it('should not be able to register a new user, missing (firstName, lastName)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email,
        password,
      });
      expect(res.statusCode).toBe(400);
    });

    it(`should able to register a new user with complete data`, async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email,
        phone,
        password,
        firstName,
        lastName,
      });
      expect(res.statusCode).toBe(201);
    });

    it('should fail to register an already exist email', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email,
        phone: `01${`${Date.now()}`.slice(-9)}`,
        password,
        firstName,
        lastName,
      });
      expect(res.statusCode).toBe(409);
    });

    it('should fail to register an already exist phone', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email: `test_${Date.now()}@mail.com`,
        phone,
        password,
        firstName,
        lastName,
      });
      expect(res.statusCode).toBe(409);
    });

    it('should fail to register with wrong data (short password)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email,
        password: 'abc', // short password
        firstName,
        lastName,
      });
      expect(res.statusCode).toBe(400);
    });

    it('should fail to register with wrong data (no capital character)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email,
        password: 'password',
        firstName,
        lastName,
      });
      expect(res.statusCode).toBe(400);
    });

    it('should fail to register with wrong data (invalid email)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.register;
      const res = await client[method](url).send({
        email: 'email', // invalid email
        password,
        firstName,
        lastName,
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.login.method.toUpperCase()} ${ENDPOINT_CONFIGS.login.url}`, () => {
    it('should login with complete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        sign: email,
        password,
      });
      expect(res.statusCode).toBe(200);
    });

    it('should fail to login with non-existent user', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        sign: `notfound_${email}`,
        password,
      });
      expect(res.statusCode).toBe(404);
    });

    it('should fail to login without sign property (email/phone)', async () => {
      const { method, url } = ENDPOINT_CONFIGS.login;
      const res = await client[method](url).send({
        password,
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.changePassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.changePassword.url}`, () => {
    it('should change password with complete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send({
          oldPassword: password,
          newPassword: 'newPassword@123',
        });
      expect(res.statusCode).toBe(200);
    });

    it('should fail to change password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send({
          oldPassword: password,
        });
      expect(res.statusCode).toBe(400);
    });

    it('should fail change password with wrong data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.changePassword;
      const res = await client[method](url)
        .set(await getAuthToken())
        .send({
          oldPassword: password,
          newPassword: 'password', // wrong password
        });
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.forgotPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.forgotPassword.url}`, () => {
    it('should forgot password with complete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
      const res = await client[method](url).send({ email });
      expect(res.statusCode).toBe(200);
    });

    it('should fail forgot password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
      const res = await client[method](url).send({});
      expect(res.statusCode).toBe(400);
    });

    it('should fail forgot password with wrong data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
      const res = await client[method](url).send({ email: 'email' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe(`TEST ${ENDPOINT_CONFIGS.resetPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.resetPassword.url}`, () => {
    it('should reset password with incomplete data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.resetPassword;
      const res = await client[method](url).send({ email, password });
      expect(res.statusCode).toBe(400);
    });

    it('should reset password with wrong data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.resetPassword;
      const res = await client[method](url).send({ email, code: 'code', password });
      expect(res.statusCode).toBe(400);
    });
  });

  const getAuthToken = async () => {
    if (token) return { Authorization: 'Bearer ' + token };

    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign: email, password }).expect(200);

    token = result.body.data.accessToken;
    return { Authorization: 'Bearer ' + result.body.data.accessToken };
  };
});
