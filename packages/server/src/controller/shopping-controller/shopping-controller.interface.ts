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
  extends ExpressHandler<CreateCartRequest['body'], CreateCartResponse, {}, LocalUser> {}

export interface GetUserCart
  extends ExpressHandler<GetCartRequest, GetCartResponse, {}, LocalUser> {}

export interface RemoveItemFromCart
  extends ExpressHandlerWithParams<
    DeleteCartRequest['params'],
    {},
    DeleteCartResponse,
    {},
    LocalUser
  > {}

export interface AddProductToWishlist
  extends ExpressHandler<CreateWishlistRequest['body'], CreateWishlistResponse, {}, LocalUser> {}

export interface GetUserWishlist
  extends ExpressHandler<GetWishlistRequest, GetWishlistResponse, {}, LocalUser> {}

export interface RemoveProductFromWishlist
  extends ExpressHandlerWithParams<
    DeleteWishlistRequest['params'],
    {},
    DeleteWishlistResponse,
    {},
    LocalUser
  > {}
