// Tsoa authentication => https://www.npmjs.com/package/tsoa/v/3.0.6#authentication
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import type { Request, RequestHandler } from 'express';

import { configuration } from '../configuration/index.js';
import type { Configuration } from '../configuration/index.js';
import { InternalServerError, UnauthorizedError } from '../errors/api.errors.js';

const verifyJwt = (token: string, config: Configuration = configuration) => {
  const verifier = CognitoJwtVerifier.create({
    tokenUse: 'access',
    clientId: config.aws.auth.clientId,
    userPoolId: config.aws.auth.userPoolId,
  });

  return verifier.verify(token);
};

export const jwtParse: RequestHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];
    res.locals.user = await verifyJwt(token);
    return next();
  } catch (e) {
    return next(new UnauthorizedError((e as Error).message));
  }
};

export const enforceJwt: RequestHandler = async (req, res) => {
  if (!req.headers?.authorization) {
    return Promise.reject(new UnauthorizedError('Authorization header is missing'));
  }

  if (!res.locals.user) {
    throw Promise.reject(new UnauthorizedError('User is not authenticated'));
  }

  return Promise.resolve();
};

export const expressAuthentication = async (
  req: Request,
  securityName: string = 'jwt_auth',
  _scopes?: string[]
) => {
  if (securityName.toLocaleLowerCase() !== 'jwt_auth') {
    return Promise.reject(new InternalServerError('only jwt security is allowed'));
  }

  return enforceJwt(req, req.res!, req.next!);
};
