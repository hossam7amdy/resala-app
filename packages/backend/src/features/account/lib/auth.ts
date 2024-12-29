import type { Configuration } from '@/configuration';
import type { ShoppingService } from '@/features';
import type { PrismaDBConfig } from '@/infrastructure/database';
import type { User } from '@resala/shared';
import { betterAuth } from 'better-auth';
import type { User as AuthUser } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, anonymous, phoneNumber } from 'better-auth/plugins';
import { isValidPhoneNumber } from 'libphonenumber-js';

import type { IEmailService } from '../domain/contracts/IEmailService';
import type { ISMSService } from '../domain/contracts/ISMSService';

const createAuthService = (init: {
  config: Configuration;
  prismaDb: PrismaDBConfig;
  emailService: IEmailService;
  smsService: ISMSService;
  shoppingService: ShoppingService;
}) =>
  betterAuth({
    database: prismaAdapter(init.prismaDb, {
      provider: 'postgresql',
    }),
    trustedOrigins: init.config.trustedOrigins,
    databaseHooks: {
      user: {
        create: {
          before: async (user: AuthUser & Partial<User>) => {
            const [first, last] = user.name.split(' ');
            const birthDate = user.birthDate ? new Date(user.birthDate) : null;

            return {
              data: {
                ...user,
                birthDate,
                firstName: user.firstName || first,
                lastName: user.lastName || last || '',
              },
            };
          },
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true,
      sendResetPassword: ({ user, url }) => {
        return init.emailService.sendVerificationEmail(user.email, url);
      },
    },
    emailVerification: {
      sendVerificationEmail: ({ user, url }) => {
        if (user.emailVerified) {
          return Promise.resolve();
        }

        return init.emailService.sendVerificationEmail(user.email, url);
      },
    },
    socialProviders: {
      google: {
        clientId: init.config.auth.google.clientId,
        clientSecret: init.config.auth.google.clientSecret,
      },
    },
    plugins: [
      admin(),
      anonymous({
        emailDomainName: 'resala.dev',
        onLinkAccount: async ({ anonymousUser, newUser }) => {
          const userId = newUser.user.id;
          const guestId = anonymousUser.user.id;

          await Promise.allSettled([
            init.shoppingService.cart.merge(userId, guestId),
            init.shoppingService.wishlist.merge(userId, guestId),
          ]);
        },
      }),
      phoneNumber({
        sendOTP: ({ phoneNumber, code }) => {
          return init.smsService.sendOTP(phoneNumber, code);
        },
        phoneNumberValidator: phoneNumber => {
          return isValidPhoneNumber(phoneNumber, 'EG');
        },
      }),
    ],
    advanced: {
      generateId: false,
      cookiePrefix: '__resala-auth__',
      crossSubDomainCookies: {
        enabled: true,
        domain: init.config.appDomain,
      },
    },
    user: {
      additionalFields: {
        isAnonymous: {
          type: 'boolean',
        },
        role: {
          type: 'string',
          input: false,
        },
        phoneNumber: {
          type: 'string',
        },
        phoneNumberVerified: {
          type: 'boolean',
        },
        emailMarketingState: {
          type: 'string',
        },
        smsMarketingState: {
          type: 'string',
        },
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        locale: {
          type: 'string',
        },
        banReason: {
          type: 'string',
        },
        banExpires: {
          type: 'date',
        },
        birthDate: {
          type: 'date',
        },
      },
    },
    session: {
      additionalFields: {
        impersonatedBy: {
          type: 'string',
        },
      },
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ['google'],
      },
    },
  });

export { createAuthService };
export type AuthService = ReturnType<typeof createAuthService>;
