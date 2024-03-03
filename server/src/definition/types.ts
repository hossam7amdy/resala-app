import { $Enums } from '@prisma/client';
import { Request, Response } from '@resala/shared';
import { RequestHandler } from 'express';

export type ExpressHandler<Req, Res> = RequestHandler<string, Response<Res>, Request<Req>, any>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Response<Res>,
  Request<Req>,
  any
>;

export type ROLES = $Enums.Role;
