import dotenv from 'dotenv';
import { createServer } from 'http';

import { createExpressApp } from './app.js';
import { initDb } from './datastore/index.js';

dotenv.config();

(async () => {
  await initDb();

  const app = createExpressApp();

  const httpServer = createServer(app);

  const { PORT, NODE_ENV } = process.env;

  httpServer.listen(+PORT, () => {
    console.log(`server is running on ${NODE_ENV} mode on http://localhost:${PORT}`);
  });
})();

process.on('unhandledRejection', reason => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  process.exit(1);
});

process.on('uncaughtException', reason => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...', reason);
  process.exit(1);
});
