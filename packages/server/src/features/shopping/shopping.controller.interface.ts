import type {
  CreateCartRequest,
  CreateCartResponse,
  CreateWishlistRequest,
  CreateWishlistResponse,
  DeleteCartRequest,
  DeleteCartResponse,
  DeleteWishlistRequest,
  DeleteWishlistResponse,
  GetCartRequest,
  GetCartResponse,
  GetWishlistRequest,
  GetWishlistResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/index.js';

export type AddItemToCart = ExpressHandler<
  CreateCartRequest['body'],
  CreateCartResponse,
  undefined,
  LocalUser
>;

export type GetUserCart = ExpressHandler<GetCartRequest, GetCartResponse, undefined, LocalUser>;

export type RemoveItemFromCart = ExpressHandlerWithParams<
  DeleteCartRequest['params'],
  undefined,
  DeleteCartResponse,
  undefined,
  LocalUser
>;

export type AddProductToWishlist = ExpressHandler<
  CreateWishlistRequest['body'],
  CreateWishlistResponse,
  undefined,
  LocalUser
>;

export type GetUserWishlist = ExpressHandler<
  GetWishlistRequest,
  GetWishlistResponse,
  undefined,
  LocalUser
>;

export type RemoveProductFromWishlist = ExpressHandlerWithParams<
  DeleteWishlistRequest['params'],
  undefined,
  DeleteWishlistResponse,
  undefined,
  LocalUser
>;

export interface IShoppingController {
  addItemToCart: AddItemToCart;
  getUserCart: GetUserCart;
  removeItemFromCart: RemoveItemFromCart;
  addProductToWishlist: AddProductToWishlist;
  getUserWishlist: GetUserWishlist;
  removeProductFromWishlist: RemoveProductFromWishlist;
}
