import { ENDPOINT_CONFIGS, withParams } from '@resala/shared';
import { join } from 'path';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { getAuthToken } from './helpers/auth-token.js';
import { getTestServer } from './helpers/test-server.js';

describe.skip('Category API Integration Tests', () => {
  let client: TestAgent<superset.Test>;
  const category = {
    id: '', // will be updated later
    enName: 'Category',
    arName: 'فئة',
  };

  beforeAll(async () => {
    client = getTestServer();

    const { method, url } = ENDPOINT_CONFIGS.createCategory;
    const res = await client[method](url)
      .send(category)
      .set(await getAuthToken(true));

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');

    category.id = res.body.data.id;
  });

  describe('POST /api/v1/categories', () => {
    it('should create a new category with valid data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createCategory;
      const newCategory = {
        enName: 'New Category',
        arName: 'فئة جديدة',
      };
      const res = await client[method](url)
        .send(newCategory)
        .set(await getAuthToken(true));

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should return 400 for missing required fields', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createCategory;
      const invalidCategory = {
        enName: 'Invalid Category',
        // arName is missing
      };
      const res = await client[method](url)
        .send(invalidCategory)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('arName');
    });

    it('should return 400 for invalid data types', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createCategory;
      const invalidCategory = {
        enName: 123, // Invalid type
        arName: 'فئة جديدة',
      };
      const res = await client[method](url)
        .send(invalidCategory)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('enName');
    });

    it('should return 409 for duplicate category', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createCategory;
      const duplicateCategory = {
        enName: 'New Category',
        arName: 'فئة جديدة',
      };
      const res = await client[method](url)
        .send(duplicateCategory)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Duplicate');
    });

    it('should return 403 for unauthorized access', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createCategory;
      const newCategory = {
        enName: 'Unauthorized Category',
        arName: 'فئة غير مصرح بها',
      };
      const res = await client[method](url)
        .send(newCategory)
        .set(await getAuthToken(false));
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/v1/categories', () => {
    it('should return a list of categories', async () => {
      const { method, url } = ENDPOINT_CONFIGS.listCategories;
      const res = await client[method](url);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/categories/:id', () => {
    it('should return a category by id', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.getCategory, category.id);
      const res = await client[method](url);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toBeInstanceOf(Object);
    });

    it('should return 404 for non-existing category', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.getCategory, '999');
      const res = await client[method](url);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('PUT /api/v1/categories/:id', () => {
    it('should update a category by id', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.updateCategory, category.id);
      const updatedCategory = {
        enName: 'Updated Category',
        arName: 'فئة تم تحديثها',
      };
      const res = await client[method](url)
        .send(updatedCategory)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should return 409 for duplicate category', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.updateCategory, category.id);
      const duplicateCategory = {
        enName: 'New Category',
        arName: 'فئة جديدة',
      };
      const res = await client[method](url)
        .send(duplicateCategory)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Duplicate');
    });

    it('should return 403 for unauthorized access', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.updateCategory, category.id);
      const newCategory = {
        enName: 'Unauthorized Category',
        arName: 'فئة غير مصرح بها',
      };
      const res = await client[method](url)
        .send(newCategory)
        .set(await getAuthToken(false));
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/v1/categories/:id', () => {
    let productId = '';
    const deleteProduct = async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteProduct, productId);
      const res = await client[method](url).set(await getAuthToken(true));
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    };

    beforeAll(async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', `${category.id}`)
        .field('enName', 'Product')
        .field('arName', 'منتج')
        .field('enDescription', 'Product Description')
        .field('arDescription', 'وصف المنتج')
        .field('price', '100')
        .attach('image', join(process.cwd(), 'public', 'assets', 'product-1.webp'))
        .set(await getAuthToken(true));

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('id');

      productId = res.body.data.id;
    });

    it('should return 403 for unauthorized access', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteCategory, category.id);
      const res = await client[method](url).set(await getAuthToken(false));
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 409 for category with products', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteCategory, category.id);
      const res = await client[method](url).set(await getAuthToken(true));

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('there is a conflict with product and category');
    });

    it('should delete a category by id', async () => {
      await deleteProduct();

      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteCategory, category.id);
      const res = await client[method](url).set(await getAuthToken(true));
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should should return 404 for non-existing category', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteCategory, category.id);
      const res = await client[method](url).set(await getAuthToken(true));
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
