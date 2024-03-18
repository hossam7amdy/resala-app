import { StockSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateCreateStock: RequestHandler = (req, _, next) => {
  const { productId, colorId, sizeId, quantity } = req.body;
  if (!productId || !colorId || !sizeId || !quantity) {
    return next(new BadRequestError('productId, colorId, sizeId, and quantity are required'));
  }

  const stockValidation = StockSchema.safeParse(req.body);
  if (!stockValidation.success) {
    return next(new BadRequestError(stockValidation.error.issues[0].message));
  }

  next();
};

export const validateUpdateStock: RequestHandler = (req, _, next) => {
  const id = req.params.stockId;
  const { productId, colorId, sizeId, quantity } = req.body;
  if (!productId || !colorId || !sizeId || !quantity) {
    return next(new BadRequestError('productId, colorId, sizeId, and quantity are required'));
  }

  const stockValidation = StockSchema.safeParse({ ...req.body, id });
  if (!stockValidation.success) {
    return next(new BadRequestError(stockValidation.error.issues[0].message));
  }

  next();
};
