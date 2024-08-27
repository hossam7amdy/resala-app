import type { RegisterRequest } from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';
import { jwtSign, jwtVerify } from '../../lib/jwt.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';

export class AuthService {
  constructor(private readonly db: DataStore) {}

  private _getAccessToken(id: string, email: string) {
    return jwtSign({ id, email }, 'JWT_SECRET', {
      expiresIn: '8h',
    });
  }

  private _getRefreshToken(id: string, email: string) {
    return jwtSign({ id: id.toString(), email }, 'JWT_REFRESH', {
      expiresIn: '7d',
    });
  }

  private _getResetToken(id: string, email: string) {
    return jwtSign({ id: id.toString(), email }, 'JWT_RESET', {
      expiresIn: '15m',
    });
  }

  private _getVerifyToken(id: string, email: string) {
    return jwtSign({ id, email }, 'JWT_VERIFY', {
      expiresIn: '1h',
    });
  }

  async login(sign: string, password: string) {
    const { id, password: passwordHash } = await this.db.user.findFirstOrThrow({
      select: {
        id: true,
        password: true,
      },
      where: {
        OR: [{ email: sign }, { phone: sign }],
      },
    });

    const verified = await verifyPassword(password, passwordHash);
    if (!verified) {
      throw new BadRequestError('Invalid email/phone or password');
    }

    const user = await this.db.user.update({
      where: { id },
      data: { lastLogin: new Date() },
    });

    const accessToken = this._getAccessToken(user.id.toString(), user.email);
    const refreshToken = this._getRefreshToken(user.id.toString(), user.email);

    return { accessToken, refreshToken, user };
  }

  async register(payload: RegisterRequest['body']) {
    const hashedPassword = await hashPassword(payload.password);

    const user = await this.db.user.create({
      data: {
        email: payload.email,
        phone: payload.phone,
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: hashedPassword,
      },
    });

    return {
      user,
      verifyToken: this._getVerifyToken(user.id.toString(), user.email),
    };
  }

  async requestEmailVerification(email: string) {
    const user = await this.db.user.findUniqueOrThrow({ where: { email } });

    if (user.isEmailVerified) {
      throw new BadRequestError('Email is already verified');
    }

    const token = this._getVerifyToken(user.id.toString(), user.email);

    return { token };
  }

  async verifyEmail(email: string) {
    const { isEmailVerified } = await this.db.user.findUniqueOrThrow({
      where: { email },
      select: { isEmailVerified: true },
    });

    if (isEmailVerified) {
      throw new BadRequestError('Email is already verified');
    }

    await this.db.user.update({ where: { email }, data: { isEmailVerified: true } });
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const { id, password: passwordHash } = await this.db.user.findUniqueOrThrow({
      select: {
        id: true,
        password: true,
      },
      where: { email },
    });

    const verified = await verifyPassword(oldPassword, passwordHash);
    if (!verified) {
      throw new BadRequestError('Invalid password, please try again');
    }

    const hashedPassword = await hashPassword(newPassword);

    await this.db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async forgotPassword(email: string) {
    // validate user exists
    const { id } = await this.db.user.findUniqueOrThrow({ where: { email } });

    // generate reset token
    const token = this._getResetToken(id.toString(), email);

    return { token };
  }

  async resetPassword(email: string, newPassword: string) {
    // update password
    const hashedPassword = await hashPassword(newPassword);

    await this.db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }

  async refreshToken(token: string) {
    const { id } = jwtVerify(token, 'JWT_REFRESH');
    const user = await this.db.user.findUniqueOrThrow({ where: { id: +id } });

    const accessToken = this._getAccessToken(user.id.toString(), user.email);

    return { accessToken };
  }
}
