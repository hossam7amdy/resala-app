import jwt, { SignOptions } from 'jsonwebtoken';

import { JwtObject } from '../../types';

export function signJwt(obj: JwtObject, secret: string, options?: SignOptions): string {
  return jwt.sign(obj, secret, options);
}

// Throws one of VerifyErrors on bad tokens
export function verifyJwt(token: string, secret: string): JwtObject {
  return jwt.verify(token, secret) as JwtObject;
}
