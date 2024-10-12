import type { JwtPayload } from '@resala/shared';
import jwt from 'jsonwebtoken';

import type { Configuration } from '../../configuration/index.js';
import { configuration } from '../../configuration/index.js';

export class JwtManager {
  constructor(readonly config: Configuration['jwt'] = configuration.jwt) {}

  sign(payload: jwt.JwtPayload, secret: jwt.Secret, options: jwt.SignOptions = {}): string {
    return jwt.sign(payload, secret, options);
  }

  verify(token: string, secret: jwt.Secret): JwtPayload {
    return jwt.verify(token, secret) as JwtPayload;
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }

  signAccess({ strategy = 'credentials', ...payload }: JwtPayload) {
    return this.sign({ ...payload, strategy }, this.config.secret, {
      expiresIn: '8h',
    });
  }

  signRefresh({ strategy = 'credentials', ...payload }: JwtPayload) {
    return this.sign({ ...payload, strategy }, this.config.refresh, {
      expiresIn: '7d',
    });
  }

  signReset(payload: JwtPayload) {
    return this.sign(payload, this.config.reset, {
      expiresIn: '15m',
    });
  }

  signVerify(payload: JwtPayload) {
    return this.sign(payload, this.config.verify, {
      expiresIn: '1h',
    });
  }

  verifyAccess(token: string) {
    return this.verify(token, this.config.secret);
  }

  verifyRefresh(token: string) {
    return this.verify(token, this.config.refresh);
  }

  verifyReset(token: string) {
    return this.verify(token, this.config.reset);
  }

  verifyVerify(token: string) {
    return this.verify(token, this.config.verify);
  }
}
