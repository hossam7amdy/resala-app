import morgan from 'morgan';

import { logger } from '../logger/index.js';

/** logging incoming requests */
export const apiRequestLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream: { write: message => logger.info(message.trim()) },
  }
);
