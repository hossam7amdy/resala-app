import {
  addressService,
  discountService,
  orderService,
  paymentService,
  shoppingService,
} from '@/services';
import type { CreateOrderRequest, CreateOrderResponse, ListOrdersResponse } from '@resala/shared';
import type { HandlerResponse } from 'hono/types';

import type { HonoCtx } from '../types';

export const checkout = async (c: HonoCtx): Promise<HandlerResponse<CreateOrderResponse>> => {
  const userId = Number(c.var.user?.id);
  const email = String(c.var.user?.email);
  const { paymentMethod, addressId, note } = (await c.req.json()) as CreateOrderRequest['body'];

  const userCart = await shoppingService.cart.get(userId);
  const discountedUserCart = await discountService.applyDiscount(userCart);

  const address = await addressService.find(userId, addressId);

  const { id, orderItems } = await orderService.create(
    { userId, paymentMethod, note },
    discountedUserCart,
    address
  );

  let payment;
  if (paymentMethod === 'CARD') {
    payment = await paymentService.checkout({
      orderId: id,
      orderItems,
      billingData: { ...address, email },
    });
  }

  return c.json({ success: true, data: payment });
};

export const listUserOrders = async (c: HonoCtx): Promise<HandlerResponse<ListOrdersResponse>> => {
  const userId = Number(c.var.user?.id);
  const page = +(c.req.query('page') || '1');
  const limit = +(c.req.query('limit') || '10');
  const search = c.req.query('search') || '';

  const { orders, pagination } = await orderService.list({ page, limit, search, userId });

  return c.json({ success: true, data: { orders, pagination } });
};
