import { beforeEach, describe, expect, it, vi } from 'vitest';

import prismaMock from '../../lib/__mocks__/prisma.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import { inventoryService } from '../index.js';

vi.mock('../../lib/prisma/index.js');

const COMPLETE_CATEGORY = {
  id: 1,
  arName: 'ملابس',
  enName: 'Clothes',
  categoryId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

const COMPLETE_SUB_CATEGORY = {
  id: 2,
  arName: 'ملابس',
  enName: 'Clothes',
  categoryId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe('inventoryService - [ Category ]', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('createCategory', () => {
    const category = {
      arName: 'ملابس',
      enName: 'Clothes',
    };

    const subCategory = {
      categoryId: 1,
      arName: 'ملابس أطفال',
      enName: 'Children Clothes',
    };

    it('should create root category', async () => {
      prismaMock.category.create.mockResolvedValue(COMPLETE_CATEGORY);

      await expect(inventoryService.createCategory(category)).resolves.toEqual(COMPLETE_CATEGORY);
      expect(prismaMock.category.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.findFirst).toHaveBeenCalledTimes(1);
    });

    it('should only create root category if it does not exist', async () => {
      prismaMock.category.findFirst.mockResolvedValue(COMPLETE_CATEGORY);

      await expect(inventoryService.createCategory(category)).rejects.toThrow(ConflictError);
      expect(prismaMock.category.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.create).toHaveBeenCalledTimes(0);
    });

    it('should create new sub-category', async () => {
      prismaMock.category.findUnique.mockImplementation(() => ({}) as any);
      prismaMock.category.create.mockResolvedValue(COMPLETE_SUB_CATEGORY);

      await expect(inventoryService.createCategory(subCategory)).resolves.toEqual(
        COMPLETE_SUB_CATEGORY
      );
      expect(prismaMock.category.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should create new sub-category only if parent category exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(inventoryService.createCategory(subCategory)).rejects.toThrow(NotFoundError);
      expect(prismaMock.category.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.create).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateCategory', () => {
    const category = {
      arName: 'ملابس أطفال',
      enName: 'Children Clothes',
    };

    it('should update category', async () => {
      prismaMock.category.update.mockResolvedValue(COMPLETE_CATEGORY);
      prismaMock.category.findUnique.mockResolvedValue(COMPLETE_CATEGORY);

      await expect(inventoryService.updateCategory(1, category)).resolves.toEqual(
        COMPLETE_CATEGORY
      );
      expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should only update category if it exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(inventoryService.updateCategory(1, category)).rejects.toThrow(NotFoundError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.update).toHaveBeenCalledTimes(0);
    });

    it('should only updated category if it does not conflict with another category', async () => {
      prismaMock.category.findUnique.mockResolvedValue(COMPLETE_CATEGORY);
      prismaMock.category.findFirst.mockResolvedValue(COMPLETE_SUB_CATEGORY);

      await expect(inventoryService.updateCategory(1, category)).rejects.toThrow(ConflictError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.update).toHaveBeenCalledTimes(0);
    });

    it('should update sub-category', async () => {
      prismaMock.category.update.mockResolvedValue(COMPLETE_SUB_CATEGORY);
      prismaMock.category.findUnique.mockResolvedValue(COMPLETE_SUB_CATEGORY);

      await expect(inventoryService.updateCategory(2, category)).resolves.toEqual(
        COMPLETE_SUB_CATEGORY
      );
      expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should only update sub-category if it exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(inventoryService.updateCategory(2, category)).rejects.toThrow(NotFoundError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteCategory', () => {
    it('should delete category', async () => {
      prismaMock.category.findUnique.mockResolvedValue({
        products: [],
        subCategories: [],
      } as any);
      prismaMock.category.delete.mockResolvedValue(COMPLETE_CATEGORY);

      await expect(inventoryService.deleteCategory(1)).resolves.toEqual(COMPLETE_CATEGORY);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(1);
    });

    it('should only delete category if it exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(inventoryService.deleteCategory(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(0);
    });

    it('should only delete category if it does not have sub-categories', async () => {
      prismaMock.category.findUnique.mockResolvedValue({
        products: [],
        subCategories: [COMPLETE_CATEGORY],
      } as any);

      await expect(inventoryService.deleteCategory(1)).rejects.toThrow(ConflictError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(0);
    });

    it('should only delete category if it does not have products', async () => {
      prismaMock.category.findUnique.mockResolvedValue({
        products: [COMPLETE_CATEGORY],
        subCategories: [],
      } as any);

      await expect(inventoryService.deleteCategory(1)).rejects.toThrow(ConflictError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(0);
    });

    it('should only delete category if it does not have products or sub-categories', async () => {
      prismaMock.category.findUnique.mockResolvedValue({
        products: [COMPLETE_CATEGORY],
        subCategories: [COMPLETE_CATEGORY],
      } as any);

      await expect(inventoryService.deleteCategory(1)).rejects.toThrow(ConflictError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.category.delete).toHaveBeenCalledTimes(0);
    });
  });

  describe('getCategory', () => {
    it('should get category', async () => {
      prismaMock.category.findUnique.mockResolvedValue(COMPLETE_CATEGORY);

      await expect(inventoryService.findCategoryById(1)).resolves.toEqual(COMPLETE_CATEGORY);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should only get category if it exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(inventoryService.findCategoryById(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('listCategories', () => {
    it('should get categories', async () => {
      prismaMock.category.findMany.mockResolvedValue([COMPLETE_CATEGORY]);

      await expect(inventoryService.listCategories()).resolves.toEqual([COMPLETE_CATEGORY]);
      expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('listCategoryProducts', () => {
    it('should get category products', async () => {
      prismaMock.category.findUnique.mockResolvedValue({
        products: [],
        subCategories: [],
      } as any);

      await expect(inventoryService.listCategoryProducts(1)).resolves.toEqual([]);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should only get category products if category exists', async () => {
      prismaMock.category.findUnique.mockResolvedValue(null);

      await expect(inventoryService.listCategoryProducts(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
    });
  });
});
