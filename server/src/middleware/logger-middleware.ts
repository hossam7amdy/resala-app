import { RequestHandler } from 'express';

import { logger } from '../lib/logger/index.js';

/** logging incoming requests */
export const loggerMiddleware: RequestHandler = (req, _, next) => {
  logger.info(
    JSON.stringify({
      method: req.method,
      path: req.path,
      body: Object.keys(req.body).length ? req.body : undefined,
      query: Object.keys(req.query).length ? req.query : undefined,
    })
  );

  return next();
};
