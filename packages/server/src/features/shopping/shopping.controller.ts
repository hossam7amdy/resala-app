import {
  type CreateCartRequest,
  type CreateCartResponse,
  CreateCartSchema,
  type CreateWishlistRequest,
  type CreateWishlistResponse,
  CreateWishlistSchema,
  type DeleteCartResponse,
  type DeleteWishlistResponse,
  type GetCartResponse,
  type GetWishlistResponse,
} from '@resala/shared';
import type { Request as ExRequest } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { validate } from '../../middlewares/validateHandler.js';
import { DiscountService } from '../discount/discount.service.js';
import { ShoppingService } from './shopping.service.js';

@Tags('Shopping')
@Route('api/v1')
@Security('JWT_SECRET')
export class ShoppingController extends Controller {
  private readonly discountService: DiscountService;
  private readonly shoppingService: ShoppingService;

  constructor() {
    super();
    this.shoppingService = new ShoppingService(db);
    this.discountService = new DiscountService(db);
  }

  @Get('cart')
  public async getCart(@Request() req: ExRequest): Promise<GetCartResponse> {
    const userId = req.res?.locals.user.id;
    const cart = await this.shoppingService.cart.get(userId);
    const updatedCart = await this.discountService.applyDiscount(cart);

    return { success: true, data: updatedCart };
  }

  @Post('cart/items')
  @SuccessResponse('201', 'Item added to cart')
  @Middlewares([validate(CreateCartSchema)])
  public async addItemToCart(
    @Request() req: ExRequest,
    @Body() body: CreateCartRequest['body']
  ): Promise<CreateCartResponse> {
    const userId = req.res?.locals.user.id;
    const cart = await this.shoppingService.cart.update(userId, body);
    const updatedCart = await this.discountService.applyDiscount(cart);

    return { success: true, data: updatedCart };
  }

  @Delete('cart/items/{stockId}')
  public async removeItemFromCart(
    @Request() req: ExRequest,
    @Path() stockId: string
  ): Promise<DeleteCartResponse> {
    const userId = req.res?.locals.user.id;
    const cart = await this.shoppingService.cart.delete(userId, +stockId);
    const updatedCart = await this.discountService.applyDiscount(cart);

    return { success: true, data: updatedCart };
  }

  @Delete('cart')
  public async clearCart(@Request() req: ExRequest): Promise<DeleteCartResponse> {
    const userId = req.res?.locals.user.id;
    await this.shoppingService.cart.deleteMany(userId);

    return {
      success: true,
      data: {
        totalQuantity: 0,
        totalPrice: 0,
        items: [],
      },
    };
  }

  @Get('wishlist')
  public async getWishlist(@Request() req: ExRequest): Promise<GetWishlistResponse> {
    const userId = req.res?.locals.user.id;
    const wishlist = await this.shoppingService.wishlist.get(userId);

    return { success: true, data: wishlist };
  }

  @Post('wishlist/items')
  @SuccessResponse('201', 'Item added to wishlist')
  @Middlewares([validate(CreateWishlistSchema)])
  public async addProductToWishlist(
    @Request() req: ExRequest,
    @Body() body: CreateWishlistRequest['body']
  ): Promise<CreateWishlistResponse> {
    const userId = req.res?.locals.user.id;
    const wishlist = await this.shoppingService.wishlist.update(userId, body.productId);

    return { success: true, data: wishlist };
  }

  @Delete('wishlist/items/{productId}')
  public async removeProductFromWishlist(
    @Request() req: ExRequest,
    @Path() productId: string
  ): Promise<DeleteWishlistResponse> {
    const userId = req.res?.locals.user.id;
    const wishlist = await this.shoppingService.wishlist.delete(userId, +productId);

    return { success: true, data: wishlist };
  }

  @Delete('wishlist')
  public async clearWishlist(@Request() req: ExRequest): Promise<DeleteWishlistResponse> {
    const userId = req.res?.locals.user.id;
    await this.shoppingService.wishlist.deleteMany(userId);

    return { success: true, data: [] };
  }
}
