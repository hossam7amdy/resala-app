import { Prisma } from '@prisma/client';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MulterError } from 'multer';
import { ValidateError } from 'tsoa/dist/index.js';
import { ZodError } from 'zod';

import { APIError } from '../errors/api.errors.js';
import { logger } from '../lib/logger.js';
import { formatPrismaError } from '../utils/prismaErrors.js';
import { formatZodError } from '../utils/zodErrors.js';

/**
 * @description catch errors from async functions
 * @param {RequestHandler} fn - async function
 * @returns {RequestHandler} - function that catches errors
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};

/** @description error middleware */
export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof ValidateError) {
    return res.status(422).json({
      success: false,
      message: error.message,
      details: error.fields,
    });
  } else if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: formatZodError(error),
    });
  } else if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: `Token expired at ${error.expiredAt}`,
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof MulterError) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { code, message } = formatPrismaError(error);

    return res.status(code).json({
      success: false,
      message,
    });
  }

  logger.error(error);
  return res.status(500).json({
    success: false,
    message: 'Unexpected error occurred, please try again.',
  });
};
