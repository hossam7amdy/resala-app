import { createServer } from 'http';

import { createExpressApp } from './app';
import { ENV } from './config/env';

const app = createExpressApp();

const server = createServer(app);

server.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});

process.on('unhandledRejection', reason => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  process.exit(1);
});

process.on('uncaughtException', reason => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...', reason);
  process.exit(1);
});
