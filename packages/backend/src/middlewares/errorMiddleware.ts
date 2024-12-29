import { APIError } from '@/exceptions';
import { formatPrismaError } from '@/utils/prismaErrors';
import { formatZodError } from '@/utils/zodErrors';
import { Prisma } from '@prisma/client';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

export const errorHandler = async (c: Context) => {
  const error = c.error;

  if (error instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: error.message,
        cause: error.cause,
      },
      error.status
    );
  } else if (error instanceof APIError) {
    return c.json(
      {
        success: false,
        message: error.message,
      },
      error.statusCode
    );
  } else if (error instanceof ZodError) {
    return c.json(
      {
        success: false,
        message: formatZodError(error),
      },
      422
    );
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const { code, message } = formatPrismaError(error);
    return c.json(
      {
        success: false,
        message,
      },
      code as ResponseInit
    );
  }

  return c.json(
    {
      success: false,
      message: 'Unexpected error occurred, please try again.',
    },
    500
  );
};
