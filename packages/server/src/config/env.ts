import env from 'dotenv';

env.config();

const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_RESET: process.env.JWT_RESET,
  JWT_VERIFY: process.env.JWT_VERIFY,

  DATABASE_URL: process.env.DATABASE_URL,

  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

  PAYMOB_API_URL: process.env.PAYMOB_API_URL,
  PAYMOB_HMAC_KEY: process.env.PAYMOB_HMAC_KEY,
  PAYMOB_API_TOKEN: process.env.PAYMOB_API_TOKEN,
  PAYMOB_INTEGRATION_ID: process.env.PAYMOB_INTEGRATION_ID,

  S3_REGION: process.env.S3_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_BASE_URL: process.env.S3_BASE_URL,
};

(() => {
  const missedEnv: string[] = [];

  Object.entries(ENV).forEach(([key, value]) => {
    if (!value) {
      missedEnv.push(key);
    }
  });

  if (missedEnv.length > 0) {
    console.error(`Missed environment variables: [${missedEnv.join(', ')}]`);
    process.exit(1);
  }
})();

export { ENV };
