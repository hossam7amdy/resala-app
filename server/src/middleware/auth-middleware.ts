import { RequestHandler } from 'express';

import { ENV } from '../config/index.js';
import { authService, userService } from '../service/index.js';
import { BadRequestError, ForbiddenError } from '../utils/api-errors.js';

export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new BadRequestError('Token required');
    }

    const jwtPayload = await authService.validateJwtToken(token, ENV.JWT_SECRET!);

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
