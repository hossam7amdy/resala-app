import { discountService, shoppingService } from '@/features';
import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  CartSchema,
  ColorSchema,
  CreateCartSchema,
  DeleteCartSchema,
  DiscountSchema,
  ImageSchema,
  ProductSchema,
  SizeSchema,
  StockSchema,
} from '@resala/shared';

const CartResponseSchema = z.object({
  data: z.object({
    totalQuantity: z.number(),
    totalPrice: z.number(),
    totalDiscount: z.number().optional(),
    items: z.array(
      CartSchema.extend({
        discountedPrice: z.number().optional(),
        appliedDiscount: DiscountSchema.optional(),
        product: ProductSchema,
        images: z.array(ImageSchema),
        stock: StockSchema.extend({
          color: ColorSchema,
          size: SizeSchema,
        }),
      })
    ),
  }),
});

const getCartRoute = createRoute({
  tags: ['Cart'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CartResponseSchema,
        },
      },
      description: 'Cart items fetched successfully',
    },
  },
});
const updateCartRoute = createRoute({
  tags: ['Cart'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateCartSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CartResponseSchema,
        },
      },
      description: 'Cart updated successfully',
    },
  },
});
const deleteCartItemRoute = createRoute({
  tags: ['Cart'],
  method: 'delete',
  path: '/{stockId}',
  request: {
    params: DeleteCartSchema.shape.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CartResponseSchema,
        },
      },
      description: 'Cart item deleted successfully',
    },
  },
});
const clearCartRoute = createRoute({
  tags: ['Cart'],
  method: 'delete',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CartResponseSchema,
        },
      },
      description: 'Cart cleared successfully',
    },
  },
});

const cartHandler = new OpenAPIHono<Env>()
  .openapi(getCartRoute, async c => {
    const userId = c.var.user.id;
    const cart = await shoppingService.cart.get(userId);
    const updatedCart = await discountService.applyDiscount(cart);
    return c.json({ success: true, data: updatedCart });
  })
  .openapi(updateCartRoute, async c => {
    const userId = c.var.user.id;
    const { stockId, quantity } = c.req.valid('json');
    const cart = await shoppingService.cart.update(userId, { stockId, quantity });
    const updatedCart = await discountService.applyDiscount(cart);
    return c.json({ success: true, data: updatedCart });
  })
  .openapi(deleteCartItemRoute, async c => {
    const userId = c.var.user.id;
    const stockId = c.req.param('stockId');
    const cart = await shoppingService.cart.delete(userId, stockId);
    const updatedCart = await discountService.applyDiscount(cart);
    return c.json({ success: true, data: updatedCart });
  })
  .openapi(clearCartRoute, async c => {
    const userId = c.var.user.id;
    await shoppingService.cart.deleteMany(userId);
    return c.json({
      success: true,
      data: { totalQuantity: 0, totalPrice: 0, items: [] },
    });
  });

export { cartHandler };
