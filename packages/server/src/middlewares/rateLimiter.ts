import { rateLimit } from 'express-rate-limit';

export const limiter = (window: number = 10, limit: number = 10) =>
  rateLimit({
    windowMs: window * 60 * 1000, // 15 minutes
    limit: limit, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
