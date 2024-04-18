import { createServer } from 'http';

import { createExpressApp } from './app.js';
import { ENV } from './config/env.js';

const app = createExpressApp();

const server = createServer(app);

const PORT = ENV.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on ${ENV.NODE_ENV} mode on port ${PORT} 🚀`);
});

process.on('unhandledRejection', reason => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  process.exit(1);
});

process.on('uncaughtException', reason => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...', reason);
  process.exit(1);
});
