import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

import type { JwtObject } from '../../types/index.js';

/**
 * Sign JWT token with object
 *
 * @param obj JWT object
 * @param secret JWT secret
 * @param options JWT sign options
 * @returns JWT token
 */
export const signJwt = (obj: JwtObject, secret: string, options?: SignOptions): string => {
  return jwt.sign(obj, secret, options);
};

/**
 * Verify JWT token. Throws one of VerifyErrors on bad tokens
 *
 * @param token JWT token
 * @param secret JWT secret
 * @returns Decoded JWT object
 * @throws { VerifyErrors } If token is expired
 */
export const verifyJwt = (token: string, secret: string): JwtObject => {
  return jwt.verify(token, secret) as JwtObject;
};
