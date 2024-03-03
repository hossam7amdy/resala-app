import { SizeSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../lib/error';

const CreateSizeSchema = SizeSchema.omit({ id: true });

export const validateCreateSize: RequestHandler = (req, _, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new BadRequestError('name are required'));
  }

  const sizeValidation = CreateSizeSchema.safeParse({ name });
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
