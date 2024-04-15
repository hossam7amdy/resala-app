import jwt, { SignOptions } from 'jsonwebtoken';

import { JwtObject } from '../../types';

/**
 * Sign JWT token with object
 *
 * @param obj JWT object
 * @param secret JWT secret
 * @param options JWT sign options
 * @returns JWT token
 */
export function signJwt(obj: JwtObject, secret: string, options?: SignOptions): string {
  return jwt.sign(obj, secret, options);
}

/**
 * Verify JWT token. Throws one of VerifyErrors on bad tokens
 *
 * @param token JWT token
 * @param secret JWT secret
 * @returns Decoded JWT object
 * @throws { VerifyErrors } If token is expired
 */
export function verifyJwt(token: string, secret: string): JwtObject {
  return jwt.verify(token, secret) as JwtObject;
}
