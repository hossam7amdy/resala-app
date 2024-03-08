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
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  AZURE_STORAGE_NAME: process.env.AZURE_STORAGE_NAME,
  AZURE_CDN_ENDPOINT: process.env.AZURE_CDN_ENDPOINT,
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

export default ENV;
