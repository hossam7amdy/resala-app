import { shoppingService } from '@/services';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  CreateWishlistSchema,
  DeleteWishlistSchema,
  ProductSchema,
  WishlistSchema,
} from '@resala/shared';

import type { Env } from '../types';

const UserWishlist = z.object({
  success: z.boolean().default(true),
  data: z.array(
    WishlistSchema.omit({ productId: true }).extend({
      product: ProductSchema,
    })
  ),
});
const getWishlistRoute = createRoute({
  tags: ['Wishlist'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'Get wishlist',
      content: {
        'application/json': {
          schema: UserWishlist,
        },
      },
    },
  },
});
const updateWishlistRoute = createRoute({
  tags: ['Wishlist'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateWishlistSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Add product to wishlist',
      content: {
        'application/json': {
          schema: UserWishlist,
        },
      },
    },
  },
});
const deleteWishlistProductRoute = createRoute({
  tags: ['Wishlist'],
  method: 'delete',
  path: '/{productId}',
  request: {
    params: DeleteWishlistSchema.shape.params,
  },
  responses: {
    200: {
      description: 'Delete product from wishlist',
      content: {
        'application/json': {
          schema: UserWishlist,
        },
      },
    },
  },
});
const clearWishlistRoute = createRoute({
  tags: ['Wishlist'],
  method: 'delete',
  path: '/',
  responses: {
    200: {
      description: 'Clear wishlist',
      content: {
        'application/json': {
          schema: UserWishlist,
        },
      },
    },
  },
});

const wishlistHandler = new OpenAPIHono<Env>()
  .openapi(getWishlistRoute, async c => {
    const userId = c.var.user.id;
    const wishlist = await shoppingService.wishlist.get(userId);
    return c.json({ success: true, data: wishlist });
  })
  .openapi(updateWishlistRoute, async c => {
    const userId = c.var.user.id;
    const body = c.req.valid('json');
    const wishlist = await shoppingService.wishlist.update(userId, body.productId);
    return c.json({ success: true, data: wishlist });
  })
  .openapi(deleteWishlistProductRoute, async c => {
    const userId = c.var.user.id;
    const productId = c.req.valid('param').productId;
    const wishlist = await shoppingService.wishlist.delete(userId, productId);
    return c.json({ success: true, data: wishlist });
  })
  .openapi(clearWishlistRoute, async c => {
    const userId = c.var.user.id;
    await shoppingService.wishlist.deleteMany(userId);
    return c.json({ success: true, data: [] });
  });

export { wishlistHandler };
