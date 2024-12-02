import { configuration } from '@/configuration';
import { emailService, shoppingService } from '@/services';
import { betterAuth } from 'better-auth';
import { admin, anonymous, openAPI, phoneNumber } from 'better-auth/plugins';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Pool } from 'pg';

const config = configuration();

const auth = betterAuth({
  database: new Pool({
    connectionString: config.db.url,
  }),
  trustedOrigins: config.origin.allowedList,
  databaseHooks: {
    user: {
      create: {
        before: async user => {
          return {
            data: {
              ...user,
              firstName: user.name.split(' ')[0],
              lastName: user.name.split(' ')[1] || '',
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
        const userId = Number(newUser.user.id);
        const guestId = Number(anonymousUser.user.id);

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
  },
  user: {
    fields: {
      emailVerified: 'is_email_verified',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      isAnonymous: {
        type: 'boolean',
        fieldName: 'is_anonymous',
      },
      role: {
        type: 'string',
        input: false,
      },
      phoneNumber: {
        fieldName: 'phone',
        type: 'string',
      },
      phoneNumberVerified: {
        fieldName: 'is_phone_verified',
        type: 'boolean',
      },
      emailMarketingState: {
        type: 'string',
        fieldName: 'email_marketing_state',
      },
      isPhoneVerified: {
        type: 'string',
        fieldName: 'is_phone_verified',
      },
      smsMarketingState: {
        type: 'string',
        fieldName: 'sms_marketing_state',
      },
      firstName: {
        type: 'string',
        fieldName: 'first_name',
      },
      lastName: {
        type: 'string',
        fieldName: 'last_name',
      },
      lang: {
        type: 'string',
      },
      banReason: {
        type: 'string',
        fieldName: 'ban_reason',
      },
      banExpires: {
        type: 'string',
        fieldName: 'ban_expires',
      },
      birthDate: {
        type: 'string',
        fieldName: 'birth_date',
      },
    },
  },
  session: {
    fields: {
      userId: 'user_id',
      expiresAt: 'expires_at',
      ipAddress: 'ip_address',
      userAgent: 'user_agent',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      impersonatedBy: {
        type: 'string',
        fieldName: 'impersonated_by',
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
    fields: {
      userId: 'user_id',
      idToken: 'id_token',
      accountId: 'account_id',
      providerId: 'provider_id',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      accessTokenExpiresAt: 'access_token_expires_at',
      refreshTokenExpiresAt: 'refresh_token_expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
  verification: {
    fields: {
      expiresAt: 'expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
});

export { auth };
export type BetterAuth = typeof auth;
