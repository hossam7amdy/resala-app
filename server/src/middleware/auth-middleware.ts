import { RequestHandler } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import { ROLES } from '../definition/types';
import { UnauthorizedError } from '../lib/error';
import { JwtObject, verifyJwt } from '../lib/jwt-token';
import { prisma } from '../model';

export const authenticateToken: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next(new UnauthorizedError('Token required'));
  }

  let payload: JwtObject;
  try {
    payload = verifyJwt(token);
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return next(new UnauthorizedError('Token expired'));
    }
    return next(new UnauthorizedError('Invalid token'));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    return next(new UnauthorizedError('User not found'));
  }

  res.locals.user = user;
  return next();
};

export const authorizeUser = (roles: ROLES[]): RequestHandler => {
  return (_req, res, next) => {
    const user = res.locals.user;

    if (!roles.includes(user?.role)) {
      return next(new UnauthorizedError("You don't have permission to access this resource"));
    }

    return next();
  };
};
