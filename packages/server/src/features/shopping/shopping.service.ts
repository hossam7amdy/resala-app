import type { DataStore } from '../../datastore/index.js';
import { CartService } from './cart.service.js';
import { WishlistService } from './wishlist.service.js';

export class ShoppingService {
  readonly cart: CartService;
  readonly wishlist: WishlistService;

  constructor(readonly db: DataStore) {
    this.cart = new CartService(db);
    this.wishlist = new WishlistService(db);
  }
}
