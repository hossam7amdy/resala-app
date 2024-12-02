import { ValidationError } from '@/exceptions';
import { formatZodError } from '@/utils/zodErrors';
import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodError } from 'zod';

/**
 *  Validate the request body, query, and params against the schema
 *
 * @param schema - The ZodSchema to validate against
 * @returns A middleware function that validates the request
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const { body, query, params } = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Assign the validated values to the request object
      req.body = body;
      req.query = query;
      req.params = params;

      next();
    } catch (error) {
      next(new ValidationError(formatZodError(error as ZodError)));
    }
  };
};
