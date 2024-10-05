import type { ProviderUser, RegisterRequest, SignProvider } from '@resala/shared';

import type { Configuration } from '../../configuration/index.js';
import type { DataStore } from '../../datastore/index.js';
import { BadRequestError, NotFoundError } from '../../errors/api.errors.js';
import { hashPassword, verifyPassword } from '../../lib/password.js';
import { JwtManager } from './index.js';

export class AuthService extends JwtManager {
  constructor(
    readonly configuration: Configuration,
    readonly db: DataStore
  ) {
    super(configuration.jwt);
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

    const jwtPayload = { id: user.id.toString(), email: user.email };
    const accessToken = this.signAccess(jwtPayload);
    const refreshToken = this.signRefresh(jwtPayload);

    return { accessToken, refreshToken, user };
  }

  async loginWithProvider(providerUser: ProviderUser, provider: SignProvider = 'google') {
    if (!providerUser) {
      throw new NotFoundError('User not found');
    }

    const user = { ...providerUser, lastLogin: new Date() };

    const { id, email } = await this.db.user.upsert({
      create: {
        ...user,
        password: '',
        role: 'CUSTOMER',
      },
      update: user,
      where: { email: user.email },
    });

    const jwtPayload = { id: id.toString(), email, strategy: provider };
    const accessToken = this.signAccess(jwtPayload);
    const refreshToken = this.signRefresh(jwtPayload);

    return { accessToken, refreshToken };
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
      verifyToken: this.signVerify({ id: user.id.toString(), email: user.email }),
    };
  }

  async requestEmailVerification(email: string) {
    const user = await this.db.user.findUniqueOrThrow({ where: { email } });

    if (user.isEmailVerified) {
      throw new BadRequestError('Email is already verified');
    }

    const token = this.signVerify({ id: user.id.toString(), email: user.email });

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
    const token = this.signReset({ id: id.toString(), email });

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
    const { id, strategy } = this.verify(token, this.configuration.jwt.refresh);
    const user = await this.db.user.findUniqueOrThrow({ where: { id: +id } });

    const accessToken = this.signAccess({ id: user.id.toString(), email: user.email, strategy });

    return { accessToken };
  }
}
