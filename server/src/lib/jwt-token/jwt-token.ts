import jwt, { SignOptions } from 'jsonwebtoken';

import ENV from '../../env';

export type JwtObject = {
  id: string;
  email: string;
  [key: string]: any;
};

interface Options extends Pick<SignOptions, 'expiresIn'> {}
export function signJwt(obj: JwtObject, options?: Options): string {
  return jwt.sign(obj, ENV.JWT_SECRET!, options);
}

// Throws one of VerifyErrors on bad tokens
export function verifyJwt(token: string): JwtObject {
  return jwt.verify(token, ENV.JWT_SECRET!) as JwtObject;
}
