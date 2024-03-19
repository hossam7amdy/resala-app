import { StockSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateStockBody: RequestHandler = (req, _, next) => {
  const productId = req.params.productId;

  try {
    const stockValidation = StockSchema.safeParse({ ...req.body, productId });
    if (!stockValidation.success) {
      throw new BadRequestError(stockValidation.error.issues[0].message);
    }

    req.body = stockValidation.data;
    next();
  } catch (error) {
    next(error);
  }
};
