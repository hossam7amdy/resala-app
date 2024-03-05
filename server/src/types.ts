import { RequestHandler } from 'express';

export type ExpressHandler<Req, Res> = RequestHandler<string, Res, Req, any>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Res,
  Req,
  any
>;
