import type {
  AddItemToCart,
  AddProductToWishlist,
  GetUserCart,
  GetUserWishlist,
  RemoveItemFromCart,
  RemoveProductFromWishlist,
} from './shopping.controller.interface.js';
import type { IShoppingController } from './shopping.controller.interface.js';
import type { ShoppingService } from './shopping.service.js';

export class ShoppingController implements IShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  getUserCart: GetUserCart = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      const cart = await this.shoppingService.cart.get(userId);

      return res.json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  addItemToCart: AddItemToCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const cart = await this.shoppingService.cart.update(userId, req.body);

      return res.json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  removeItemFromCart: RemoveItemFromCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const stockId = req.params.stockId;
      const cart = await this.shoppingService.cart.delete(userId, stockId);

      return res.json({ success: true, data: cart });
    } catch (error) {
      next(error);
    }
  };

  removeUserCart: RemoveItemFromCart = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      await this.shoppingService.cart.deleteMany(userId);

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
      const wishlist = await this.shoppingService.wishlist.get(userId);

      return res.json({ success: true, data: wishlist });
    } catch (error) {
      next(error);
    }
  };

  addProductToWishlist: AddProductToWishlist = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const wishlist = await this.shoppingService.wishlist.update(userId, req.body.productId);

      return res.json({ success: true, data: wishlist });
    } catch (error) {
      return next(error);
    }
  };

  removeProductFromWishlist: RemoveProductFromWishlist = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const productId = req.params.productId;
      const wishlist = await this.shoppingService.wishlist.delete(userId, productId);

      return res.json({ success: true, data: wishlist });
    } catch (error) {
      next(error);
    }
  };

  removeUserWishlist: RemoveProductFromWishlist = async (_, res, next) => {
    try {
      const userId = res.locals.user.id;
      await this.shoppingService.wishlist.deleteMany(userId);

      return res.json({ success: true, data: [] });
    } catch (error) {
      next(error);
    }
  };
}
