import {
  CreateCartSchema,
  CreateSizeSchema,
  CreateStockSchema,
  CreateWishlistSchema,
  DeleteCartSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  DeleteWishlistSchema,
  ENDPOINT_CONFIGS,
  Endpoints,
  GetPaymentSchema,
  ListStocksSchema,
  UpdateSizeSchema,
  UpdateStockSchema,
} from '@resala/shared';
import { Router } from 'express';

import { db } from '../datastore/index.js';
import { AddressService } from '../features/address/address.service.js';
import { AuthService } from '../features/auth/auth.service.js';
import { OrderService } from '../features/order/order.service.js';
import { PaymentController } from '../features/payment/payment.controller.js';
import { PaymentService } from '../features/payment/payment.service.js';
import { PaymobService } from '../features/payment/paymob/paymob.service.js';
import { ShoppingController } from '../features/shopping/shopping.controller.js';
import { ShoppingService } from '../features/shopping/shopping.service.js';
import { SizeController } from '../features/size/size.controller.js';
import { SizeService } from '../features/size/size.service.js';
import { StockController } from '../features/stock/stock.controller.js';
import { StockService } from '../features/stock/stock.service.js';
import { UserService } from '../features/user/user.service.js';
import {
  AuthMiddleware,
  asyncHandler,
  loggerMiddleware,
  validateMiddleware,
} from '../middlewares/index.js';

/** Create Express Router with all the endpoints and their handlers */
export const expressApiRoutes = (legRequests: boolean) => {
  const router = Router();

  // services
  const authService = new AuthService(db);
  const userService = new UserService(db);
  const addressService = new AddressService(db);
  const stockService = new StockService(db);
  const sizeService = new SizeService(db);
  const shoppingService = new ShoppingService(db);
  const paymentService = new PaymentService(db, new PaymobService());
  const orderService = new OrderService(db, addressService, stockService, shoppingService);

  // controllers
  const sizeCtrl = new SizeController(sizeService);
  const stockCtrl = new StockController(stockService);
  const shoppingCtrl = new ShoppingController(shoppingService);
  const paymentCtrl = new PaymentController(paymentService, orderService);

  const authMiddleware = new AuthMiddleware(authService, userService);

  /** Define the handlers for each endpoint */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HANDLER: { [key in Endpoints]: any[] } = {
    // auth endpoints
    [Endpoints.login]: [],
    [Endpoints.register]: [],
    [Endpoints.refresh]: [],
    [Endpoints.verifyEmail]: [],
    [Endpoints.forgotPassword]: [],
    [Endpoints.resetPassword]: [],
    [Endpoints.changePassword]: [],
    [Endpoints.resendEmailVerification]: [],

    // user endpoints
    [Endpoints.getUser]: [],
    [Endpoints.listUsers]: [],
    [Endpoints.updateUser]: [],
    [Endpoints.deleteUser]: [],

    // user address endpoints
    [Endpoints.createAddress]: [],
    [Endpoints.updateAddress]: [],
    [Endpoints.deleteAddress]: [],
    [Endpoints.listAddress]: [],

    // category endpoints
    [Endpoints.getCategory]: [],
    [Endpoints.listCategories]: [],
    [Endpoints.createCategory]: [],
    [Endpoints.updateCategory]: [],
    [Endpoints.deleteCategory]: [],

    // product endpoints
    [Endpoints.getProduct]: [],
    [Endpoints.listProducts]: [],
    [Endpoints.createProduct]: [],
    [Endpoints.updateProduct]: [],
    [Endpoints.deleteProduct]: [],

    // stock endpoints
    [Endpoints.getStock]: [validateMiddleware(DeleteStockSchema), stockCtrl.getStock],
    [Endpoints.listStocks]: [validateMiddleware(ListStocksSchema), stockCtrl.listStocks],
    [Endpoints.addStock]: [
      validateMiddleware(CreateStockSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      stockCtrl.createStock,
    ],
    [Endpoints.updateStock]: [
      validateMiddleware(UpdateStockSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      stockCtrl.updateStock,
    ],
    [Endpoints.deleteStock]: [
      validateMiddleware(DeleteStockSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      stockCtrl.deleteStock,
    ],

    // color endpoints
    [Endpoints.getColor]: [],
    [Endpoints.listColors]: [],
    [Endpoints.createColor]: [],
    [Endpoints.updateColor]: [],
    [Endpoints.deleteColor]: [],

    // size endpoints
    [Endpoints.getSize]: [validateMiddleware(DeleteSizeSchema), sizeCtrl.getSize],
    [Endpoints.listSizes]: [sizeCtrl.listSizes],
    [Endpoints.createSize]: [
      validateMiddleware(CreateSizeSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      sizeCtrl.createSize,
    ],
    [Endpoints.updateSize]: [
      validateMiddleware(UpdateSizeSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      sizeCtrl.updateSize,
    ],
    [Endpoints.deleteSize]: [
      validateMiddleware(DeleteSizeSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      sizeCtrl.deleteSize,
    ],

    // image endpoints
    [Endpoints.findImages]: [],
    [Endpoints.addImages]: [],
    [Endpoints.updateImage]: [],
    [Endpoints.deleteImage]: [],

    // shopping endpoints
    [Endpoints.addItemToCart]: [validateMiddleware(CreateCartSchema), shoppingCtrl.addItemToCart],
    [Endpoints.removeItemFromCart]: [
      validateMiddleware(DeleteCartSchema),
      shoppingCtrl.removeItemFromCart,
    ],
    [Endpoints.getUserCart]: [shoppingCtrl.getUserCart],
    [Endpoints.removeUserCart]: [shoppingCtrl.removeUserCart],

    [Endpoints.addProductToWishlist]: [
      validateMiddleware(CreateWishlistSchema),
      shoppingCtrl.addProductToWishlist,
    ],
    [Endpoints.removeProductFromWishlist]: [
      validateMiddleware(DeleteWishlistSchema),
      shoppingCtrl.removeProductFromWishlist,
    ],
    [Endpoints.getUserWishlist]: [shoppingCtrl.getUserWishlist],
    [Endpoints.removeUserWishlist]: [shoppingCtrl.removeUserWishlist],

    // order endpoints
    [Endpoints.createOrder]: [],
    [Endpoints.getOrder]: [],
    [Endpoints.listOrders]: [],
    [Endpoints.deleteOrder]: [],
    [Endpoints.updateOrderStatus]: [],

    // payment endpoints
    [Endpoints.postPayCallback]: [paymentCtrl.postPayCallback],
    [Endpoints.getPayment]: [
      validateMiddleware(GetPaymentSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPayment,
    ],
    [Endpoints.voidPayment]: [
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      paymentCtrl.voidPayment,
    ],
    [Endpoints.refundPayment]: [
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      paymentCtrl.refundPayment,
    ],

    // review endpoints
    [Endpoints.createReview]: [],
    [Endpoints.updateReview]: [],
    [Endpoints.deleteReview]: [],
    [Endpoints.getReview]: [],
    [Endpoints.listReviews]: [],
  };

  /** Register all the routes and their handlers */
  Object.entries(HANDLER).forEach(([endpoint, handlers]) => {
    const { url, method, sensitive, auth } = ENDPOINT_CONFIGS[endpoint as Endpoints];

    if (legRequests && !sensitive) {
      handlers = [loggerMiddleware, ...handlers];
    }
    if (auth) {
      handlers = [authMiddleware.enforceJwt, ...handlers];
    }

    handlers = [authMiddleware.parseJwt, ...handlers];

    router[method](url, ...handlers.map(handler => asyncHandler(handler)));
  });

  return router;
};
