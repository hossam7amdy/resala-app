import dotenv from 'dotenv';
import { createServer } from 'http';

import { createExpressApp } from './app.js';

dotenv.config();

const app = createExpressApp();

const server = createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT} 🚀`);
});

process.on('unhandledRejection', reason => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...', reason);
  process.exit(1);
});

process.on('uncaughtException', reason => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...', reason);
  process.exit(1);
});
