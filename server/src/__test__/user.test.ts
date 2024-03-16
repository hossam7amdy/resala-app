import { beforeAll, describe, it } from '@jest/globals';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import superset from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { userService } from '../service';
import { getTestServer } from './testserver';

describe('TEST /users endpoint', () => {
  let client: TestAgent<superset.Test>;

  let token = '';
  const email = `test_${Date.now()}@test.com`;
  const password = 'abcABC@123';

  beforeAll(async () => {
    client = await getTestServer();
    await registerNewUser(email, password);
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

    await client[method](url)
      .set(await getAuthToken())
      .send({ firstName: 'test1', lastName: 'test1' })
      .expect(200);
  });

  it('should create user address', async () => {
    const { method, url } = ENDPOINT_CONFIGS.createAddress;

    await client[method](url)
      .set(await getAuthToken())
      .send({ state: 'test address', city: 'test city', street: 'test street' })
      .expect(201);
  });

  it('should update user address', async () => {
    const address = await getLastAddress();

    const { url, method } = ENDPOINT_CONFIGS.updateAddress;
    await client[method](url.replace(':addressId', address.id))
      .set(await getAuthToken())
      .send({ state: 'test address1', city: 'test city1', street: 'test street1' })
      .expect(200);
  });

  it('should get user address list', async () => {
    await client
      .get(ENDPOINT_CONFIGS.getAddressList.url)
      .set(await getAuthToken())
      .expect(200);
  });

  it('should delete user address', async () => {
    const { url, method } = ENDPOINT_CONFIGS.deleteAddress;

    const address = await getLastAddress();

    await client[method](url.replace(':addressId', address.id))
      .set(await getAuthToken())
      .expect(200);
  });

  it("it should get a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.adminGetUser;

    await client[method](url.replace(':userId', user.id))
      .set(await getAuthToken())
      .expect(200);
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

    await client[method](url.replace(':userId', user.id))
      .set(await getAuthToken())
      .send({ firstName: 'test1', lastName: 'test1', role: 'CUSTOMER' })
      .expect(200);
  });

  it("it should delete a user by it's id", async () => {
    const user = await getLastUser();
    const { method, url } = ENDPOINT_CONFIGS.adminDeleteUser;

    await client[method](url.replace(':userId', user.id))
      .set(await getAuthToken())
      .expect(200);
  });

  const registerNewUser = async (email: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.register;

    await client[method](url)
      .send({ firstName: 'test', lastName: 'test', email, password })
      .expect(201);
  };

  const getAuthToken = async () => {
    if (token) return { Authorization: 'Bearer ' + token };

    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign: email, password }).expect(200);

    token = result.body.data.accessToken;
    return { Authorization: 'Bearer ' + result.body.data.accessToken };
  };

  const makeUserAdmin = async () => {
    const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;
    const res = await client[method](url).set(await getAuthToken());

    // make him admin
    return userService.updateUser(res.body.data.id, { role: 'ADMIN' });
  };

  const getLastAddress = async () => {
    const { method, url } = ENDPOINT_CONFIGS.getAddressList;

    return client[method](url)
      .set(await getAuthToken())
      .expect(200)
      .then(res => res.body.data.pop());
  };

  const getLastUser = async () => {
    const { method, url } = ENDPOINT_CONFIGS.adminGetUsersList;

    const res = await client[method](url)
      .set(await getAuthToken())
      .expect(200);

    return res.body.data.users.pop();
  };
});
