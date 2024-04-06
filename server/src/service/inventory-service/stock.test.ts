import { Prisma } from '@prisma/client';

import prismaMock from '../../lib/__mocks__/prisma';
import { NotFoundError } from '../../utils/api-errors';
import { deleteProductStock, getProductStocks, updateProductStock } from './stock';

jest.mock('../../lib/prisma');
jest.mock('./color');
jest.mock('./product');
jest.mock('./size');

const MOCK_STOCK = {
  id: 1,
  productId: 1,
  quantity: 10,
  colorId: 1,
  sizeId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MOCK_PRODUCT_STOCKS = {
  ...MOCK_STOCK,
  color: {
    id: 1,
    code: '#00FF00',
    arName: 'أخضر',
    enName: 'Green',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  size: {
    id: 1,
    name: 'XL',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

describe('stock module', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getProductStocks', () => {
    it('should return the stocks of a product', async () => {
      // Mock data
      const productId = 1;

      // Mock Prisma query
      prismaMock.stock.findMany.mockResolvedValue([MOCK_PRODUCT_STOCKS]);

      // Call the function
      const result = await getProductStocks(productId);

      // Assertions
      expect(result).toEqual([MOCK_PRODUCT_STOCKS]);
      expect(prismaMock.stock.findMany).toHaveBeenCalledWith({
        where: { productId },
        include: {
          color: true,
          size: true,
        },
      });
    });
  });

  describe('updateProductStock', () => {
    it('should update the stock of a product', async () => {
      // Mock data
      const stock: Prisma.StockUncheckedCreateInput = {
        id: 1,
        productId: 1,
        quantity: 20,
        colorId: 1,
        sizeId: 1,
      };

      // Mock Prisma query
      prismaMock.stock.upsert.mockResolvedValue(MOCK_STOCK);

      // Call the function
      const result = await updateProductStock(stock);

      // Assertions
      expect(result).toEqual(MOCK_STOCK);
      expect(prismaMock.stock.upsert).toHaveBeenCalledWith({
        create: {
          productId: stock.productId,
          colorId: stock.colorId,
          sizeId: stock.sizeId,
          quantity: stock.quantity,
        },
        update: {
          quantity: stock.quantity,
        },
        where: {
          stock_unique_constraint: {
            productId: stock.productId,
            colorId: stock.colorId,
            sizeId: stock.sizeId,
          },
        },
      });
    });
  });

  describe('deleteProductStock', () => {
    it('should delete the stock of a product', async () => {
      // Mock data
      const productId = 1;
      const stockId = 1;

      // Mock Prisma query
      prismaMock.stock.delete.mockResolvedValue(MOCK_STOCK);

      // Call the function
      const result = await deleteProductStock(productId, stockId);

      // Assertions
      expect(result).toEqual(MOCK_STOCK);
      expect(prismaMock.stock.delete).toHaveBeenCalledWith({
        where: { id: stockId, productId },
      });
    });

    it('should throw NotFoundError if the stock does not exist', async () => {
      // Mock data
      const productId = 1;
      const stockId = 1;

      // Mock Prisma query
      prismaMock.stock.delete.mockRejectedValue(Prisma.PrismaClientUnknownRequestError);

      // Call the function
      await expect(deleteProductStock(productId, stockId)).rejects.toThrow(NotFoundError);
    });
  });
});
