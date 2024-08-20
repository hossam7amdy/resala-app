import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';

import { createExpressApp } from './app.js';
import { initDb } from './datastore/index.js';

dotenv.config();

(async () => {
  await initDb();

  const app = createExpressApp();

  const options = {
    key: readFileSync(process.env.SSL_KEY_PATH!),
    cert: readFileSync(process.env.SSL_CERT_PATH!),
  };

  const httpServer = createHttpServer(app);
  const httpsServer = createHttpsServer(options, app);

  const { PORT, NODE_ENV } = process.env;

  httpServer.listen(+PORT ?? 80);
  httpsServer.listen(+PORT + 1 ?? 443);

  console.log(`HTTP server is running on ${NODE_ENV} mode on http://localhost:${PORT}`);
  console.log(`HTTPS server is running on ${NODE_ENV} mode on https://localhost:${+PORT + 1}`);
})();

process.on('unhandledRejection', reason => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  process.exit(1);
});

process.on('uncaughtException', reason => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...', reason);
  process.exit(1);
});
