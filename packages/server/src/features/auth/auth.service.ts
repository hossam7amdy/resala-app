import type { User } from '@prisma/client';
import type { RegisterRequest } from '@resala/shared';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import type { DataStore } from '../../datastore/index.js';
import { BadRequestError, UnauthorizedError } from '../../errors/api.errors.js';
import { genHashedPassword, verifyHashedPassword } from '../../utils/password.js';
import { generateRandomString } from '../../utils/random.js';

export class AuthService {
  constructor(private readonly db: DataStore) {}

  private cleanSensitiveData(user: User) {
    const { password, iterations, salt, ...rest } = user;
    return rest;
  }

  async authenticate(sign: string, password: string) {
    const user = await this.db.user.findFirstOrThrow({
      where: { OR: [{ email: sign }, { phone: sign }] },
    });

    const verified = await verifyHashedPassword({
      password: password!,
      salt: user.salt,
      iterations: user.iterations,
      hashedPassword: user.password,
    });
    if (!verified) {
      throw new BadRequestError('Invalid email/phone or password');
    }

    await this.db.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH!, {
      expiresIn: '7d',
    });

    return {
      expiresAt: this.oneDayFromNow,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: this.cleanSensitiveData(user),
    };
  }

  async register(payload: RegisterRequest['body']) {
    const { hashedPassword, salt, iterations } = await genHashedPassword(payload.password);

    const user = await this.db.user.create({
      data: {
        email: payload.email,
        phone: payload.phone,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: 'CUSTOMER',
        isVerified: false,
        password: hashedPassword,
        salt,
        iterations,
        lastLogin: null,
      },
    });

    // generate verify token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_VERIFY!, {
      expiresIn: '30d',
    });

    return {
      user: this.cleanSensitiveData(user),
      verifyToken: token,
    };
  }

  async verifyEmail(email: string, token: string) {
    const user = await this.db.user.findUniqueOrThrow({ where: { email } });

    const jwtObj = await this.validateJwtToken(token, process.env.JWT_VERIFY!);
    if (email !== jwtObj.email) {
      throw new BadRequestError('Invalid token');
    }

    await this.db.user.update({ where: { id: user.id }, data: { isVerified: true } });
    return true;
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const user = await this.db.user.findUniqueOrThrow({ where: { email } });

    const verified = await verifyHashedPassword({
      password: oldPassword,
      salt: user.salt,
      iterations: user.iterations,
      hashedPassword: user.password,
    });
    if (!verified) {
      throw new BadRequestError('Old password is incorrect');
    }

    const { hashedPassword, salt, iterations } = await genHashedPassword(newPassword);

    await this.db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, salt, iterations },
    });
  }

  async forgotPassword(email: string) {
    // validate user exists
    const user = await this.db.user.findUniqueOrThrow({ where: { email } });

    // generate reset token
    const resetCode = generateRandomString(6).toUpperCase();
    const token = jwt.sign({ id: user.id, email, resetCode }, process.env.JWT_RESET!, {
      expiresIn: '1h',
    });

    return {
      expiresAt: this.oneHourFromNow,
      token,
      resetCode,
    };
  }

  async resetPassword(token: string, code: string, password: string) {
    // validate reset code
    const { id, resetCode } = await this.validateJwtToken(token, process.env.JWT_RESET!);

    if (resetCode !== code) {
      throw new BadRequestError('Invalid code');
    }

    // update password
    const { hashedPassword, salt, iterations } = await genHashedPassword(password);
    await this.db.user.update({
      where: { id },
      data: { password: hashedPassword, salt, iterations },
    });
  }

  async refreshToken(token: string) {
    const { id } = await this.validateJwtToken(token, process.env.JWT_REFRESH!);
    const user = await this.db.user.findUniqueOrThrow({ where: { id } });

    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    return {
      expiresAt: this.oneDayFromNow,
      accessToken: accessToken,
    };
  }

  async validateJwtToken(token: string, secret: string): Promise<JwtPayload> {
    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token expired');
      }
      throw new UnauthorizedError('Invalid token');
    }
  }

  get oneDayFromNow() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24);
  }

  get oneHourFromNow() {
    return new Date(Date.now() + 1000 * 60 * 60);
  }
}
