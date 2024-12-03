import { z } from 'zod';

const _parseNodeEnv = z.enum(['development', 'production', 'test']).parse;

const _parseBoolean = (envVar: string | undefined, defaultValue: boolean): boolean => {
  return envVar && envVar.toLowerCase() === 'true' ? true : defaultValue;
};

const configuration = () => ({
  aws: {
    region: z.string().parse(process.env.AWS_REGION),
    accessKey: z.string().parse(process.env.AWS_ACCESS),
    accessSecret: z.string().parse(process.env.AWS_SECRET),
    ses: {
      endpoint: z.string().url().optional().parse(process.env.SES_ENDPOINT),
      verifiedIdentity: z.string().parse(process.env.SES_VERIFIED_ID),
    },
    s3: {
      bucketName: z.string().parse(process.env.S3_BUCKET),
      baseUrl: z.string().url().parse(process.env.S3_BASE_URL),
      endpoint: z.string().url().optional().parse(process.env.S3_ENDPOINT),
      forcePathStyle: z
        .boolean()
        .optional()
        .parse(_parseBoolean(process.env.S3_FORCE_PATH_STYLE, false)),
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
    redirectionUrl: z.string().url().parse(process.env.PAYMENT_REDIRECTION_URL),
    notificationUrl: z.string().url().parse(process.env.PAYMENT_NOTIFICATION_URL),
    paymob: {
      integrationId: z.coerce.number().parse(process.env.PAYMOB_INTEGRATION_ID),
      baseUrl: z
        .string()
        .url()
        .default('https://accept.paymob.com')
        .parse(process.env.PAYMOB_BASE_URL),
      hmacKey: z.string().parse(process.env.PAYMOB_HMAC_KEY),
      apiToken: z.string().parse(process.env.PAYMOB_API_TOKEN),
      publicKey: z.string().parse(process.env.PAYMOB_PUBLIC_KEY),
      secretKey: z.string().parse(process.env.PAYMOB_SECRET_KEY),
    },
  },
  auth: {
    google: {
      clientId: z.string().parse(process.env.GOOGLE_CLIENT_ID),
      clientSecret: z.string().parse(process.env.GOOGLE_CLIENT_SECRET),
    },
  },
});

type Configuration = ReturnType<typeof configuration>;
export { configuration, type Configuration };
