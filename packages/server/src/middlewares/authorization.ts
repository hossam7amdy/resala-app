import { Role, type RoleType } from '@resala/shared';
import type { RequestHandler } from 'express';

import { ForbiddenError } from '../errors/api.errors.js';

export const authorization: RequestHandler = (req, res, next) => {
  const { id, role } = res.locals.user ?? {};
  const userId = req.params.userId ?? req.body.userId ?? req.query.userId;

  const notAuthorized = userId && userId.toString() !== id?.toString();
  const notAdmin = ![Role.ADMIN, Role.MODERATOR].includes(role);

  if (notAuthorized && notAdmin) {
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
