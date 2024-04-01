import zod from 'zod';

import { BadRequestError } from './api-errors';
import { formatZodError } from './zod-errors';

/**
 * validate payload against zod schema
 *
 * @param schema zod schema
 * @param payload data
 * @returns validated data
 * @throws { BadRequestError }
 */
export async function schemaValidator(schema: zod.ZodSchema, payload: any) {
  try {
    return schema.parseAsync(payload);
  } catch (error) {
    throw new BadRequestError(formatZodError(error as zod.ZodError));
  }
}
