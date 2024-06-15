import type { RequestHandler } from 'express';

import type { authService as AuthService, UserService } from '../services/index.js';
import { BadRequestError, ForbiddenError } from '../utils/api-errors.js';

export default class AuthMiddleware {
  constructor(
    private readonly authService: typeof AuthService,
    private readonly userService: UserService
  ) {}

  authenticateToken: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new BadRequestError('Token required');
      }

      const jwtPayload = await this.authService.validateJwtToken(token, process.env.JWT_SECRET!);

      const user = await this.userService.findUserById(jwtPayload.id);

      res.locals.user = user;
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
