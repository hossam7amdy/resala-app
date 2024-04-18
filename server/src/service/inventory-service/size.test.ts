import { beforeEach, describe, expect, it, vi } from 'vitest';

import prismaMock from '../../lib/__mocks__/prisma.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';
import { inventoryService } from '../index.js';

vi.mock('../../lib/prisma/index.js');

const MOCK_SIZE = {
  id: 1,
  name: 'XL',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Inventory Service [ Size ]', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('findSizeById', () => {
    it('should return the size with the given id', async () => {
      prismaMock.size.findUnique.mockResolvedValue(MOCK_SIZE);

      const size = await inventoryService.findSizeById(1);

      expect(size).toEqual(MOCK_SIZE);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw NotFoundError if size with the given id does not exist', async () => {
      prismaMock.size.findUnique.mockResolvedValue(null);

      await expect(inventoryService.findSizeById(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });
  });

  describe('listSizes', () => {
    it('should return a list of all sizes', async () => {
      prismaMock.size.findMany.mockResolvedValue([MOCK_SIZE]);

      const sizes = await inventoryService.listSizes();

      expect(sizes).toEqual([MOCK_SIZE]);
      expect(prismaMock.size.findMany).toHaveBeenCalledWith();
    });
  });

  describe('createSize', () => {
    it('should create a new size with the given name', async () => {
      prismaMock.size.findUnique.mockResolvedValue(null);
      prismaMock.size.create.mockResolvedValue(MOCK_SIZE);

      const size = await inventoryService.createSize('XL');

      expect(size).toEqual(MOCK_SIZE);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          name: 'XL',
        },
      });
      expect(prismaMock.size.create).toHaveBeenCalledWith({
        data: {
          name: 'XL',
        },
      });
    });

    it('should throw ConflictError if size with given name already exist', async () => {
      prismaMock.size.findUnique.mockResolvedValue(MOCK_SIZE);

      await expect(inventoryService.createSize('XL')).rejects.toThrow(ConflictError);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          name: 'XL',
        },
      });
    });
  });

  describe('updateSize', () => {
    it('should update the size with the given id and name', async () => {
      prismaMock.size.findUnique.mockResolvedValue(MOCK_SIZE);
      prismaMock.size.update.mockResolvedValue(MOCK_SIZE);

      const size = await inventoryService.updateSize(1, 'XL');

      expect(size).toEqual(MOCK_SIZE);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(prismaMock.size.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          name: 'XL',
        },
      });
    });

    it('should throw ConflictError if size with the given id does not exist', async () => {
      prismaMock.size.findUnique.mockResolvedValue(null);

      await expect(inventoryService.updateSize(1, 'XL')).rejects.toThrow(NotFoundError);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });
  });

  describe('deleteSize', () => {
    it('should delete the size with the given id', async () => {
      prismaMock.size.findUnique.mockResolvedValue(MOCK_SIZE);
      prismaMock.stock.findFirst.mockResolvedValue(null);
      prismaMock.size.delete.mockResolvedValue(MOCK_SIZE);

      const size = await inventoryService.deleteSize(1);

      expect(size).toEqual(MOCK_SIZE);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(prismaMock.stock.findFirst).toHaveBeenCalledWith({
        where: {
          sizeId: 1,
        },
      });
      expect(prismaMock.size.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw ConflictError if size with the given id does not exist', async () => {
      prismaMock.size.findUnique.mockResolvedValue(null);

      await expect(inventoryService.deleteSize(1)).rejects.toThrow(NotFoundError);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });

    it('should throw ConflictError if size is in use', async () => {
      prismaMock.size.findUnique.mockResolvedValue(MOCK_SIZE);
      prismaMock.stock.findFirst.mockResolvedValue({} as any);

      await expect(inventoryService.deleteSize(1)).rejects.toThrow(ConflictError);
      expect(prismaMock.size.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(prismaMock.stock.findFirst).toHaveBeenCalledWith({
        where: {
          sizeId: 1,
        },
      });
    });
  });
});
