import { CategorySchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../lib/error';

const CreateCategorySchema = CategorySchema.omit({
  id: true,
});

export const validateCreateCategory: RequestHandler = (req, _, next) => {
  const { arName, enName } = req.body;
  if (!arName || !enName) {
    return next(new BadRequestError('arName and enName are required'));
  }

  const validatedFields = CreateCategorySchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateUpdateCategory: RequestHandler = (req, _, next) => {
  const categoryId = req.params.categoryId;
  const { arName, enName } = req.body;
  if (!arName && !enName) {
    return next(new BadRequestError('arName or enName is required'));
  }

  const validatedFields = CategorySchema.safeParse({ ...req.body, id: categoryId });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};
