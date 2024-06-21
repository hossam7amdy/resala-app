import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { MulterError } from 'multer';

import { logger } from '../lib/index.js';
import { APPError } from '../utils/ApiErrors.js';

/**
 * @description catch errors from async functions
 * @param {RequestHandler} fn - async function
 * @returns {RequestHandler} - function that catches errors
 */
export const errHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

/** @description error middleware */
// eslint-disable-next-line no-unused-vars
export const errMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof APPError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof MulterError) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  logger.error(error);
  return res.status(500).json({
    success: false,
    message: 'Oops, an unexpected error occurred, please try again.',
  });
};
