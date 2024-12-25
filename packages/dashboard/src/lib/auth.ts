import { configuration } from '@/configuration';
import { db } from '@/lib/db';
import { emailService, shoppingService } from '@/services';
import type { User } from '@resala/shared';
import { betterAuth } from 'better-auth';
import type { User as AuthUser } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, anonymous, openAPI, phoneNumber } from 'better-auth/plugins';
import { isValidPhoneNumber } from 'libphonenumber-js';

const config = configuration();

const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  trustedOrigins: config.trustedOrigins,
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
      return emailService.sendVerificationEmail(user.email, url);
    },
  },
  emailVerification: {
    sendVerificationEmail: ({ user, url }) => {
      if (user.emailVerified) {
        return Promise.resolve();
      }

      return emailService.sendVerificationEmail(user.email, url);
    },
  },
  socialProviders: {
    google: {
      clientId: config.auth.google.clientId,
      clientSecret: config.auth.google.clientSecret,
    },
  },
  plugins: [
    admin(),
    openAPI(),
    anonymous({
      emailDomainName: 'resala.dev',
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        const userId = newUser.user.id;
        const guestId = anonymousUser.user.id;

        await Promise.allSettled([
          shoppingService.cart.merge(userId, guestId),
          shoppingService.wishlist.merge(userId, guestId),
        ]);
      },
    }),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => {
        console.log(`Sending OTP code ${code} to ${phoneNumber}`);

        // Implement sending OTP code via SMS
        throw new Error('Not implemented');
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
      domain: config.appDomain,
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
        type: 'string',
      },
      birthDate: {
        type: 'string',
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
    },
  },
});

export { auth };
export type BetterAuth = typeof auth;
