import jwt, { SignOptions } from 'jsonwebtoken';

import ENV from '../../env';

export interface JwtObject {
  id: string;
  email: string;
  [key: string]: any;
}

interface TokenOptions {
  type: 'ACCESS' | 'REFRESH' | 'VERIFY' | 'RESET';
  expiresIn: SignOptions['expiresIn'];
}

export function signJwt(obj: JwtObject, options: TokenOptions): string {
  return jwt.sign(obj, tokenSecret(options.type)!, { expiresIn: options.expiresIn });
}

// Throws one of VerifyErrors on bad tokens
export function verifyJwt(token: string, type: TokenOptions['type'] = 'ACCESS'): JwtObject {
  return jwt.verify(token, tokenSecret(type)!) as JwtObject;
}

function tokenSecret(type: TokenOptions['type']) {
  switch (type) {
    case 'REFRESH':
      return ENV.JWT_REFRESH;
    case 'RESET':
      return ENV.JWT_RESET;
    case 'VERIFY':
      return ENV.JWT_VERIFY;
    default:
      return ENV.JWT_SECRET;
  }
}
