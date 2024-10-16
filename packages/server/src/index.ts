/* eslint-disable no-console */
import dotenv from 'dotenv';
import { createServer } from 'http';

import { createExpressApp } from './app.js';
import { configuration } from './configuration/index.js';
import { initDb } from './datastore/index.js';

dotenv.config();

(async () => {
  await initDb();
  console.log('Database connected 🚀');

  const app = createExpressApp();

  const httpServer = createServer(app);

  const { port, env } = configuration.server;

  httpServer.listen(port, () => {
    console.log(`server is running on ${env} mode on http://localhost:${port} 🚀`);
  });
})();

process.on('unhandledRejection', reason => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  process.exit(1);
});

process.on('uncaughtException', reason => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', reason);
  process.exit(1);
});
