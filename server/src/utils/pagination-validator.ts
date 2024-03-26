import { PaginationSchema } from '@resala/shared';
import { ZodError } from 'zod';

import { Pagination } from '../types';
import { BadRequestError } from './api-errors';
import { formatZodError } from './zod-errors';

export const paginationValidator = (pagination: Pagination) => {
  try {
    return PaginationSchema.parse(pagination);
  } catch (error) {
    throw new BadRequestError(formatZodError(error as ZodError));
  }
};
