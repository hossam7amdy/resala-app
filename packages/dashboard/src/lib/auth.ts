import { configuration } from '@/configuration';
import { emailService } from '@/services';
import { betterAuth } from 'better-auth';
import { admin, anonymous, openAPI, phoneNumber } from 'better-auth/plugins';
import { isPossiblePhoneNumber } from 'libphonenumber-js';
import { Pool } from 'pg';
import { v4 as uuid } from 'uuid';

export const auth = betterAuth({
  database: new Pool({
    connectionString: configuration.db.url,
  }),
  emailAndPassword: {
    enabled: true,
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
      clientId: configuration.auth.google.clientId,
      clientSecret: configuration.auth.google.clientSecret,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [
    admin(),
    openAPI(),
    anonymous({
      emailDomainName: 'resala.dev',
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        // perform actions like moving the cart items from anonymous user to the new user
      },
    }),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, request) => {
        // Implement sending OTP code via SMS
        throw new Error('Not implemented');
      },
      phoneNumberValidator: phoneNumber => {
        const isValid = isPossiblePhoneNumber(phoneNumber);
        return isValid ? Promise.resolve(true) : Promise.reject(false);
      },
    }),
  ],
  advanced: {
    generateId: () => uuid(),
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
