import { ProductSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../lib/error';

const CreateProductSchema = ProductSchema.omit({
  id: true,
});

export const validateCreateProduct: RequestHandler = (req, _, next) => {
  const { categoryId, arName, enName, arDescription, enDescription, price } = req.body;
  if (!categoryId || !arName || !enName || !arDescription || !enDescription || !price) {
    return next(new BadRequestError('Missing Required fields'));
  }

  const validatedFields = CreateProductSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateUpdateProduct: RequestHandler = (req, _, next) => {
  const productId = req.params.productId;
  const { categoryId, arName, enName, arDescription, enDescription, price } = req.body;
  if (!categoryId || !arName || !enName || !arDescription || !enDescription || !price) {
    return next(new BadRequestError('Missing Required fields'));
  }

  const validatedFields = ProductSchema.safeParse({ ...req.body, id: productId });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};
