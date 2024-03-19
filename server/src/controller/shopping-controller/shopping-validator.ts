import { CartSchema, WishlistSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateCart: RequestHandler = (req, res, next) => {
  const userId = res.locals.user.id;

  try {
    const validatedFields = CartSchema.safeParse({ ...req.body, userId });
    if (!validatedFields.success) {
      throw new BadRequestError(validatedFields.error.issues[0].message);
    }

    req.body = validatedFields.data;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateWishlist: RequestHandler = (req, res, next) => {
  const userId = res.locals.user.id;

  try {
    const validatedFields = WishlistSchema.safeParse({ ...req.body, userId });
    if (!validatedFields.success) {
      throw new BadRequestError(validatedFields.error.issues[0].message);
    }

    req.body = validatedFields.data;
    next();
  } catch (error) {
    next(error);
  }
};
