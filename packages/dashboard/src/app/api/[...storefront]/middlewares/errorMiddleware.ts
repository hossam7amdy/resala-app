import { APIError } from '@/exceptions';
import { formatPrismaError } from '@/utils/prismaErrors';
import { formatZodError } from '@/utils/zodErrors';
import { Prisma } from '@prisma/client';
import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError } from 'zod';

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
  } else if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: formatZodError(error),
    });
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { code, message } = formatPrismaError(error);

    return res.status(code).json({
      success: false,
      message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Unexpected error occurred, please try again.',
  });
};
