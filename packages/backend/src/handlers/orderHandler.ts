import {
  addressService,
  discountService,
  orderService,
  paymentService,
  shoppingService,
} from '@/features';
import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  CreateAddressSchema,
  CreateOrderSchema,
  OffsetPageParamsSchema,
  OrderSchema,
} from '@resala/shared';

const checkoutRoute = createRoute({
  tags: ['Order'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateOrderSchema.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().default(true),
            data: z
              .object({
                paymentUrl: z
                  .string()
                  .url()
                  .openapi({ example: 'https://example.com', description: 'Payment URL' }),
              })
              .optional()
              .openapi('CheckoutResponse'),
          }),
        },
      },
      description: 'Order created successfully',
    },
  },
});
const listUserOrdersRoute = createRoute({
  tags: ['Order'],
  method: 'get',
  path: '/',
  request: {
    query: OffsetPageParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: z.object({
              orders: z.array(OrderSchema),
              pagination: z.object({
                total: z.number(),
                page: z.number(),
                limit: z.number(),
              }),
            }),
          }),
        },
      },
      description: 'List of orders',
    },
  },
});

const orderHandler = new OpenAPIHono<Env>()
  .openapi(checkoutRoute, async c => {
    const userId = c.var.user.id;
    const email = c.var.user.email;
    const { paymentMethod, addressId, note } = c.req.valid('json');

    const userCart = await shoppingService.cart.get(userId);
    const discountedUserCart = await discountService.applyDiscount(userCart);

    const address = await addressService.find(addressId, { userId });

    const addressData = CreateAddressSchema.shape.body.omit({ isDefault: true }).parse(address);

    const { id, orderItems } = await orderService.create({
      shippingAddress: addressData,
      cart: discountedUserCart,
      userId,
      paymentMethod,
      note,
    });

    let payment;
    if (paymentMethod === 'CARD') {
      payment = await paymentService.checkout({
        orderId: id,
        orderItems,
        billingData: { ...addressData, email },
      });
    }

    return c.json({ success: true, data: payment }, 201);
  })
  .openapi(listUserOrdersRoute, async c => {
    const userId = c.var.user.id;
    const { page, limit } = c.req.valid('query');

    const { orders, pagination } = await orderService.list({ page, limit, userId });

    return c.json({ success: true, data: { orders, pagination } }, 200);
  });

export { orderHandler };
