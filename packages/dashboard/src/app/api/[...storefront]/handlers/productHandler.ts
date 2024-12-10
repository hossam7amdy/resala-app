import { dashboardService, productService, stockService } from '@/services';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  CategorySchema,
  ColorSchema,
  DiscountSchema,
  GetProductSchema,
  ImageSchema,
  ListProductsSchema,
  ListStocksSchema,
  ProductSchema,
  StockSchema,
} from '@resala/shared';

const GetProductResponseSchema = ProductSchema.extend({
  avgRating: z.number(),
  category: CategorySchema,
  discounts: z.array(DiscountSchema),
});

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
              products: z.array(GetProductResponseSchema),
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
            data: z.array(
              z.object({
                product: ProductSchema,
                unitsSold: z.number(),
              })
            ),
          }),
        },
      },
      description: 'List of top products',
    },
  },
});

const listStocksRoute = createRoute({
  tags: ['Product'],
  method: 'get',
  path: '/',
  request: {
    query: ListStocksSchema.shape.query,
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
              stocks: z.array(
                z.object({
                  product: ProductSchema,
                  color: ColorSchema,
                  images: z.array(ImageSchema.omit({ colorId: true, productId: true })),
                  sizes: z.array(
                    StockSchema.omit({ id: true, colorId: true, productId: true }).extend({
                      stockId: z.string().cuid(),
                      size: z.string(),
                    })
                  ),
                })
              ),
            }),
          }),
        },
      },
      description: 'List of stocks',
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

const stockHandler = new OpenAPIHono().openapi(listStocksRoute, async c => {
  const { page, limit, search, productId } = c.req.valid('query');
  const { stocks, pagination } = await stockService.list({ page, limit, search, productId });
  return c.json({ success: true, data: { stocks, pagination } });
});

export { productHandler, stockHandler, dashboardHandler };
