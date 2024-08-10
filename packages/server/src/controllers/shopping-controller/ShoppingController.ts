import type { ShoppingService } from '../../services/index.js';
import type {
  AddItemToCart,
  AddProductToWishlist,
  GetUserCart,
  GetUserWishlist,
  RemoveItemFromCart,
  RemoveProductFromWishlist,
} from './IShoppingController.js';
import type IShoppingController from './IShoppingController.js';

export default class ShoppingController implements IShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  getUserCart: GetUserCart = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      const cart = await this.shoppingService.getUserCart(userId);

      return res.json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  addItemToCart: AddItemToCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const cart = await this.shoppingService.addItemToCart(userId, req.body);

      return res.json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  removeItemFromCart: RemoveItemFromCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const stockId = req.params.stockId;
      const cart = await this.shoppingService.removeItemFromCart(userId, stockId);

      return res.json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  removeUserCart: RemoveItemFromCart = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      await this.shoppingService.clearUserCart(userId);

      return res.json({
        success: true,
        data: {
          totalQuantity: 0,
          totalPrice: 0,
          items: [],
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getUserWishlist: GetUserWishlist = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      const wishlist = await this.shoppingService.getUserWishlist(userId);

      return res.json({ success: true, data: wishlist });
    } catch (error) {
      next(error);
    }
  };

  addProductToWishlist: AddProductToWishlist = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const wishlist = await this.shoppingService.addProductToWishlist(userId, req.body.productId);

      return res.json({ success: true, data: wishlist });
    } catch (error) {
      return next(error);
    }
  };

  removeProductFromWishlist: RemoveProductFromWishlist = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const productId = req.params.productId;
      const wishlist = await this.shoppingService.removeProductFromWishlist(userId, productId);

      return res.json({ success: true, data: wishlist });
    } catch (error) {
      next(error);
    }
  };

  removeUserWishlist: RemoveProductFromWishlist = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      await this.shoppingService.removeUserWishlist(userId);

      return res.json({ success: true, data: [] });
    } catch (error) {
      next(error);
    }
  };
}
