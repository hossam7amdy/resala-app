import { rateLimit } from 'express-rate-limit';

import { RateLimitError } from '../errors/api.errors.js';

export const limiter = (window: number = 15, limit: number = 100) =>
  rateLimit({
    windowMs: window * 60 * 1000, // 15 minutes
    limit: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (_req, _res, _next, options) => {
      throw new RateLimitError(options.message);
    },
  });
