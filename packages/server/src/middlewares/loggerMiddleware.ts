import morgan from 'morgan';

import { logger } from '../lib/index.js';

/** logging incoming requests */
export const loggerMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: { write: message => logger.info(message.trim()) },
  }
);
