import { RequestHandler } from 'express';

import { inventoryService } from '../../services';
import { BadRequestError } from '../../utils/api-errors';

export const getProductStocks: RequestHandler = async (req, res, next) => {
  const productId = Number(req.params.productId);

  try {
    if (isNaN(productId)) {
      throw new BadRequestError('Product ID must be a number');
    }
    const stocks = await inventoryService.getProductStocks(productId);

    return res.json({
      data: stocks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductStock: RequestHandler = async (req, res, next) => {
  const productId = Number(req.params.productId);

  try {
    const stock = await inventoryService.updateProductStock({
      ...req.body,
      productId,
    });

    return res.json({
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductStock: RequestHandler = async (req, res, next) => {
  const stockId = Number(req.params.stockId);
  const productId = Number(req.params.productId);

  try {
    if (isNaN(stockId) || isNaN(productId)) {
      throw new BadRequestError('Stock ID must be a number');
    }

    await inventoryService.deleteProductStock(productId, stockId);

    return res.json({
      message: 'Stock deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
