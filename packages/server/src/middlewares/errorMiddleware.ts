import { Prisma } from '@prisma/client';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { MulterError } from 'multer';

import { APPError } from '../errors/api.errors.js';
import { logger } from '../logger/index.js';

/**
 * @description catch errors from async functions
 * @param {RequestHandler} fn - async function
 * @returns {RequestHandler} - function that catches errors
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

/** @description error middleware */
export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction
) => {
  if (error instanceof APPError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof MulterError) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res
          .status(400)
          .json({ success: false, message: `Duplicate field value: ${error?.meta?.target}` });
      case 'P2014':
        return res
          .status(400)
          .json({ success: false, message: `Invalid ID: ${error?.meta?.target}` });
      case 'P2003':
        return res
          .status(400)
          .json({ success: false, message: `Invalid input data: ${error?.meta?.target}` });
      case 'P2025':
        return res.status(404).json({ success: false, message: error.message });
      default:
        return res
          .status(400)
          .json({ success: false, message: `Something went wrong: ${error.message}` });
    }
  }

  logger.error(error);
  return res.status(500).json({
    success: false,
    message: 'Unexpected error occurred, please try again.',
  });
};
