import { User } from '@prisma/client';
import { DefaultResponseBody } from '@resala/shared';
import { RequestHandler } from 'express';

// Local User Interface
export interface LocalUser {
  user: Pick<
    User,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'isVerified'
    | 'phone'
    | 'role'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
  >;
}

// Express Types
export type ExpressHandler<
  ReqBody = undefined,
  ResBody = DefaultResponseBody,
  ReqQuery = undefined,
  Locals extends Record<string, any> = {},
> = RequestHandler<{}, ResBody, ReqBody, ReqQuery, Locals>;

export type ExpressHandlerWithParams<
  ReqParams,
  ReqBody = undefined,
  ResBody = DefaultResponseBody,
  ReqQuery = undefined,
  Locals extends Record<string, any> = {},
> = RequestHandler<ReqParams, ResBody, ReqBody, ReqQuery, Locals>;
