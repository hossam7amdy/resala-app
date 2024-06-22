import type { PrismaClient } from '@prisma/client';

import CartRepository from './CartRepository.js';
import WishlistRepository from './WishlistRepository.js';

export default class ShoppingRepository {
  readonly cart: CartRepository;
  readonly wishlist: WishlistRepository;

  constructor(prisma: PrismaClient) {
    this.cart = new CartRepository(prisma);
    this.wishlist = new WishlistRepository(prisma);
  }
}
