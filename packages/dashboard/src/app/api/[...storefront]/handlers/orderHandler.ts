import {
  addressService,
  discountService,
  orderService,
  paymentService,
  shoppingService,
} from '@/services';
import type { CreateOrderRequest, CreateOrderResponse, ListOrdersResponse } from '@resala/shared';
import type { Context } from 'hono';
import type { HandlerResponse } from 'hono/types';

import type { Env } from '../route';

type HonoCtx = Context<Env>;

export const checkout = async (c: HonoCtx): Promise<HandlerResponse<CreateOrderResponse>> => {
  const userId = c.var.user?.id as number;
  const { paymentMethod, addressId, note } = (await c.req.json()) as CreateOrderRequest['body'];

  const userCart = await shoppingService.cart.get(userId);

  const discountedUserCart = await discountService.applyDiscount(userCart);

  const address = await addressService.find(userId, addressId);

  const {
    items: _,
    shipping,
    ...order
  } = await orderService.create({ userId, paymentMethod, note }, discountedUserCart, address);

  let payment;
  if (paymentMethod === 'CARD') {
    payment = await paymentService.checkout({
      user: {
        id: userId,
        email: '',
        phone: address.phone,
        firstName: address.firstName,
        lastName: address.lastName,
      } as never,
      order: { shipping, ...order },
      cart: discountedUserCart,
      shipping: address,
    });
  }

  return c.json({ success: true, data: payment });
};

export const listUserOrders = async (c: HonoCtx): Promise<HandlerResponse<ListOrdersResponse>> => {
  const userId = c.var.user?.id as number;
  const page = +(c.req.query('page') || '1');
  const limit = +(c.req.query('limit') || '10');
  const search = c.req.query('search') || '';

  const { orders, pagination } = await orderService.list({ page, limit, search, userId });

  return c.json({ success: true, data: { orders, pagination } });
};
