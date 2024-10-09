import { ENDPOINT_CONFIGS } from '@resala/shared';
import { config } from 'dotenv';

config({ path: process.env.DOTENV_CONFIG_PATH });

const _parseInt = (envVar: string | undefined, defaultValue: number): number => {
  return envVar && parseInt(envVar) ? parseInt(envVar) : defaultValue;
};

const _parseBoolean = (envVar: string | undefined, defaultValue: boolean): boolean => {
  return envVar && envVar.toLowerCase() === 'true' ? true : defaultValue;
};

const configuration = {
  origin: {
    web: process.env.WEB_URL || 'http://localhost:4200',
    dashboard: process.env.DASHBOARD_URL || 'http://localhost:3000',
    allowedList: JSON.parse(process.env.ORIGIN_ALLOWED_LIST || '[]'),
  },
  server: {
    env: process.env.NODE_ENV || 'development',
    port: _parseInt(process.env.PORT, 5000),
    url: process.env.SERVER_URL || 'http://localhost:5000',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    refresh: process.env.JWT_REFRESH || 'refresh-secret',
    reset: process.env.JWT_RESET || 'reset-secret',
    verify: process.env.JWT_VERIFY || 'verify-secret',
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  email: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  payment: {
    paymob: {
      integrationId: _parseInt(process.env.PAYMOB_INTEGRATION_ID, 0),
      baseUrl: process.env.PAYMOB_BASE_URL || 'https://accept.paymob.com',
      checkoutLink: `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.PAYMOB_PUBLIC_KEY}`,
      hmacKey: process.env.PAYMOB_HMAC_KEY,
      apiToken: process.env.PAYMOB_API_TOKEN,
      publicKey: process.env.PAYMOB_PUBLIC_KEY,
      secretKey: process.env.PAYMOB_SECRET_KEY,
    },
  },
  blobStorage: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    accessSecret: process.env.AWS_SECRET_ACCESS_KEY,
    forcePathStyle: _parseBoolean(process.env.S3_FORCE_PATH_STYLE, false),
    region: process.env.S3_REGION || 'eu-north-1',
    bucketName: process.env.S3_BUCKET || 'resala-bucket',
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
    baseUrl: process.env.S3_BASE_URL || 'http://localhost:9000/resala-app',
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL ?? 'http://localhost:5000'}${ENDPOINT_CONFIGS.loginWithGoogle.url}/callback`,
    },
  },
};

/** Recursively loop through the configuration object and log warnings for missing environment variables */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _validateConfig = (config: { [key: string]: any }, path: string) => {
  for (const key in config) {
    if (typeof config[key] === 'object') {
      _validateConfig(config[key], `${path}.${key}`);
    } else if (config[key] === undefined) {
      console.warn(`Missing environment variable: ${path}.${key}`);
    }
  }
};

_validateConfig(configuration, 'configuration');

export type Configuration = typeof configuration;
export { configuration };
