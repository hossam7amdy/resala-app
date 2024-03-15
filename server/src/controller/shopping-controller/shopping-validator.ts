import { CartSchema, WishlistSchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { BadRequestError } from '../../utils/api-errors';

export const validateCart: RequestHandler = (req, res, next) => {
  const userId = res.locals.user.id;
  const { stockId, quantity } = req.body;
  if (!userId || !stockId || !quantity) {
    return next(new BadRequestError('Missing required fields'));
  }

  const validatedFields = CartSchema.safeParse({ userId, stockId, quantity });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateWishlist: RequestHandler = (req, res, next) => {
  const userId = res.locals.user.id;
  const { productId } = req.body;
  if (!userId || !productId) {
    return next(new BadRequestError('missing required fields'));
  }

  const validatedFields = WishlistSchema.safeParse({ userId, productId });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};
