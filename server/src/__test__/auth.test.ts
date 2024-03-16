import { beforeAll, describe, expect, it } from '@jest/globals';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import superset from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { getTestServer } from './testserver';

describe('TEST /auth endpoint', () => {
  let client: TestAgent<superset.Test>;
  let token = '';
  const email = `test_${Date.now()}@mail.com`;
  const password = 'abcABC@123';
  const firstName = 'test';
  const lastName = 'test';

  beforeAll(async () => {
    client = await getTestServer();
  });

  // register with incomplete data
  it(`${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.register;
    const res = await client[method](url).send({
      email,
      password,
    });
    expect(res.statusCode).toBe(400);
  });

  // register with complete data
  it(`${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.register;
    const res = await client[method](url).send({
      email,
      password,
      firstName,
      lastName,
    });
    expect(res.statusCode).toBe(201);
  });

  // register with already registered data
  it(`${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.register;
    const res = await client[method](url).send({
      email,
      password,
      firstName,
      lastName,
    }); // user already registered
    expect(res.statusCode).toBe(409);
  });

  // register with wrong data
  it(`${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.register;
    const res = await client[method](url).send({
      email,
      password: 'abc', // short password
      firstName,
      lastName,
    });
    expect(res.statusCode).toBe(400);
  });
  it(`${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.register;
    const res = await client[method](url).send({
      email,
      password: 'password', // no capital letter
      firstName,
      lastName,
    });
    expect(res.statusCode).toBe(400);
  });
  it(`${ENDPOINT_CONFIGS.register.method.toUpperCase()} ${ENDPOINT_CONFIGS.register.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.register;
    const res = await client[method](url).send({
      email: 'email', // invalid email
      password,
      firstName,
      lastName,
    });
    expect(res.statusCode).toBe(400);
  });

  // login with complete data
  it(`${ENDPOINT_CONFIGS.login.method.toUpperCase()} ${ENDPOINT_CONFIGS.login.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const res = await client[method](url).send({
      sign: email,
      password,
    });
    expect(res.statusCode).toBe(200);
  });

  // login with wrong data
  it(`${ENDPOINT_CONFIGS.login.method.toUpperCase()} ${ENDPOINT_CONFIGS.login.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const res = await client[method](url).send({
      sign: `notfound_${email}`,
      password,
    });
    expect(res.statusCode).toBe(404);
  });

  // login with incomplete data
  it(`${ENDPOINT_CONFIGS.login.method.toUpperCase()} ${ENDPOINT_CONFIGS.login.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const res = await client[method](url).send({
      password,
    });
    expect(res.statusCode).toBe(400);
  });

  // change password with complete data
  it(`${ENDPOINT_CONFIGS.changePassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.changePassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.changePassword;
    const res = await client[method](url)
      .set(await getAuthToken())
      .send({
        oldPassword: password,
        newPassword: 'newPassword@123',
      });
    expect(res.statusCode).toBe(200);
  });

  // change password with incomplete data
  it(`${ENDPOINT_CONFIGS.changePassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.changePassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.changePassword;
    const res = await client[method](url)
      .set(await getAuthToken())
      .send({
        oldPassword: password,
      });
    expect(res.statusCode).toBe(400);
  });

  // change password with wrong data
  it(`${ENDPOINT_CONFIGS.changePassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.changePassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.changePassword;
    const res = await client[method](url)
      .set(await getAuthToken())
      .send({
        oldPassword: password,
        newPassword: 'password', // wrong password
      });
    expect(res.statusCode).toBe(400);
  });

  // forgot password with complete data
  it(`${ENDPOINT_CONFIGS.forgotPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.forgotPassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
    const res = await client[method](url).send({ email });
    expect(res.statusCode).toBe(200);
  });

  // forgot password with incomplete data
  it(`${ENDPOINT_CONFIGS.forgotPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.forgotPassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
    const res = await client[method](url).send({});
    expect(res.statusCode).toBe(400);
  });
  // forgot password with wrong data
  it(`${ENDPOINT_CONFIGS.forgotPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.forgotPassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.forgotPassword;
    const res = await client[method](url).send({ email: 'email' });
    expect(res.statusCode).toBe(400);
  });

  // reset password with incomplete data
  it(`${ENDPOINT_CONFIGS.resetPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.resetPassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.resetPassword;
    const res = await client[method](url).send({ email, password });
    expect(res.statusCode).toBe(400);
  });

  // reset password with wrong data
  it(`${ENDPOINT_CONFIGS.resetPassword.method.toUpperCase()} ${ENDPOINT_CONFIGS.resetPassword.url}`, async () => {
    const { method, url } = ENDPOINT_CONFIGS.resetPassword;
    const res = await client[method](url).send({ email, code: 'code', password });
    expect(res.statusCode).toBe(400);
  });

  const getAuthToken = async () => {
    if (token) return { Authorization: 'Bearer ' + token };

    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign: email, password }).expect(200);

    token = result.body.data.accessToken;
    return { Authorization: 'Bearer ' + result.body.data.accessToken };
  };
});
