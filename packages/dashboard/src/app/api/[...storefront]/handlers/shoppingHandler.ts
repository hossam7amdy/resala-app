import { discountService, shoppingService } from '@/services';
import type {
  CreateCartResponse,
  CreateWishlistResponse,
  DeleteCartResponse,
  DeleteWishlistResponse,
  GetCartResponse,
  GetWishlistResponse,
} from '@resala/shared';
import type { Context } from 'hono';
import type { HandlerResponse } from 'hono/types';

import type { Env } from '../route';

type HonoCtx = Context<Env>;

export const getCart = async (c: HonoCtx): Promise<HandlerResponse<GetCartResponse>> => {
  const userId = c.var.user?.id as number;

  const cart = await shoppingService.cart.get(userId);
  const updatedCart = await discountService.applyDiscount(cart);

  return c.json({ success: true, data: updatedCart });
};

export const addItemToCart = async (c: HonoCtx): Promise<HandlerResponse<CreateCartResponse>> => {
  const userId = c.var.user?.id as number;
  const { stockId, quantity } = await c.req.json();

  const cart = await shoppingService.cart.update(userId, { stockId, quantity: +quantity });
  const updatedCart = await discountService.applyDiscount(cart);

  return c.json({ success: true, data: updatedCart });
};

export const removeItemFromCart = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteCartResponse>> => {
  const userId = c.var.user?.id as number;
  const stockId = c.req.query('stockId') as string;

  const cart = await shoppingService.cart.delete(userId, +stockId);
  const updatedCart = await discountService.applyDiscount(cart);

  return c.json({ success: true, data: updatedCart });
};

export const clearCart = async (c: HonoCtx): Promise<HandlerResponse<DeleteCartResponse>> => {
  const userId = c.var.user?.id as number;

  await shoppingService.cart.deleteMany(userId);

  return c.json({
    success: true,
    data: { totalQuantity: 0, totalPrice: 0, items: [] },
  });
};

export const getWishlist = async (c: HonoCtx): Promise<HandlerResponse<GetWishlistResponse>> => {
  const userId = c.var.user?.id as number;

  const wishlist = await shoppingService.wishlist.get(userId);

  return c.json({ success: true, data: wishlist });
};

export const addProductToWishlist = async (
  c: Context
): Promise<HandlerResponse<CreateWishlistResponse>> => {
  const userId = c.var.user?.id as number;
  const body = await c.req.json();

  const wishlist = await shoppingService.wishlist.update(userId, body.productId);

  return c.json({ success: true, data: wishlist });
};

export const removeProductFromWishlist = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteWishlistResponse>> => {
  const userId = c.var.user?.id as number;
  const productId = c.req.query('productId') as string;

  const wishlist = await shoppingService.wishlist.delete(userId, +productId);

  return c.json({ success: true, data: wishlist });
};

export const clearWishlist = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteWishlistResponse>> => {
  const userId = c.var.user?.id as number;

  await shoppingService.wishlist.deleteMany(userId);

  return c.json({ success: true, data: [] });
};
