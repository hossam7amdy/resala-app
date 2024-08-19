import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { db } from '../datastore/index.js';
import { UnauthorizedError } from '../errors/api.errors.js';

export const expressAuthentication = async (
  req: Request,
  _securityName = 'jwt_auth',
  _scopes: string[] = [],
  res: Response
): Promise<any> => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return Promise.reject(new UnauthorizedError());
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string | number };

  const user = await db.user.findUniqueOrThrow({ where: { id: +id } });

  res.locals.user = user;
  return Promise.resolve(user);
};
