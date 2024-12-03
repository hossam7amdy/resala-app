import { addressService } from '@/services';
import type {
  CreateAddressRequest,
  CreateAddressResponse,
  DeleteAddressResponse,
  ListAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
} from '@resala/shared';
import type { HandlerResponse } from 'hono/types';

import type { HonoCtx } from '../types';

export const listUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<ListAddressResponse>> => {
  const userId = Number(c.var.user?.id);

  const addresses = await addressService.list(userId);

  return c.json({ data: addresses });
};

export const createUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<CreateAddressResponse>> => {
  const userId = Number(c.var.user?.id);
  const body = (await c.req.json()) as CreateAddressRequest['body'];

  const address = await addressService.create({ ...body, userId });

  return c.json({ success: true, data: address });
};

export const updateUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<UpdateAddressResponse>> => {
  const userId = Number(c.var.user?.id);
  const addressId = Number(c.req.param('addressId'));
  const body = (await c.req.json()) as UpdateAddressRequest['body'];

  const address = await addressService.update(addressId, { ...body, userId });

  return c.json({ success: true, data: address });
};

export const deleteUserAddress = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteAddressResponse>> => {
  const userId = Number(c.var.user?.id);
  const addressId = Number(c.req.param('addressId'));

  const address = await addressService.delete(addressId, userId);

  return c.json({ success: true, data: address });
};
