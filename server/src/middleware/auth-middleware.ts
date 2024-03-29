import { RequestHandler } from 'express';

import { authService, userService } from '../services';
import { BadRequestError, ForbiddenError } from '../utils/api-errors';

export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new BadRequestError('Token required');
    }

    const jwtPayload = await authService.verifyAccessToken(token);

    const user = await userService.findUserById(jwtPayload.id);

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeUser = (roles: string[]): RequestHandler => {
  return (_req, res, next) => {
    try {
      const user = res.locals.user;

      if (!roles.includes(user?.role)) {
        throw new ForbiddenError("You don't have permission to access this resource");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
