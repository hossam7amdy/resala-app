import { ColorSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateCreateColor: RequestHandler = (req, _, next) => {
  const { arName, enName, code } = req.body;
  if (!arName || !enName || !code) {
    return next(new BadRequestError('name, and code are required'));
  }

  const colorValidation = ColorSchema.safeParse({ arName, enName, code });
  if (!colorValidation.success) {
    return next(new BadRequestError(colorValidation.error.issues[0].message));
  }

  next();
};

export const validateUpdateColor: RequestHandler = (req, _, next) => {
  const id = req.params.colorId;
  const { arName, enName, code } = req.body;
  if (!arName || !enName || !code) {
    return next(new BadRequestError('name, and code are required'));
  }

  const colorValidation = ColorSchema.safeParse({ id, arName, enName, code });
  if (!colorValidation.success) {
    return next(new BadRequestError(colorValidation.error.issues[0].message));
  }

  next();
};
