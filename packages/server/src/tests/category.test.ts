import { PrismaClient } from '@prisma/client';
import { ENDPOINT_CONFIGS, type Role } from '@resala/shared';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import InventoryRepository from '../repositories/InventoryRepository.js';
import UserRepository from '../repositories/UserRepository.js';
import {
  FileService,
  InventoryService,
  S3FileStorageService,
  UserService,
} from '../services/index.js';
import { categoryAssertion, productAssertion } from './helpers/customAssertions.js';
import { getTestServer } from './helpers/testServer.js';

describe('TEST /categories', () => {
  let client: TestAgent<superset.Test>;
  let userService: UserService;
  let fileService: FileService;
  let inventoryService: InventoryService;

  const testUser = {
    firstName: 'test',
    lastName: 'test',
    email: `test_${Date.now()}@test.com`,
    password: 'abcABC@123',
    phone: `01${`${Date.now()}`.slice(-9)}`,
  };

  beforeAll(async () => {
    const prisma = new PrismaClient();

    fileService = new FileService(new S3FileStorageService());
    userService = new UserService(new UserRepository(prisma));
    inventoryService = new InventoryService(new InventoryRepository(prisma), fileService);

    client = await getTestServer();

    await register(testUser);
  });

  describe(`${ENDPOINT_CONFIGS.listCategories.method.toUpperCase()} ${ENDPOINT_CONFIGS.listCategories.url}`, () => {
    it('should return categories list', async () => {
      const { method, url } = ENDPOINT_CONFIGS.listCategories;

      const res = await client[method](url).send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: expect.arrayContaining([categoryAssertion]),
      });
    });
  });

  describe(`${ENDPOINT_CONFIGS.listCategoryProducts.method.toUpperCase()} ${ENDPOINT_CONFIGS.listCategoryProducts.url}`, () => {
    it('should return category products list', async () => {
      const category = await getFirstCategory();

      const { method, url } = ENDPOINT_CONFIGS.listCategoryProducts;
      const res = await client[method](url.replace(':categoryId', category.id.toString())).send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        // @ts-expect-error custom matcher
        data: expect.toBeArrayOfImageObjectMatching(productAssertion),
      });
    });
  });

  describe(`${ENDPOINT_CONFIGS.getCategory.method.toUpperCase()} ${ENDPOINT_CONFIGS.getCategory.url}`, () => {
    it('should get category by id', async () => {
      const category = await getLastCategory();

      const { method, url } = ENDPOINT_CONFIGS.getCategory;
      const res = await client[method](url.replace(':categoryId', category.id.toString())).send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: categoryAssertion,
      });
    });

    it('should fail to get category by id', async () => {
      const categoryId = '9999';

      const { method, url } = ENDPOINT_CONFIGS.getCategory;
      const res = await client[method](url.replace(':categoryId', categoryId)).send();

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
  });

  describe(`${ENDPOINT_CONFIGS.createCategory.method.toUpperCase()} ${ENDPOINT_CONFIGS.createCategory.url}`, () => {
    const testCategory = {
      arName: 'تصنيف تجريبى',
      enName: 'test category',
    };

    it('should fail to create new category if non-admin user', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createCategory;

      const res = await client[method](url)
        .set(await getAccessToken())
        .send(testCategory);

      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({
        success: false,
        message: expect.any(String),
      });
    });
    it('should create new category', async () => {
      await makeUserAdmin();

      const { method, url } = ENDPOINT_CONFIGS.createCategory;
      const res = await client[method](url)
        .set(await getAccessToken())
        .send(testCategory);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        success: true,
        data: categoryAssertion,
      });
    });
    it('should fail to create new category with insufficient data', async () => {});
  });

  describe(`${ENDPOINT_CONFIGS.updateCategory.method.toUpperCase()} ${ENDPOINT_CONFIGS.updateCategory.url}`, () => {
    it('should fail to update category if non-admin user', async () => {});
  });

  describe(`${ENDPOINT_CONFIGS.deleteCategory.method.toUpperCase()} ${ENDPOINT_CONFIGS.deleteCategory.url}`, () => {
    it('should fail to delete category if non-admin user', async () => {});
    it('should update category', async () => {});
    it('should delete category', async () => {});
    it('should return deleted categories list if admin user', async () => {});
    it('should return deleted category by id if admin user', async () => {});
    it('should fail to delete category if non-admin user', async () => {});
    it('should fail to delete category if non-admin user', async () => {});
    it('should update category', async () => {});
  });

  // Helper functions
  const register = async (payload: {
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

  const login = async (sign: string, password: string) => {
    const { method, url } = ENDPOINT_CONFIGS.login;
    const result = await client[method](url).send({ sign, password });

    expect(result.statusCode).toBe(200);
    return result.body;
  };

  const getAccessToken = async () => {
    const res = await login(testUser.email, testUser.password);

    return { Authorization: 'Bearer ' + res.data.accessToken };
  };

  const makeUserAdmin = async () => {
    const { method, url } = ENDPOINT_CONFIGS.getUser;
    const res = await client[method](url).set(await getAccessToken());

    return await userService.updateUser(res.body.data.id, { role: 'ADMIN' as Role });
  };

  // const makeUserNonAdmin = async () => {
  //   const { method, url } = ENDPOINT_CONFIGS.getCurrentUser;
  //   const res = await client[method](url).set(await getAccessToken());

  //   return await userService.updateUser(res.body.data.id, { role: 'CUSTOMER' as Role });
  // };

  const getLastCategory = async () => {
    const categories = await inventoryService.category.listCategories();
    return categories[categories.length - 1];
  };

  const getFirstCategory = async () => {
    const categories = await inventoryService.category.listCategories();
    return categories[0];
  };
});
