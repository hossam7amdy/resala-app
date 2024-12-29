import { dashboardService, productService } from '@/features';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  GetProductResponseSchema,
  GetProductSchema,
  ListProductsResponseSchema,
  ListProductsSchema,
  ListTopProductsSchema,
} from '@resala/shared';

const getProductRoute = createRoute({
  tags: ['Product'],
  method: 'get',
  path: '/{id}',
  request: {
    params: GetProductSchema.shape.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            data: GetProductResponseSchema,
          }),
        },
      },
      description: 'Address created successfully',
    },
  },
});
const listProductsRoute = createRoute({
  tags: ['Product'],
  method: 'get',
  path: '/',
  request: {
    query: ListProductsSchema.shape.query,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            data: z.object({
              pagination: z.object({
                page: z.number(),
                limit: z.number(),
                total: z.number(),
              }),
              products: ListProductsResponseSchema,
            }),
          }),
        },
      },
      description: 'List of products',
    },
  },
});
const listTopProductsRoute = createRoute({
  tags: ['Product'],
  method: 'get',
  path: '/top-products',
  request: {},
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            data: ListTopProductsSchema,
          }),
        },
      },
      description: 'List of top products',
    },
  },
});

const productHandler = new OpenAPIHono()
  .openapi(getProductRoute, async c => {
    const id = c.req.valid('param').id;
    const product = await productService.get(id);
    return c.json({ success: true, data: product });
  })
  .openapi(listProductsRoute, async c => {
    const { page, limit, search, categoryId } = c.req.valid('query');
    const { products, pagination } = await productService.list({ page, limit, search, categoryId });
    return c.json({ success: true, data: { pagination, products } });
  });

const dashboardHandler = new OpenAPIHono().openapi(listTopProductsRoute, async c => {
  const products = await dashboardService.listTopProducts();
  return c.json({ success: true, data: products });
});

export { productHandler, dashboardHandler };
