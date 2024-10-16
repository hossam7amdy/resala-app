declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      SERVER_URL: string;
      WEB_APP_URL: string;
      ADMIN_DASHBOARD_URL: string;

      JWT_SECRET: string;
      JWT_REFRESH: string;
      JWT_RESET: string;
      JWT_VERIFY: string;

      DATABASE_URL: string;

      MAIL_USER: string;
      MAIL_PASS: string;

      PAYMOB_INTEGRATION_ID: string;
      PAYMOB_API_URL: string;
      PAYMOB_HMAC_KEY: string;
      PAYMOB_API_TOKEN: string;
      PAYMOB_PUBLIC_KEY: string;
      PAYMOB_SECRET_KEY: string;

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      S3_REGION: string;
      S3_BUCKET: string;
      S3_BASE_URL: string;
      S3_ENDPOINT?: string;
    }
  }
}

export {};
