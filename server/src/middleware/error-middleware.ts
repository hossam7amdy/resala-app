import { NextFunction, Request, RequestHandler, Response } from 'express';

import { HTTPError } from '../lib/error';
import { logger } from '../lib/logger';

/**
 * @description catch errors from async functions
 * @param {RequestHandler} fn - async function
 * @returns {RequestHandler} - function that catches errors
 */
export function errHandler(fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

/**
 * @description error middleware
 */
export function errMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof HTTPError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  logger.error(error);
  return res.status(500).json({
    success: false,
    message: 'Oops, an unexpected error occurred, please try again.',
  });
}
