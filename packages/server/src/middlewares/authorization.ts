import { Role, type RoleType } from '@resala/shared';
import { RequestHandler } from 'express';

import { ForbiddenError } from '../errors/api.errors.js';

export const authorization: RequestHandler = (req, res, next) => {
  const userId = req.params.userId ?? req.body.userId ?? req.query.userId;
  const { id, role } = res.locals.user;

  if (
    userId &&
    userId.toString() !== id?.toString() &&
    ![Role.ADMIN, Role.MODERATOR].includes(role)
  ) {
    throw new ForbiddenError();
  }

  next();
};

export const authorizeRole = (roles: RoleType[]): RequestHandler => {
  return (_req, res, next) => {
    const { role } = res.locals.user;

    if (!roles.includes(role)) {
      throw new ForbiddenError();
    }

    next();
  };
};
