/* eslint-disable no-console */
import { config } from 'dotenv';
import { createServer } from 'http';

import { createExpressApp } from './app.js';
import { checkConfigurations, configuration } from './configuration/index.js';
import { initDb } from './datastore/index.js';

config({ path: process.env.DOTENV_CONFIG_PATH });
checkConfigurations(configuration, 'configuration');

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
