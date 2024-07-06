import type { CreateCartRequest, GetCartResponse, GetWishlistResponse } from '@resala/shared';

import type { ShoppingRepository } from '../../repositories/index.js';
import { NotFoundError } from '../../utils/ApiErrors.js';
import type { InventoryService } from '../index.js';

export default class ShoppingService {
  constructor(
    private readonly shoppingRepo: ShoppingRepository,
    private readonly inventoryService: InventoryService
  ) {}

  async getUserCart(userId: number): Promise<GetCartResponse['data']> {
    try {
      const cart = await this.shoppingRepo.cart.list(userId);

      const cartItems = cart.map(item => ({
        userId: item.userId,
        quantity: item.quantity,
        createdAt: item.stock.createdAt,
        updatedAt: item.stock.updatedAt,
        product: item.stock.product,
        images: item.stock.color.images.map(img => ({
          id: img.id,
          imageKey: img.imageKey,
          imageUrl: img.imageUrl,
          isPrimary: img.isPrimary,
          createdAt: img.createdAt,
        })),
        stock: {
          id: item.stock.id,
          quantity: item.stock.quantity,
          createdAt: item.stock.createdAt,
          updatedAt: item.stock.updatedAt,
          color: item.stock.color,
          size: item.stock.size,
        },
      }));

      const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + Number(item.product.price) * item.quantity,
        0
      );

      return {
        totalQuantity,
        totalPrice,
        items: cartItems,
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundError('User not found');
    }
  }

  async addItemToCart(
    userId: number,
    { stockId, quantity }: CreateCartRequest['body']
  ): Promise<GetCartResponse['data']> {
    const stock = await this.inventoryService.stock.findById(stockId);

    if (stock.sizes[0].quantity < quantity) {
      throw new NotFoundError('Not enough stock');
    }

    await this.shoppingRepo.cart.update({
      userId,
      stockId,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.getUserCart(userId);
  }

  async removeItemFromCart(userId: number, stockId: number): Promise<GetCartResponse['data']> {
    try {
      await this.shoppingRepo.cart.delete(userId, stockId);

      return this.getUserCart(userId);
    } catch (error) {
      console.log(error);
      throw new NotFoundError('Item not found in cart');
    }
  }

  async clearUserCart(userId: number) {
    await this.shoppingRepo.cart.deleteAll(userId);
  }

  async getUserWishlist(userId: number): Promise<GetWishlistResponse['data']> {
    return await this.shoppingRepo.wishlist.list(userId);
  }

  async addProductToWishlist(
    userId: number,
    productId: number
  ): Promise<GetWishlistResponse['data']> {
    await this.inventoryService.product.findProductById(productId);

    await this.shoppingRepo.wishlist.update({
      userId,
      productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.getUserWishlist(userId);
  }

  async removeProductFromWishlist(
    userId: number,
    productId: number
  ): Promise<GetWishlistResponse['data']> {
    try {
      await this.shoppingRepo.wishlist.delete(userId, productId);

      return this.getUserWishlist(userId);
    } catch (error) {
      throw new NotFoundError('Product not found in wishlist');
    }
  }

  async removeUserWishlist(userId: number) {
    await this.shoppingRepo.wishlist.deleteAll(userId);
  }
}
