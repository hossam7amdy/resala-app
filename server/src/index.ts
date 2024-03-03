import { createServer } from 'http';

import app from './app';
import ENV from './env';
import { logger } from './lib/logger';

const server = createServer(app);

server.listen(ENV.PORT, () => {
  logger.info(`Server running on port ${ENV.PORT}`);
});

process.on('unhandledRejection', err => {
  logger.error(err);
  process.exit(1);
});

process.on('uncaughtException', err => {
  logger.error(err);
  process.exit(1);
});
