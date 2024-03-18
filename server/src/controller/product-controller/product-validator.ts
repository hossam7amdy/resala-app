import { ProductSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateCreateProduct: RequestHandler = (req, _, next) => {
  const validatedFields = ProductSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  req.body = validatedFields.data;
  next();
};

export const validateUpdateProduct: RequestHandler = (req, _, next) => {
  const productId = req.params.productId;
  const validatedFields = ProductSchema.safeParse({ ...req.body, id: productId });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  req.body = validatedFields.data;
  next();
};
