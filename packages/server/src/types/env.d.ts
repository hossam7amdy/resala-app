declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      APP_URL: string;

      JWT_SECRET: string;
      JWT_REFRESH: string;
      JWT_RESET: string;
      JWT_VERIFY: string;

      DATABASE_URL: string;

      MAIL_USER: string;
      MAIL_PASS: string;

      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_PHONE_NUMBER: string;

      PAYMOB_INTEGRATION_ID: string;
      PAYMOB_API_URL: string;
      PAYMOB_HMAC_KEY: string;
      PAYMOB_API_TOKEN: string;

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
