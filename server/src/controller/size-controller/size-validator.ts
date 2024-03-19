import { SizeSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

function validateSizeBody(body: typeof SizeSchema) {
  const sizeValidation = SizeSchema.safeParse(body);
  if (!sizeValidation.success) {
    throw new BadRequestError(sizeValidation.error.issues[0].message);
  }

  return sizeValidation.data;
}

export const validateCreateSize: RequestHandler = (req, _, next) => {
  try {
    req.body = validateSizeBody(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateSize: RequestHandler = (req, _, next) => {
  const sizeId = Number(req.params.sizeId);

  try {
    if (isNaN(sizeId)) {
      throw new BadRequestError('Size id must be a number');
    }

    req.body = validateSizeBody(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
