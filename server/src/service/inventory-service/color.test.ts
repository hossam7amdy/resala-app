import { beforeEach, describe, expect, it, vi } from 'vitest';

import prismaMock from '../../lib/__mocks__/prisma.js';
import { NotFoundError } from '../../utils/api-errors.js';
import { inventoryService } from '../index.js';

vi.mock('lib/prisma/index.js', () => ({
  default: prismaMock,
}));

const MOCK_COLOR = {
  id: 1,
  code: '#00FF00',
  arName: 'أخضر',
  enName: 'Green',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe('findColorById', () => {
  it('should return the color when found', async () => {
    prismaMock.color.findUnique.mockResolvedValue(MOCK_COLOR);

    const color = await inventoryService.findColorById(1);

    expect(color).toEqual(MOCK_COLOR);
    expect(prismaMock.color.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should throw NotFoundError when color is not found', async () => {
    prismaMock.color.findUnique.mockResolvedValue(null);

    await expect(inventoryService.findColorById(1)).rejects.toThrow(NotFoundError);
    expect(prismaMock.color.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });
});

describe('getColors', () => {
  it('should return all colors', async () => {
    prismaMock.color.findMany.mockResolvedValue([MOCK_COLOR]);

    const colors = await inventoryService.getColors();

    expect(colors).toEqual([MOCK_COLOR]);
    expect(prismaMock.color.findMany).toHaveBeenCalledWith();
  });
});

describe('createColor', () => {
  it('should create a color', async () => {
    prismaMock.color.create.mockResolvedValue(MOCK_COLOR);

    const color = await inventoryService.createColor(MOCK_COLOR);

    expect(color).toEqual(MOCK_COLOR);
    expect(prismaMock.color.create).toHaveBeenCalledWith({
      data: MOCK_COLOR,
    });
  });

  it('should throw ConflictError when color already exists', async () => {
    prismaMock.color.findFirst.mockResolvedValue(MOCK_COLOR);

    await expect(inventoryService.createColor(MOCK_COLOR)).rejects.toThrow('Color already exists');
    expect(prismaMock.color.findFirst).toHaveBeenCalledWith({
      where: {
        OR: [
          { arName: MOCK_COLOR.arName },
          { enName: MOCK_COLOR.enName },
          { code: MOCK_COLOR.code },
        ],
      },
    });
  });
});

describe('updateColor', () => {
  it('should update a color', async () => {
    prismaMock.color.upsert.mockResolvedValue(MOCK_COLOR);

    const color = await inventoryService.updateColor(1, MOCK_COLOR);

    expect(color).toEqual(MOCK_COLOR);
    expect(prismaMock.color.upsert).toHaveBeenCalledWith({
      create: MOCK_COLOR,
      update: MOCK_COLOR,
      where: {
        id: 1,
      },
    });
  });

  it('should throw ConflictError when color already exists', async () => {
    prismaMock.color.findFirst.mockResolvedValue(MOCK_COLOR);

    await expect(inventoryService.updateColor(2, MOCK_COLOR)).rejects.toThrow(
      'Color already exists'
    );
    expect(prismaMock.color.findFirst).toHaveBeenCalledWith({
      where: {
        OR: [
          { arName: MOCK_COLOR.arName },
          { enName: MOCK_COLOR.enName },
          { code: MOCK_COLOR.code },
        ],
      },
    });
  });
});

describe('deleteColor', () => {
  it('should delete a color', async () => {
    prismaMock.color.delete.mockResolvedValue(MOCK_COLOR);
    prismaMock.color.findUnique.mockResolvedValue(MOCK_COLOR);

    const color = await inventoryService.deleteColor(1);

    expect(color).toEqual(MOCK_COLOR);
    expect(prismaMock.color.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });

  it('should throw ConflictError when color is in use', async () => {
    prismaMock.color.findUnique.mockResolvedValue(MOCK_COLOR as any);
    prismaMock.stock.findFirst.mockResolvedValue({} as any);

    await expect(inventoryService.deleteColor(1)).rejects.toThrow(
      'Color is in use and cannot be deleted'
    );
    expect(prismaMock.stock.findFirst).toHaveBeenCalledWith({
      where: {
        colorId: 1,
      },
    });
  });

  it('should throw NotFoundError when color is not found', async () => {
    prismaMock.color.findUnique.mockResolvedValue(null);

    await expect(inventoryService.deleteColor(1)).rejects.toThrow(NotFoundError);
    expect(prismaMock.color.findUnique).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
  });
});
