import { addressService } from '@/services';
import type {
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressResponse,
  ListAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
} from '@resala/shared';
import type { Context } from 'hono';
import type { HandlerResponse } from 'hono/types';

import type { Env } from '../route';

type HonoCtx = Context<Env>;

export const listUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<ListAddressResponse>> => {
  const userId = c.var.userId as string;

  const addresses = await addressService.list(userId);

  return c.json({ data: addresses });
};

export const createUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<CreateAddressResponse>> => {
  const userId = c.var.userId as string;
  const body = (await c.req.json()) as CreateAddressRequest['body'];

  const address = await addressService.create({ ...body, userId });

  return c.json({ success: true, data: address });
};

export const updateUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<UpdateAddressResponse>> => {
  const userId = c.var.userId as string;
  const addressId = c.req.query('addressId') as string;
  const body = (await c.req.json()) as UpdateAddressRequest['body'];

  const address = await addressService.update(+addressId, { ...body, userId });

  return c.json({ success: true, data: address });
};

export const deleteUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteAddressResponse>> => {
  const userId = c.var.userId as string;
  const addressId = c.req.query('addressId') as string;

  const address = await addressService.delete(+addressId, userId);

  return c.json({ success: true, data: address });
};
