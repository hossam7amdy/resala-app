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

export interface AddItemToCart
  extends ExpressHandler<CreateCartRequest['body'], CreateCartResponse, undefined, LocalUser> {}

export interface GetUserCart
  extends ExpressHandler<GetCartRequest, GetCartResponse, undefined, LocalUser> {}

export interface RemoveItemFromCart
  extends ExpressHandlerWithParams<
    DeleteCartRequest['params'],
    undefined,
    DeleteCartResponse,
    undefined,
    LocalUser
  > {}

export interface AddProductToWishlist
  extends ExpressHandler<
    CreateWishlistRequest['body'],
    CreateWishlistResponse,
    undefined,
    LocalUser
  > {}

export interface GetUserWishlist
  extends ExpressHandler<GetWishlistRequest, GetWishlistResponse, undefined, LocalUser> {}

export interface RemoveProductFromWishlist
  extends ExpressHandlerWithParams<
    DeleteWishlistRequest['params'],
    undefined,
    DeleteWishlistResponse,
    undefined,
    LocalUser
  > {}
