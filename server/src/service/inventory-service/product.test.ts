import { beforeEach, describe, expect, it, vi } from 'vitest';

import prismaMock from '../../lib/__mocks__/prisma.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import { inventoryService } from '../index.js';

vi.mock('lib/prisma/index.js', () => ({
  default: prismaMock,
}));

const PRODUCT_OUTPUT = {
  id: 4,
  categoryId: 5,
  arName: 'بلوزة كتان',
  enName: 'Cotton Blouse',
  arDescription: 'بلوزة كتان',
  enDescription: 'Cotton Blouse',
  price: '40',
  createdAt: new Date(), // 2024-03-24T05:07:46.104Z
  updatedAt: new Date(),
  deletedAt: null,
  category: {
    id: 5,
    categoryId: 1,
    arName: 'بلوزات',
    enName: 'Blouses',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  images: [
    {
      id: 1,
      productId: 4,
      imageUrl: 'url',
      createdAt: new Date(),
    },
  ],
};

describe('inventoryService - [ Product ]', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('findProductById', () => {
    it("should return active product's details", async () => {
      prismaMock.product.findUnique.mockResolvedValue(PRODUCT_OUTPUT as any);

      const product = await inventoryService.findProductById(1, false);

      expect(product).toMatchObject(PRODUCT_OUTPUT);
      expect(product.deletedAt).toBeNull();
      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should return non-active product's details", async () => {
      let deletedProduct = { ...PRODUCT_OUTPUT, deletedAt: new Date() };
      prismaMock.product.findUnique.mockResolvedValue(deletedProduct as any);

      const product = await inventoryService.findProductById(4, true);

      expect(product).toEqual(deletedProduct);
      expect(product.deletedAt).toBeTruthy();
      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      try {
        await inventoryService.findProductById(1, false);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
      }
    });

    it('should in-validate output data', async () => {
      prismaMock.product.findUnique.mockResolvedValue(PRODUCT_OUTPUT.category as any);

      const product = await inventoryService.findProductById(1, false);

      expect(product).not.toMatchObject(PRODUCT_OUTPUT);
      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('listProductsPaginated', () => {
    it('should return list of products', async () => {
      const products = [PRODUCT_OUTPUT];
      prismaMock.$transaction.mockResolvedValue([1, products] as any);

      const { total, products: returnedProducts } = await inventoryService.listProductsPaginated({
        page: 1,
        limit: 10,
        query: '',
        deleted: false,
      });

      expect(total).toBe(1);
      expect(returnedProducts).toEqual(products);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });

    it('should return empty list of products', async () => {
      prismaMock.$transaction.mockResolvedValue([0, []] as any);

      const { total, products: returnedProducts } = await inventoryService.listProductsPaginated({
        page: 1,
        limit: 10,
        query: '',
        deleted: false,
      });

      expect(total).toBe(0);
      expect(returnedProducts).toEqual([]);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });

    it('should return list of deleted products', async () => {
      const products = [PRODUCT_OUTPUT];
      prismaMock.$transaction.mockResolvedValue([1, products] as any);

      const { total, products: returnedProducts } = await inventoryService.listProductsPaginated({
        page: 1,
        limit: 10,
        query: '',
        deleted: true,
      });

      expect(total).toBe(1);
      expect(returnedProducts).toEqual(products);
      expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
    });
  });

  describe('createProduct', () => {
    it('should create product', async () => {
      prismaMock.category.findUnique.mockResolvedValue({ id: 1 } as any);
      prismaMock.product.create.mockResolvedValue(PRODUCT_OUTPUT as any);

      const product = await inventoryService.createProduct(PRODUCT_OUTPUT as any);

      expect(product).toEqual(PRODUCT_OUTPUT);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.create).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if category not found', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      try {
        await inventoryService.createProduct(PRODUCT_OUTPUT as any);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.product.create).toHaveBeenCalledTimes(0);
      }
    });

    it('should throw ConflictError if product already exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue({ id: 1 } as any);
      prismaMock.product.findFirst.mockResolvedValue(PRODUCT_OUTPUT as any);

      try {
        await inventoryService.createProduct(PRODUCT_OUTPUT as any);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictError);
        expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.product.create).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('updateProduct', () => {
    it('should update product', async () => {
      prismaMock.product.findUnique.mockResolvedValue(PRODUCT_OUTPUT as any);
      prismaMock.category.findUnique.mockResolvedValue(PRODUCT_OUTPUT.category as any);
      prismaMock.product.update.mockResolvedValue(PRODUCT_OUTPUT as any);

      const product = await inventoryService.updateProduct(4, PRODUCT_OUTPUT as any);

      expect(product).toEqual(PRODUCT_OUTPUT);
      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.product.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      try {
        await inventoryService.updateProduct(4, PRODUCT_OUTPUT as any);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.product.update).toHaveBeenCalledTimes(0);
      }
    });

    it('should throw ConflictError if product already exists', async () => {
      prismaMock.product.findUnique.mockResolvedValue(PRODUCT_OUTPUT as any);
      prismaMock.category.findUnique.mockResolvedValue(PRODUCT_OUTPUT.category as any);
      prismaMock.product.findFirst.mockResolvedValue(PRODUCT_OUTPUT as any);

      try {
        await inventoryService.updateProduct(4, PRODUCT_OUTPUT as any);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictError);
        expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.product.update).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      prismaMock.product.findUnique.mockResolvedValue(PRODUCT_OUTPUT as any);

      const { category, images, ...rest } = PRODUCT_OUTPUT;
      prismaMock.product.delete.mockResolvedValue(rest as any);

      const product = await inventoryService.deleteProduct(4);

      expect(product).toMatchObject(rest);
      expect(prismaMock.product.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      try {
        await inventoryService.deleteProduct(4);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.product.update).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('addProductImages', () => {
    it('should add product images', async () => {
      const urls = ['url1', 'url2'];
      prismaMock.product.findUnique.mockResolvedValue(PRODUCT_OUTPUT.images[0] as any);
      prismaMock.productImage.createMany.mockResolvedValue(urls as any);

      const product = await inventoryService.addProductImages(4, urls);

      expect(product).toEqual(urls);
      expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(0);
      expect(prismaMock.productImage.createMany).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if product not found', async () => {
      prismaMock.product.findUnique.mockResolvedValue(null);

      try {
        await inventoryService.addProductImages(4, ['url1', 'url2']);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.productImage.createMany).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('deleteProductImage', () => {
    it('should delete product image', async () => {
      prismaMock.productImage.delete.mockResolvedValue(PRODUCT_OUTPUT.images[0]);
      prismaMock.productImage.findUnique.mockResolvedValue(PRODUCT_OUTPUT.images[0]);

      const image = await inventoryService.deleteProductImage(1, 4);

      expect(image).toMatchObject(PRODUCT_OUTPUT.images[0]);
      expect(prismaMock.productImage.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundError if image not found', async () => {
      prismaMock.productImage.delete.mockRejectedValue(new NotFoundError());

      try {
        await inventoryService.deleteProductImage(1, 3);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(prismaMock.productImage.delete).toHaveBeenCalledTimes(1);
      }
    });
  });
});
