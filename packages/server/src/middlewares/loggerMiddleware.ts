import type { Request } from 'express';
import morgan from 'morgan';

import { logger } from '../lib/logger/index.js';

morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body);
});

/** logging incoming requests */
export const loggerMiddleware = morgan(
  ':method :url :status :response-time ms - :res[content-length] - :body',
  {
    stream: { write: message => logger.info(message.trim()) },
  }
);
