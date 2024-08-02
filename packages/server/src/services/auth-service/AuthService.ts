import type { RegisterRequest } from '@resala/shared';
import jwt from 'jsonwebtoken';

import * as Jwt from '../../lib/jwtToken.js';
import type { UserRepository } from '../../repositories/index.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../utils/ApiErrors.js';
import { genHashedPassword, verifyHashedPassword } from '../../utils/password.js';
import { generateRandomString } from '../../utils/random.js';

export default class AuthService {
  private readonly userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async authenticate(sign: string, password: string) {
    const sensitiveUser = await this.userRepo.findByEmailOrPhoneSensitive(sign);
    if (!sensitiveUser) {
      throw new NotFoundError('User not registered');
    }

    const verified = await verifyHashedPassword({
      password: password!,
      salt: sensitiveUser.salt,
      iterations: sensitiveUser.iterations,
      hashedPassword: sensitiveUser.password,
    });
    if (!verified) {
      throw new BadRequestError('Invalid email/phone or password');
    }

    const user = await this.userRepo.update(sensitiveUser.id, { lastLogin: new Date() });

    const accessToken = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    const refreshToken = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_REFRESH!, {
      expiresIn: '7d',
    });

    return {
      expiresAt: this.oneDayFromNow,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    };
  }

  async register(payload: RegisterRequest['body']) {
    const duplicate =
      (await this.userRepo.findByPhone(payload.phone)) ||
      (await this.userRepo.findByEmail(payload.email));
    if (duplicate) {
      throw new ConflictError('User already registered');
    }

    const { hashedPassword, salt, iterations } = await genHashedPassword(payload.password);

    const user = await this.userRepo.create({
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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // generate verify token
    const token = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_VERIFY!, {
      expiresIn: '30d',
    });

    return {
      user,
      verifyToken: token,
    };
  }

  async verifyEmail(email: string, token: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const jwtObj = await this.validateJwtToken(token, process.env.JWT_VERIFY!);
    if (email !== jwtObj.email) {
      throw new BadRequestError('Invalid token');
    }

    await this.userRepo.update(user.id, { isVerified: true });
    return true;
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepo.findByEmailOrPhoneSensitive(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

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

    await this.userRepo.update(user.id, { password: hashedPassword, salt, iterations });
    return true;
  }

  async forgotPassword(email: string) {
    // validate user exists
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // generate reset token
    const resetCode = generateRandomString(6).toUpperCase();
    const token = Jwt.signJwt({ id: user.id, email, resetCode }, process.env.JWT_RESET!, {
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
    await this.userRepo.update(id, { password: hashedPassword, salt, iterations });

    return true;
  }

  async refreshToken(token: string) {
    const { id } = await this.validateJwtToken(token, process.env.JWT_REFRESH!);
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const accessToken = Jwt.signJwt({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });
    return {
      expiresAt: this.oneDayFromNow,
      accessToken: accessToken,
    };
  }

  async validateJwtToken(token: string, secret: string) {
    try {
      return Jwt.verifyJwt(token, secret);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token expired');
      }
      throw new UnauthorizedError('Invalid token');
    }
  }

  get oneDayFromNow() {
    // return new Date(Date.now() + 1000 * 60 * 60 * 24);
    return new Date(Date.now() + 1000 * 30);
  }

  get oneHourFromNow() {
    return new Date(Date.now() + 1000 * 60 * 60);
  }
}
