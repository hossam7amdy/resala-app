import type { JwtPayload } from '@resala/shared';
import type { Request, RequestHandler } from 'express';

import { configuration } from '../configuration/index.js';
import { db } from '../datastore/index.js';
import { UnauthorizedError } from '../errors/api.errors.js';
import { JwtManager } from '../features/auth/jwt.manager.js';

type SecurityName = 'JWT_SECRET' | 'JWT_RESET' | 'JWT_VERIFY';

const jwtManager = new JwtManager(configuration.jwt);

const validateJwt = (token: string, securityName: SecurityName = 'JWT_SECRET') => {
  let payload: JwtPayload;

  switch (securityName) {
    case 'JWT_RESET':
      payload = jwtManager.verifyReset(token);
      break;
    case 'JWT_VERIFY':
      payload = jwtManager.verifyVerify(token);
      break;
    default:
      payload = jwtManager.verifyAccess(token);
      break;
  }

  return db.user.findUniqueOrThrow({ where: { id: +payload.id } });
};

export const jwtParse: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || res.locals.user) return next();

    res.locals.user = await validateJwt(token);
    return next();
  } catch (e) {
    return next(new UnauthorizedError((e as Error).message));
  }
};

export const enforceJwt: RequestHandler = (_, res) => {
  if (!res.locals.user) {
    throw new UnauthorizedError('Unauthorized');
  }
  return Promise.resolve();
};

export const expressAuthentication = async (req: Request, securityName: SecurityName) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new UnauthorizedError('Unauthorized');

  req.res!.locals.user = await validateJwt(token, securityName);
  return enforceJwt(req, req.res!, req.next!);
};
