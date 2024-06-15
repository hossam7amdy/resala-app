import type { RequestHandler } from 'express';

import type { authService as AuthService, UserService } from '../services/index.js';
import { BadRequestError, ForbiddenError } from '../utils/api-errors.js';

export default class AuthMiddleware {
  constructor(
    private readonly authService: typeof AuthService,
    private readonly userService: UserService
  ) {}

  jwtParseMiddleware: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return next();
      }

      const payload = await this.authService.validateJwtToken(token, process.env.JWT_SECRET!);
      res.locals.user = await this.userService.findUserById(payload.id);

      next();
    } catch (error) {
      next(error);
    }
  };

  enforceJwtMiddleware: RequestHandler = async (_, res, next) => {
    try {
      if (!res.locals?.user?.id) {
        throw new BadRequestError('Token required');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  authorizeUser = (roles: string[]): RequestHandler => {
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
}
