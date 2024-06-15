import type { RequestHandler } from 'express';

import { logger } from '../lib/logger/index.js';

/** logging incoming requests */
export const loggerMiddleware: RequestHandler = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    logger.info(
      JSON.stringify({
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime: `${elapsedTimeInMs.toFixed(3)}ms`,
        body: Object.keys(req.body).length ? req.body : undefined,
        query: Object.keys(req.query).length ? req.query : undefined,
      })
    );
  });

  return next();
};
