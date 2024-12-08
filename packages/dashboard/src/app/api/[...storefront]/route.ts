import { configuration } from '@/configuration';
import { auth } from '@/lib/auth';
import { zValidator } from '@hono/zod-validator';
import {
  CreateAddressSchema,
  CreateCartSchema,
  CreateOrderSchema,
  CreateReviewSchema,
  CreateWishlistSchema,
  DeleteAddressSchema,
  DeleteCartSchema,
  DeleteReviewSchema,
  DeleteWishlistSchema,
  GetCategorySchema,
  GetProductSchema,
  GetReviewSchema,
  ListAddressSchema,
  ListOrdersSchema,
  ListProductsSchema,
  ListReviewsSchema,
  ListStocksSchema,
  UpdateAddressSchema,
  UpdateReviewSchema,
} from '@resala/shared';
import type { Handler } from 'hono';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

import { STOREFRONT_ENDPOINT_CONFIGS, StorefrontEndpoints } from './endpoints.config';
import * as addressHandler from './handlers/addressHandler';
import * as collectionHandler from './handlers/collectionHandler';
import * as orderHandler from './handlers/orderHandler';
import * as productHandler from './handlers/productHandler';
import * as reviewHandler from './handlers/reviewHandler';
import * as shoppingHandler from './handlers/shoppingHandler';
import { enforceSession, parseSession } from './middlewares/sessionMiddleware';
import type { Env } from './types';

export const dynamic = 'force-dynamic';

const HANDLERS: { [_key in StorefrontEndpoints]: Handler[] } = {
  [StorefrontEndpoints.getCategory]: [
    zValidator('param', GetCategorySchema.shape.params),
    collectionHandler.get,
  ],
  [StorefrontEndpoints.listCategories]: [collectionHandler.list],

  [StorefrontEndpoints.getSalesTrends]: [productHandler.listSalesTrends],
  [StorefrontEndpoints.listTopProducts]: [productHandler.listTopProducts],
  [StorefrontEndpoints.getProduct]: [
    zValidator('param', GetProductSchema.shape.params),
    productHandler.get,
  ],
  [StorefrontEndpoints.listProducts]: [
    zValidator('query', ListProductsSchema.shape.query),
    productHandler.list,
  ],
  [StorefrontEndpoints.listStocks]: [
    zValidator('query', ListStocksSchema.shape.query),
    productHandler.listStocks,
  ],

  [StorefrontEndpoints.getUserCart]: [shoppingHandler.getCart],
  [StorefrontEndpoints.addItemToCart]: [
    zValidator('json', CreateCartSchema.shape.body),
    shoppingHandler.addItemToCart,
  ],
  [StorefrontEndpoints.removeUserCart]: [shoppingHandler.clearCart],
  [StorefrontEndpoints.removeItemFromCart]: [
    zValidator('param', DeleteCartSchema.shape.params),
    shoppingHandler.removeItemFromCart,
  ],
  [StorefrontEndpoints.getUserWishlist]: [shoppingHandler.getWishlist],
  [StorefrontEndpoints.addProductToWishlist]: [
    zValidator('json', CreateWishlistSchema.shape.body),
    shoppingHandler.addProductToWishlist,
  ],
  [StorefrontEndpoints.removeUserWishlist]: [shoppingHandler.clearWishlist],
  [StorefrontEndpoints.removeProductFromWishlist]: [
    zValidator('param', DeleteWishlistSchema.shape.params),
    shoppingHandler.removeProductFromWishlist,
  ],

  [StorefrontEndpoints.checkout]: [
    zValidator('json', CreateOrderSchema.shape.body),
    orderHandler.checkout,
  ],
  [StorefrontEndpoints.listOrders]: [
    zValidator('query', ListOrdersSchema.shape.query),
    orderHandler.listUserOrders,
  ],

  [StorefrontEndpoints.createAddress]: [
    zValidator('json', CreateAddressSchema.shape.body),
    addressHandler.createUserAddress,
  ],
  [StorefrontEndpoints.listAddress]: [
    zValidator('query', ListAddressSchema.shape.query),
    addressHandler.listUserAddress,
  ],
  [StorefrontEndpoints.updateAddress]: [
    zValidator('json', UpdateAddressSchema.shape.body),
    addressHandler.updateUserAddress,
  ],
  [StorefrontEndpoints.deleteAddress]: [
    zValidator('param', DeleteAddressSchema.shape.params),
    addressHandler.deleteUserAddress,
  ],

  [StorefrontEndpoints.getReview]: [
    zValidator('param', GetReviewSchema.shape.params),
    reviewHandler.getReview,
  ],
  [StorefrontEndpoints.listReviews]: [
    zValidator('query', ListReviewsSchema.shape.query),
    reviewHandler.listReviews,
  ],
  [StorefrontEndpoints.createReview]: [
    zValidator('json', CreateReviewSchema.shape.body),
    reviewHandler.createReview,
  ],
  [StorefrontEndpoints.updateReview]: [
    zValidator('json', UpdateReviewSchema.shape.body),
    reviewHandler.updateReview,
  ],
  [StorefrontEndpoints.deleteReview]: [
    zValidator('json', DeleteReviewSchema.shape.query),
    reviewHandler.deleteReview,
  ],
};

const createHonoApp = () => {
  const app = new Hono<Env>();

  app.use(
    cors({
      origin: configuration().trustedOrigins,
      allowHeaders: ['Authorization', 'Content-Type'],
      allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  );

  app.use(parseSession);

  // health check
  app.get('/api/healthz', async c => {
    return c.json({ message: 'OK 🚀' });
  });

  // auth handlers
  app.get('/api/auth/*', c => auth.handler(c.req.raw));
  app.post('/api/auth/*', c => auth.handler(c.req.raw));

  // register handlers in hono app
  Object.keys(StorefrontEndpoints).forEach(entry => {
    const { method, url, auth } = STOREFRONT_ENDPOINT_CONFIGS[entry as StorefrontEndpoints];
    const handlers = HANDLERS[entry as StorefrontEndpoints];

    if (auth) {
      app[method](url, enforceSession, ...handlers);
    } else {
      app[method](url, ...handlers);
    }
  });

  return app;
};

const app = createHonoApp();

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
