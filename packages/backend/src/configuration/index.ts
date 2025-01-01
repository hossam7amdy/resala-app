import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_DOMAIN: z.string(),
  CDN_BASE_URL: z.string().url(),
  TRUSTED_ORIGINS: z
    .string()
    .transform(o => JSON.parse(o))
    .pipe(z.array(z.string().url())),
  AWS_REGION: z.string(),
  AWS_ACCESS: z.string(),
  AWS_SECRET: z.string(),
  SES_ENDPOINT: z.string().url().optional(),
  SES_VERIFIED_ID: z.string(),
  S3_BUCKET: z.string(),
  S3_ENDPOINT: z.string().url().optional(),
  S3_DEFAULT_EXPIRATION_IN_SEC: z.coerce.number().min(1).max(60),
  S3_FORCE_PATH_STYLE: z.coerce.boolean().default(false),
  DATABASE_URL: z.string().url(),
  PAYMENT_REDIRECTION_URL: z.string().url(),
  PAYMENT_NOTIFICATION_URL: z.string().url(),
  PAYMOB_INTEGRATION_ID: z.coerce.number(),
  PAYMOB_BASE_URL: z.string().url().default('https://accept.paymob.com'),
  PAYMOB_HMAC_KEY: z.string(),
  PAYMOB_API_TOKEN: z.string(),
  PAYMOB_PUBLIC_KEY: z.string(),
  PAYMOB_SECRET_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const configuration = () => {
  const parsedEnv = EnvSchema.parse(process.env);

  return {
    env: parsedEnv.NODE_ENV,
    appDomain: parsedEnv.APP_DOMAIN,
    cdnBaseUrl: parsedEnv.CDN_BASE_URL,
    trustedOrigins: parsedEnv.TRUSTED_ORIGINS,
    aws: {
      region: parsedEnv.AWS_REGION,
      accessKey: parsedEnv.AWS_ACCESS,
      accessSecret: parsedEnv.AWS_SECRET,
      ses: {
        endpoint: parsedEnv.SES_ENDPOINT,
        verifiedIdentity: parsedEnv.SES_VERIFIED_ID,
      },
      s3: {
        bucketName: parsedEnv.S3_BUCKET,
        endpoint: parsedEnv.S3_ENDPOINT,
        defaultExpirationInSec: parsedEnv.S3_DEFAULT_EXPIRATION_IN_SEC,
        forcePathStyle: parsedEnv.S3_FORCE_PATH_STYLE,
      },
    },
    db: {
      url: parsedEnv.DATABASE_URL,
    },
    payment: {
      redirectionUrl: parsedEnv.PAYMENT_REDIRECTION_URL,
      notificationUrl: parsedEnv.PAYMENT_NOTIFICATION_URL,
      paymob: {
        integrationId: parsedEnv.PAYMOB_INTEGRATION_ID,
        baseUrl: parsedEnv.PAYMOB_BASE_URL,
        hmacKey: parsedEnv.PAYMOB_HMAC_KEY,
        apiToken: parsedEnv.PAYMOB_API_TOKEN,
        publicKey: parsedEnv.PAYMOB_PUBLIC_KEY,
        secretKey: parsedEnv.PAYMOB_SECRET_KEY,
      },
    },
    auth: {
      google: {
        clientId: parsedEnv.GOOGLE_CLIENT_ID,
        clientSecret: parsedEnv.GOOGLE_CLIENT_SECRET,
      },
    },
  };
};

type Configuration = ReturnType<typeof configuration>;
export { configuration, type Configuration };
