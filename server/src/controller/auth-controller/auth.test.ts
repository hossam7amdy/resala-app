import { describe, expect, it } from '@jest/globals';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import request from 'supertest';

import app from '../../app';

const completeRegisterData = {
  email: `test_${Date.now()}@mail.com`,
  password: 'abcABC@123',
  firstName: 'test',
  lastName: 'test',
};

const completeLoginData = {
  email: completeRegisterData.email,
  password: completeRegisterData.password,
};

const incompleteRegisterData = {
  email: `test_${Date.now()}@mail.com`,
  password: 'abcABC@123',
  firstName: 'test',
};

const incompleteLoginData = {
  email: completeRegisterData.email,
  password: '',
};

describe('Auth Controller', () => {
  it('should fail to login with 400 code', async () => {
    const res = await request(app).post(ENDPOINT_CONFIGS.login.url).send(incompleteLoginData);
    expect(res.statusCode).toBe(400);
  });
  it('should fail to login with 404', async () => {
    const res = await request(app).post(ENDPOINT_CONFIGS.login.url).send(completeLoginData); // no user registered yet
    expect(res.statusCode).toBe(404);
  });
  it('should register new user', async () => {
    const res = await request(app).post(ENDPOINT_CONFIGS.register.url).send(completeRegisterData);
    expect(res.statusCode).toBe(201);
  });
  it('should fail to register new user with 409', async () => {
    const res = await request(app).post(ENDPOINT_CONFIGS.register.url).send(completeRegisterData); // user already registered
    expect(res.statusCode).toBe(409);
  });
  it('should fail to register new user with 400', async () => {
    const res = await request(app).post(ENDPOINT_CONFIGS.register.url).send(incompleteRegisterData);
    expect(res.statusCode).toBe(400);
  });
  it('should login successfully', async () => {
    const res = await request(app).post(ENDPOINT_CONFIGS.login.url).send(completeLoginData);
    expect(res.statusCode).toBe(200);
  });
});
