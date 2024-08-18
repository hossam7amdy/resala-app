import { Role } from '@resala/shared';
import type { RoleType } from '@resala/shared';
import type { RequestHandler } from 'express';

import { ForbiddenError, UnauthorizedError } from '../errors/api.errors.js';
import type { AuthService } from '../features/auth/auth.service.js';
import type { UserService } from '../features/user/user.service.js';

export class AuthMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  parseJwt: RequestHandler = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return next();
      }

      const { id } = await this.authService.validateJwtToken(token, process.env.JWT_SECRET!);

      res.locals.user = await this.userService.find(id);

      next();
    } catch (error) {
      next(error);
    }
  };

  enforceJwt: RequestHandler = async (_, res, next) => {
    try {
      if (!res.locals?.user?.id) {
        throw new UnauthorizedError();
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  authorizeRole = (roles: RoleType[]): RequestHandler => {
    return (_req, res, next) => {
      try {
        const user = res.locals.user;

        if (!roles.includes(user?.role)) {
          throw new ForbiddenError();
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };

  authorizeAccess: RequestHandler = (req, res, next) => {
    try {
      const userId = req.params.userId ?? req.body.userId ?? req.query.userId;
      const { id, role } = res.locals.user;

      if (![Role.ADMIN, Role.MODERATOR].includes(role) && userId !== id?.toString()) {
        throw new ForbiddenError();
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
