import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { db } from '../datastore/index.js';
import { UnauthorizedError } from '../errors/api.errors.js';
import { type Secret, jwtVerify } from '../lib/jwt.js';

const jwtParse = async (req: Request, res: Response, _: NextFunction, securityName: Secret) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return Promise.resolve();

    const { id } = jwtVerify(token, securityName);

    const user = await db.user.findUnique({ where: { id: +id } });
    if (!user) throw new Error('User not found');

    res.locals.user = user;
    return Promise.resolve(user);
  } catch (e) {
    throw new UnauthorizedError((e as Error).message);
  }
};

export const enforceJwt: RequestHandler = (_, res, next) => {
  if (!res.locals.user) {
    throw new UnauthorizedError('Unauthorized');
  }
  return next();
};

export const expressAuthentication = async (req: Request, securityName: Secret) => {
  return jwtParse(req, req.res!, req.next!, securityName);
};
