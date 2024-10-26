import { ENDPOINT_CONFIGS } from '@resala/shared';
import dotenv from 'dotenv';
import { z } from 'zod';

const _parseNodeEnv = z.enum(['development', 'production', 'test']).parse;

const _parseBoolean = (envVar: string | undefined, defaultValue: boolean): boolean => {
  return envVar && envVar.toLowerCase() === 'true' ? true : defaultValue;
};

dotenv.config({ path: `.env.${_parseNodeEnv(process.env.NODE_ENV)}` });

const configuration = {
  origin: {
    web: z.string().url().parse(process.env.WEB_URL),
    dashboard: z.string().url().parse(process.env.DASHBOARD_URL),
    allowedList: z
      .array(z.string().url())
      .parse(JSON.parse(process.env.ORIGIN_ALLOWED_LIST || '[]')),
  },
  server: {
    env: _parseNodeEnv(process.env.NODE_ENV),
    port: z.coerce.number().default(5000).parse(process.env.PORT),
    url: z.string().url().parse(process.env.SERVER_URL),
  },
  jwt: {
    secret: z.string().parse(process.env.JWT_SECRET),
    refresh: z.string().parse(process.env.JWT_REFRESH),
    reset: z.string().parse(process.env.JWT_RESET),
    verify: z.string().parse(process.env.JWT_VERIFY),
  },
  db: {
    url: z.string().url().parse(process.env.DATABASE_URL),
  },
  email: {
    user: z.string().email().parse(process.env.MAIL_USER),
    pass: z.string().parse(process.env.MAIL_PASS),
  },
  payment: {
    paymob: {
      integrationId: z.coerce.number().parse(process.env.PAYMOB_INTEGRATION_ID),
      baseUrl: z
        .string()
        .url()
        .default('https://accept.paymob.com')
        .parse(process.env.PAYMOB_BASE_URL),
      checkoutLink: `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}`,
      hmacKey: z.string().parse(process.env.PAYMOB_HMAC_KEY),
      apiToken: z.string().parse(process.env.PAYMOB_API_TOKEN),
      publicKey: z.string().parse(process.env.PAYMOB_PUBLIC_KEY),
      secretKey: z.string().parse(process.env.PAYMOB_SECRET_KEY),
    },
  },

  blobStorage: {
    accessKey: z.string().parse(process.env.AWS_ACCESS_KEY_ID),
    accessSecret: z.string().parse(process.env.AWS_SECRET_ACCESS_KEY),
    region: z.string().default('eu-north-1').parse(process.env.S3_REGION),
    bucketName: z.string().default('resala-bucket').parse(process.env.S3_BUCKET),
    baseUrl: z.string().url().parse(process.env.S3_BASE_URL),
    endpoint: z.string().url().optional().parse(process.env.S3_ENDPOINT), // only used for minio
    forcePathStyle: z.boolean().parse(_parseBoolean(process.env.S3_FORCE_PATH_STYLE, false)),
  },
  auth: {
    google: {
      clientId: z.string().parse(process.env.GOOGLE_CLIENT_ID),
      clientSecret: z.string().parse(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: `${process.env.SERVER_URL}${ENDPOINT_CONFIGS.loginWithGoogle.url}/callback`,
    },
  },
};

type Configuration = typeof configuration;
export { configuration, type Configuration };
