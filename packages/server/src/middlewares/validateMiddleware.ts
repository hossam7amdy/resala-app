import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodError } from 'zod';

import { BadRequestError } from '../errors/api.errors.js';
import { formatZodError } from '../utils/zodErrors.js';

/**
 *  Validate the request body, query, and params against the schema
 *
 * @param schema - The ZodSchema to validate against
 * @returns A middleware function that validates the request
 */
export const validateMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const { body, query, params } = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Merge the validated data with the request object
      req.body = { ...req.body, ...body };
      req.query = { ...req.query, ...query };
      req.params = { ...req.params, ...params };

      next();
    } catch (error) {
      next(new BadRequestError(formatZodError(error as ZodError)));
    }
  };
};
