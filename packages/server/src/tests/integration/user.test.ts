import { ENDPOINT_CONFIGS, Role, withParams } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { type DataStore, initDb } from '../../datastore/index.js';
import { getTestServer } from '../setup/testServer.js';

describe('TEST /users endpoint', () => {
  let db: DataStore;
  let client: TestAgent<superset.Test>;

  let adminUserId: number;
  let customerUserId: number;
  let duplicateUserId: number;
  const customerUserObj = {
    firstName: 'customer',
    lastName: 'user',
    email: `customer_${Date.now()}@test.com`,
    password: 'abcABC@123',
    phone: `011${`${Date.now()}`.slice(-8)}`,
  };

  const duplicateUserObj = {
    firstName: 'duplicate',
    lastName: 'user',
    email: `duplicate_${Date.now()}@test.com`,
    password: 'abcABC@123',
    phone: `012${`${Date.now()}`.slice(-8)}`,
  };

  const adminUserObj = {
    firstName: 'admin',
    lastName: 'user',
    email: `admin_${Date.now()}@test.com`,
    password: 'abcABC@123',
    phone: `015${`${Date.now()}`.slice(-8)}`,
  };

  beforeAll(async () => {
    db = await initDb();
    client = await getTestServer();

    await Promise.all([
      registerNewUser(adminUserObj),
      registerNewUser(customerUserObj),
      registerNewUser(duplicateUserObj),
    ]);

    const [{ data: adminData }, { data: customerData }, { data: duplicateData }] =
      await Promise.all([
        loginUser(adminUserObj.email, adminUserObj.password),
        loginUser(customerUserObj.email, customerUserObj.password),
        loginUser(duplicateUserObj.email, duplicateUserObj.password),
      ]);

    adminUserId = adminData.user.id;
    customerUserId = customerData.user.id;
    duplicateUserId = duplicateData.user.id;

    await giveAdminPermissions(adminUserId);
  });

  afterAll(async () => {
    await db.user.deleteMany();
  });

  it('should get current logged in user', async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.getUser, customerUserId.toString());

    const res = await client[method](url).set(
      await getAuthToken(customerUserObj.email, customerUserObj.password)
    );

    expect(res.statusCode).toBe(200);
  });

  it('should prevent not admin user from getting other user', async () => {
    const notMyId = '2';

    const { method, url } = withParams(ENDPOINT_CONFIGS.getUser, notMyId);

    const res = await client[method](url).set(
      await getAuthToken(customerUserObj.email, customerUserObj.password)
    );

    expect(res.statusCode).toBe(403);
  });

  it('should update current logged in user', async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.updateUser, customerUserId.toString());

    const res = await client[method](url)
      .set(await getAuthToken(customerUserObj.email, customerUserObj.password))
      .send({
        firstName: duplicateUserObj.firstName,
        lastName: duplicateUserObj.lastName,
        phone: customerUserObj.phone,
      });

    expect(res.statusCode).toBe(200);
  });

  it('should not update user role if not an admin', async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.updateUser, customerUserId.toString());

    const res = await client[method](url)
      .set(await getAuthToken(customerUserObj.email, customerUserObj.password))
      .send({
        firstName: duplicateUserObj.firstName,
        lastName: duplicateUserObj.lastName,
        phone: customerUserObj.phone,
        role: Role.ADMIN,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.role).toBe(Role.CUSTOMER);
  });

  it("should allow admin to get any user by it's id", async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.getUser, duplicateUserId.toString());

    const res = await client[method](url).set(
      await getAuthToken(adminUserObj.email, adminUserObj.password)
    );

    expect(res.statusCode).toBe(200);
  });

  it('should allow admin to get users list', async () => {
    const { method, url } = ENDPOINT_CONFIGS.listUsers;

    await client[method](url)
      .set(await getAuthToken(adminUserObj.email, adminUserObj.password))
      .expect(200);
  });

  it("should allow admin to update a user by it's id", async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.updateUser, duplicateUserId.toString());

    const res = await client[method](url)
      .set(await getAuthToken(adminUserObj.email, adminUserObj.password))
      .send({ firstName: 'test1', lastName: 'test1', role: 'CUSTOMER', phone: '01000000000' });

    expect(res.statusCode).toBe(200);
  });

  it("should allow admin to delete a user by it's id", async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.deleteUser, duplicateUserId.toString());

    await client[method](url)
      .set(await getAuthToken(adminUserObj.email, adminUserObj.password))
      .expect(200);
  });

  it('should give 404 when get non-existent user', async () => {
    const notExistUserId = '9999';
    const { method, url } = withParams(ENDPOINT_CONFIGS.getUser, notExistUserId);

    const res = await client[method](url).set(
      await getAuthToken(adminUserObj.email, adminUserObj.password)
    );

    expect(res.statusCode).toBe(404);
  });

  it('should give 404 when update non-existent user', async () => {
    const notExistUserId = '9999';
    const { method, url } = withParams(ENDPOINT_CONFIGS.updateUser, notExistUserId);

    const res = await client[method](url)
      .set(await getAuthToken(adminUserObj.email, adminUserObj.password))
      .send({ firstName: 'test1', lastName: 'test1', role: 'CUSTOMER', phone: '01000000000' });

    expect(res.statusCode).toBe(404);
  });

  it('should give 404 when delete non-existent user', async () => {
    const notExistUserId = '9999';
    const { method, url } = withParams(ENDPOINT_CONFIGS.deleteUser, notExistUserId);

    const res = await client[method](url).set(
      await getAuthToken(adminUserObj.email, adminUserObj.password)
    );

    expect(res.statusCode).toBe(404);
  });

  it('should give 409 when try to update user with existing phone', async () => {
    const { method, url } = withParams(ENDPOINT_CONFIGS.updateUser, customerUserId.toString());

    const res = await client[method](url)
      .set(await getAuthToken(adminUserObj.email, adminUserObj.password))
      .send({ ...customerUserObj, phone: adminUserObj.phone });

    expect(res.statusCode).toBe(409);
  });

  const registerNewUser = async payload => {
    const { method, url } = ENDPOINT_CONFIGS.register;

    const res = await client[method](url).send(payload);

    expect(res.statusCode).toBe(201);
  };

  const getAuthToken = async (email: string, password: string) => {
    const res = await loginUser(email, password);

    return { Authorization: 'Bearer ' + res.data.accessToken };
  };

  const loginUser = async (sign: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign, password });

    expect(result.statusCode).toBe(200);
    return result.body;
  };

  const giveAdminPermissions = async (userId: number) => {
    await db.user.update({
      data: { role: 'ADMIN' },
      where: { id: userId },
    });
  };
});
