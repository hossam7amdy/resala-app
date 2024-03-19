import { ColorSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

function validateColorBody(body: typeof ColorSchema) {
  const colorValidation = ColorSchema.safeParse(body);
  if (!colorValidation.success) {
    throw new BadRequestError(colorValidation.error.issues[0].message);
  }
  return colorValidation.data;
}

export const validateCreateColor: RequestHandler = (req, _, next) => {
  try {
    req.body = validateColorBody(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUpdateColor: RequestHandler = (req, _, next) => {
  const colorId = Number(req.params.colorId);

  try {
    if (isNaN(colorId)) {
      throw new BadRequestError('Color ID must be a number');
    }

    req.body = validateColorBody(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
