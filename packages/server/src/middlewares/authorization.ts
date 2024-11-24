import type { RoleType } from '@resala/shared';
import type { RequestHandler } from 'express';

import { ForbiddenError } from '../errors/api.errors.js';

export const authorization: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  const userGroups = user?.groups || [];
  const userId = req.params.userId ?? req.body.userId ?? req.query.userId;

  const notAuthorized = userId && userId.toString() !== user?.id?.toString();
  const notAdmin = !userGroups.includes('admin');

  if (notAuthorized && notAdmin) {
    throw new ForbiddenError();
  }

  next();
};

export const authorizeRole = (roles: RoleType[]): RequestHandler => {
  return async (_req, res, next) => {
    try {
      const user = res.locals.user;
      const userGroups = user?.groups || [];

      const hasRole = roles.some(role => userGroups.includes(role.toLowerCase()));
      if (!hasRole) {
        throw new Error('User does not have the required role');
      }
    } catch (e) {
      return next(new ForbiddenError((e as Error).message));
    }

    next();
  };
};
