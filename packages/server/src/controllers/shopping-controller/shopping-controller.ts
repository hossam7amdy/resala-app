import { shoppingService } from '../../services/index.js';
import type {
  AddItemToCart,
  AddProductToWishlist,
  GetUserCart,
  GetUserWishlist,
  RemoveItemFromCart,
  RemoveProductFromWishlist,
} from './shopping-controller.interface.js';

export const getUserCart: GetUserCart = async (_, res, next) => {
  try {
    const userId = res.locals.user.id;
    const cart = await shoppingService.getUserCart(userId);
    return res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const addItemToCart: AddItemToCart = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const cart = await shoppingService.addItemToCart({ ...req.body, userId });

    return res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart: RemoveItemFromCart = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const stockId = req.params.stockId;
    const cart = await shoppingService.removeItemFromCart(userId, stockId);

    return res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUserCart: RemoveItemFromCart = async (_, res, next) => {
  try {
    const userId = res.locals.user.id;
    await shoppingService.clearUserCart(userId);

    return res.json({
      success: true,
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

export const getUserWishlist: GetUserWishlist = async (_, res, next) => {
  try {
    const userId = res.locals.user.id;
    const wishlist = await shoppingService.getUserWishlist(userId);
    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const addProductToWishlist: AddProductToWishlist = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const wishlist = await shoppingService.addProductToWishlist(userId, req.body.productId);

    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    return next(error);
  }
};

export const removeProductFromWishlist: RemoveProductFromWishlist = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const productId = req.params.productId;
    const wishlist = await shoppingService.removeProductFromWishlist(userId, productId);

    return res.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUserWishlist: RemoveProductFromWishlist = async (_, res, next) => {
  try {
    const userId = res.locals.user.id;
    await shoppingService.removeUserWishlist(userId);

    return res.json({
      success: true,
      data: [],
    });
  } catch (error) {
    next(error);
  }
};
