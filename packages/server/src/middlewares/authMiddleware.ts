import { Role } from '@resala/shared';
import type { RoleType } from '@resala/shared';
import type { RequestHandler } from 'express';

import type { AuthService, UserService } from '../services/index.js';
import { BadRequestError, ForbiddenError } from '../utils/ApiErrors.js';

export default class AuthMiddleware {
  constructor(
    private readonly authService: AuthService,
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

  authorizeUser = (roles: RoleType[]): RequestHandler => {
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

  authorizeSelf = (roles?: RoleType[]): RequestHandler => {
    return (req, res, next) => {
      try {
        const user = res.locals.user;

        if (req.params.userId === 'self') {
          req.params.userId = user?.id.toString();
        }

        if (!roles?.includes(user?.role) && req.params.userId !== user?.id.toString()) {
          throw new ForbiddenError();
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };

  authorizeRoleChange: RequestHandler = (req, res, next) => {
    try {
      const user = res.locals.user;
      const role = req.body.role as RoleType;

      if (role && user?.role !== Role.ADMIN) {
        throw new ForbiddenError();
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
