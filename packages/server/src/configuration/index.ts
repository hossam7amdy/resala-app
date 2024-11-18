import dotenv from 'dotenv';
import { z } from 'zod';

const _parseNodeEnv = z.enum(['development', 'production', 'test']).parse;

const _parseBoolean = (envVar: string | undefined, defaultValue: boolean): boolean => {
  return envVar && envVar.toLowerCase() === 'true' ? true : defaultValue;
};

dotenv.config({ path: `.env.${_parseNodeEnv(process.env.NODE_ENV)}` });

const configuration = {
  aws: {
    accessKey: z.string().parse(process.env.AWS_ACCESS_KEY),
    accessSecret: z.string().parse(process.env.AWS_ACCESS_SECRET),
    region: z.string().default('eu-north-1').parse(process.env.AWS_REGION),
    ses: {
      endpoint: z.string().url().optional().parse(process.env.SES_ENDPOINT),
      verifiedIdentity: z
        .string()
        .default('Resala store<no-reply@resala.live>')
        .parse(process.env.SES_VERIFIED_ID),
    },
    s3: {
      bucketName: z.string().default('resala-files').parse(process.env.S3_BUCKET),
      baseUrl: z.string().url('cdn.resala.live').parse(process.env.S3_BASE_URL),
      endpoint: z.string().url().optional().parse(process.env.S3_ENDPOINT),
      forcePathStyle: z.boolean().parse(_parseBoolean(process.env.S3_FORCE_PATH_STYLE, false)),
    },
    auth: {
      userPoolId: z.string().parse(process.env.COGNITO_USER_POOL_ID),
      clientId: z.string().parse(process.env.COGNITO_USER_POOL_CLIENT_ID),
    },
  },
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

  db: {
    url: z.string().url().parse(process.env.DATABASE_URL),
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
};

type Configuration = typeof configuration;
export { configuration, type Configuration };
