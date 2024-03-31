import env from 'dotenv';

env.config();

const ENV = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_RESET: process.env.JWT_RESET,
  JWT_VERIFY: process.env.JWT_VERIFY,

  DATABASE_URL: process.env.DATABASE_URL,

  AZURE_STORAGE_NAME: process.env.AZURE_STORAGE_NAME,
  AZURE_CDN_ENDPOINT: process.env.AZURE_CDN_ENDPOINT,

  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

  PAYMOB_API_URL: process.env.PAYMOB_API_URL,
  PAYMOB_HMAC_KEY: process.env.PAYMOB_HMAC_KEY,
  PAYMOB_API_TOKEN: process.env.PAYMOB_API_TOKEN,
  PAYMOB_INTEGRATION_ID: process.env.PAYMOB_INTEGRATION_ID,
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
  }
})();

export { ENV };
