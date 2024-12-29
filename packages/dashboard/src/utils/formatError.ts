import { APIError } from '@/exceptions';
import { formatPrismaError } from '@/utils/prismaErrors';
import { formatZodError } from '@/utils/zodErrors';
import { Prisma } from '@prisma/client';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

type FormattedError = {
  error: {
    message: string;
  };
};
const formatError = (error: unknown): FormattedError => {
  if (error instanceof HTTPException) {
    return {
      error: {
        message: error.message,
      },
    };
  } else if (error instanceof APIError) {
    return {
      error: {
        message: error.message,
      },
    };
  } else if (error instanceof ZodError) {
    return {
      error: {
        message: formatZodError(error)?.at(0) ?? 'Validation error occurred.',
      },
    };
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      error: {
        message: formatPrismaError(error).message,
      },
    };
  }

  return {
    error: {
      message: 'Unexpected error occurred, please try again.',
    },
  };
};

export { formatError };
