import type { DataStore } from '@/lib/db';

import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';

export class ShoppingService {
  readonly cart: CartService;
  readonly wishlist: WishlistService;

  constructor(readonly db: DataStore) {
    this.cart = new CartService(db);
    this.wishlist = new WishlistService(db);
  }
}
