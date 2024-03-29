import { RequestHandler } from 'express';

import { shoppingService } from '../../services';

export const getUserCart: RequestHandler = async (_, res, next) => {
  const userId = res.locals.user.id;

  try {
    const cart = await shoppingService.getUserCart(userId);
    return res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addItemToCart: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;

  try {
    const cart = await shoppingService.addToCart(userId, req.body);

    return res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const stockId = parseInt(req.params.stockId + '');

  try {
    const cart = await shoppingService.removeFromCart(userId, stockId);

    return res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUserCart: RequestHandler = async (_, res, next) => {
  const userId = res.locals.user.id;

  try {
    await shoppingService.removeUserCart(userId);

    return res.json({
      success: true,
      message: 'Cart removed',
    });
  } catch (error) {
    next(error);
  }
};

export const getUserWishlist: RequestHandler = async (_, res, next) => {
  const userId = res.locals.user.id;

  try {
    const wishlist = await shoppingService.getUserWishlist(userId);
    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const addProductToWishlist: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;

  try {
    const wishlist = await shoppingService.addProductToWishlist(userId, req.body.productId);

    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    return next(error);
  }
};

export const removeProductFromWishlist: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const productId = Number(req.params.productId);

  try {
    const wishlist = await shoppingService.removeProductFromWishlist(userId, productId);

    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUserWishlist: RequestHandler = async (_, res, next) => {
  const userId = res.locals.user.id;

  try {
    await shoppingService.removeUserWishlist(userId);

    return res.json({
      success: true,
      message: 'Wishlist removed',
    });
  } catch (error) {
    next(error);
  }
};
