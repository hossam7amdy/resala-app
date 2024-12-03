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

import type { HonoCtx } from '../types';

export const getCart = async (c: HonoCtx): Promise<HandlerResponse<GetCartResponse>> => {
  const userId = Number(c.var.user?.id);

  const cart = await shoppingService.cart.get(userId);
  const updatedCart = await discountService.applyDiscount(cart);

  return c.json({ success: true, data: updatedCart });
};

export const addItemToCart = async (c: HonoCtx): Promise<HandlerResponse<CreateCartResponse>> => {
  const userId = Number(c.var.user?.id);
  const { stockId, quantity } = await c.req.json();

  const cart = await shoppingService.cart.update(userId, { stockId, quantity: +quantity });
  const updatedCart = await discountService.applyDiscount(cart);

  return c.json({ success: true, data: updatedCart });
};

export const removeItemFromCart = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteCartResponse>> => {
  const userId = Number(c.var.user?.id);
  const stockId = +c.req.param('stockId');

  const cart = await shoppingService.cart.delete(userId, stockId);
  const updatedCart = await discountService.applyDiscount(cart);

  return c.json({ success: true, data: updatedCart });
};

export const clearCart = async (c: HonoCtx): Promise<HandlerResponse<DeleteCartResponse>> => {
  const userId = Number(c.var.user?.id);

  await shoppingService.cart.deleteMany(userId);

  return c.json({
    success: true,
    data: { totalQuantity: 0, totalPrice: 0, items: [] },
  });
};

export const getWishlist = async (c: HonoCtx): Promise<HandlerResponse<GetWishlistResponse>> => {
  const userId = Number(c.var.user?.id);

  const wishlist = await shoppingService.wishlist.get(userId);

  return c.json({ success: true, data: wishlist });
};

export const addProductToWishlist = async (
  c: Context
): Promise<HandlerResponse<CreateWishlistResponse>> => {
  const userId = Number(c.var.user?.id);
  const body = await c.req.json();

  const wishlist = await shoppingService.wishlist.update(userId, body.productId);

  return c.json({ success: true, data: wishlist });
};

export const removeProductFromWishlist = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteWishlistResponse>> => {
  const userId = Number(c.var.user?.id);
  const productId = +c.req.param('productId');

  const wishlist = await shoppingService.wishlist.delete(userId, +productId);

  return c.json({ success: true, data: wishlist });
};

export const clearWishlist = async (
  c: HonoCtx
): Promise<HandlerResponse<DeleteWishlistResponse>> => {
  const userId = Number(c.var.user?.id);

  await shoppingService.wishlist.deleteMany(userId);

  return c.json({ success: true, data: [] });
};
