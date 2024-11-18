import { ENDPOINT_CONFIGS, withParams, withQueryParams } from '@resala/shared';
import { join } from 'path';
import type superset from 'supertest';
import type TestAgent from 'supertest/lib/agent.js';
import { beforeAll, describe, expect, it } from 'vitest';

import { getAuthToken } from './helpers/auth-token.js';
import { getTestServer } from './helpers/test-server.js';

const testImagePath = join(process.cwd(), 'public', 'assets', 'product-1.webp');

describe.skip('Product API Integration Tests', () => {
  let client: TestAgent<superset.Test>;

  let categoryId = '';
  const product = {
    id: '', // will be updated later
    enName: 'Product',
    arName: 'منتج',
    enDescription: 'Product Description',
    arDescription: 'وصف المنتج',
    price: '100',
  };

  const createCategory = async () => {
    const { method, url } = ENDPOINT_CONFIGS.createCategory;
    const res = await client[method](url)
      .send({ enName: 'Category', arName: 'فئة' })
      .set(await getAuthToken(true));

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');

    return res.body.data.id;
  };

  beforeAll(async () => {
    client = getTestServer();
    categoryId = await createCategory();

    const { method, url } = ENDPOINT_CONFIGS.createProduct;
    const res = await client[method](url)
      .field('categoryId', categoryId)
      .field('enName', 'Product')
      .field('arName', 'منتج')
      .field('enDescription', 'Product Description')
      .field('arDescription', 'وصف المنتج')
      .field('price', '100')
      .attach('image', testImagePath)
      .set(await getAuthToken(true));

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');

    product.id = res.body.data.id;
  });

  describe(`${ENDPOINT_CONFIGS.createProduct.method.toUpperCase()} ${ENDPOINT_CONFIGS.createProduct.url}`, () => {
    it('should create a new product with valid data', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', 'New Product')
        .field('arName', 'منتج جديدة')
        .field('enDescription', 'New Product Description')
        .field('arDescription', 'وصف المنتج الجديد')
        .field('price', '200')
        .attach('image', testImagePath)
        .set(await getAuthToken(true));

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should return 422 for missing required fields', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('enName', 'Bad Product')
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should return 400 for invalid data types', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', 'invalid')
        .field('enName', 'Bad Product')
        .field('arName', 'منتج سيء')
        .field('enDescription', 'Bad Product Description')
        .field('arDescription', 'وصف المنتج السيء')
        .field('price', 'invalid')
        .attach('image', testImagePath)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('categoryId');
    });

    it('should return 404 for non-existing category', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', '999')
        .field('enName', 'Bad Product')
        .field('arName', 'منتج سيء')
        .field('enDescription', 'Bad Product Description')
        .field('arDescription', 'وصف المنتج السيء')
        .field('price', '200')
        .attach('image', testImagePath)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Category');
    });

    it('should return 400 for invalid image type', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', 'Bad Product')
        .field('arName', 'منتج سيء')
        .field('enDescription', 'Bad Product Description')
        .field('arDescription', 'وصف المنتج السيء')
        .field('price', '200')
        .attach('image', Buffer.from('invalid', 'utf-8'), 'text.txt')
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should return 409 for duplicate product', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', product.enName)
        .field('arName', 'منتج')
        .field('enDescription', 'Product Description')
        .field('arDescription', 'وصف المنتج')
        .field('price', '100')
        .attach('image', testImagePath)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Product already exists');
    });

    it('should return 403 for unauthorized access', async () => {
      const { method, url } = ENDPOINT_CONFIGS.createProduct;
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', 'Unauthorized Product')
        .field('arName', 'منتج غير مصرح به')
        .field('enDescription', 'Unauthorized Product Description')
        .field('arDescription', 'وصف المنتج غير مصرح به')
        .field('price', '300')
        .attach('image', testImagePath)
        .set(await getAuthToken(false));
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe(` ${ENDPOINT_CONFIGS.listProducts.method.toUpperCase()} ${ENDPOINT_CONFIGS.listProducts.url}`, () => {
    it('should return a list of products', async () => {
      const { method, url } = ENDPOINT_CONFIGS.listProducts;
      const res = await client[method](url);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('products');
      expect(res.body.data).toHaveProperty('pagination');
      expect(res.body.data.products).toBeInstanceOf(Array);
      expect(res.body.data.products.length).toBeGreaterThan(0);
    });

    it('should return a list of products by category', async () => {
      const { method, url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, { categoryId });
      const res = await client[method](url);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('products');
      expect(res.body.data).toHaveProperty('pagination');
      expect(res.body.data.products).toBeInstanceOf(Array);
      expect(res.body.data.products.length).toBeGreaterThan(0);
    });

    it('should return a list of products by search query', async () => {
      const { method, url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, { search: 'Product' });
      const res = await client[method](url);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('products');
      expect(res.body.data).toHaveProperty('pagination');
      expect(res.body.data.products).toBeInstanceOf(Array);
      expect(res.body.data.products.length).toBeGreaterThan(0);
    });

    it('should return a list of products with pagination', async () => {
      const { method, url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, { page: 2, limit: 5 });
      const res = await client[method](url);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('products');
      expect(res.body.data).toHaveProperty('pagination');
      expect(res.body.data.pagination).toHaveProperty('page', 2);
      expect(res.body.data.pagination).toHaveProperty('limit', 5);
      expect(res.body.data.pagination).toHaveProperty('total');
      expect(res.body.data.products).toBeInstanceOf(Array);
      expect(res.body.data.products.length).toBe(0);
    });
  });

  describe(`${ENDPOINT_CONFIGS.getProduct.method.toUpperCase()} ${ENDPOINT_CONFIGS.getProduct.url}`, () => {
    it('should return a product by id', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.getProduct, product.id);
      const res = await client[method](url);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('category');
    });

    it('should return 404 for non-existing product', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.getProduct, '999');
      const res = await client[method](url);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe(`${ENDPOINT_CONFIGS.updateProduct.method.toUpperCase()} ${ENDPOINT_CONFIGS.updateProduct.url}`, () => {
    it('should update a product by id', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.updateProduct, product.id);
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', 'Updated Product')
        .field('arName', 'منتج محدث')
        .field('enDescription', 'Updated Product Description')
        .field('arDescription', 'وصف المنتج المحدث')
        .field('price', '200')
        .attach('image', testImagePath)
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should return 409 for duplicate product', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.updateProduct, product.id);
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', 'New Product') // duplicate name
        .field('arName', 'منتج')
        .field('enDescription', 'Product Description')
        .field('arDescription', 'وصف المنتج')
        .field('price', '100')
        .set(await getAuthToken(true));
      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toContain('Duplicate');
    });

    it('should return 403 for unauthorized access', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.updateProduct, product.id);
      const res = await client[method](url)
        .field('categoryId', categoryId)
        .field('enName', 'Unauthorized Product')
        .field('arName', 'منتج غير مصرح به')
        .set(await getAuthToken(false));
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe(`${ENDPOINT_CONFIGS.deleteProduct.method.toUpperCase()} ${ENDPOINT_CONFIGS.deleteProduct.url}`, () => {
    it('should return 403 for unauthorized access', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteProduct, product.id);
      const res = await client[method](url).set(await getAuthToken(false));
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });

    it('should delete a product by id', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteProduct, product.id);
      const res = await client[method](url).set(await getAuthToken(true));
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('id');
    });

    it('should should return 404 for non-existing product', async () => {
      const { method, url } = withParams(ENDPOINT_CONFIGS.deleteProduct, product.id);
      const res = await client[method](url).set(await getAuthToken(true));
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
