import type { User } from '@resala/shared';
import type { Request, Response } from 'express';

import { db } from '../datastore/index.js';
import { UnauthorizedError } from '../errors/api.errors.js';
import { type Secret, jwtVerify } from '../lib/jwt.js';

export const expressAuthentication = async (
  req: Request,
  securityName: Secret,
  // eslint-disable-next-line no-unused-vars
  _scopes: string[] = [],
  res: Response
): Promise<User> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error();

    const { id } = jwtVerify(token, securityName);

    const user = await db.user.findUniqueOrThrow({ where: { id: +id } });

    res.locals.user = user;
    return Promise.resolve(user);
  } catch (e) {
    throw new UnauthorizedError();
  }
};
