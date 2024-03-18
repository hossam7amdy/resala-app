import { SizeSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateCreateSize: RequestHandler = (req, _, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new BadRequestError('name are required'));
  }

  const sizeValidation = SizeSchema.safeParse({ name });
  if (!sizeValidation.success) {
    return next(new BadRequestError(sizeValidation.error.issues[0].message));
  }

  next();
};

export const validateUpdateSize: RequestHandler = (req, _, next) => {
  const id = req.params.sizeId;
  const { name } = req.body;
  if (!name) {
    return next(new BadRequestError('name are required'));
  }

  const sizeValidation = SizeSchema.safeParse({ id, name });
  if (!sizeValidation.success) {
    return next(new BadRequestError(sizeValidation.error.issues[0].message));
  }

  next();
};
