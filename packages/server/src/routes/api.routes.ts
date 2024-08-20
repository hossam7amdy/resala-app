import {
  CreateCartSchema,
  CreateCategorySchema,
  CreateColorSchema,
  CreateImageSchema,
  CreateOrderSchema,
  CreateProductSchema,
  CreateReviewSchema,
  CreateSizeSchema,
  CreateStockSchema,
  CreateWishlistSchema,
  DefaultQuerySchema,
  DeleteCartSchema,
  DeleteCategorySchema,
  DeleteColorSchema,
  DeleteImageSchema,
  DeleteOrderSchema,
  DeleteProductSchema,
  DeleteReviewSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  DeleteWishlistSchema,
  ENDPOINT_CONFIGS,
  Endpoints,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  GetProductSchema,
  GetReviewSchema,
  ListImagesSchema,
  ListOrdersSchema,
  ListProductsSchema,
  ListReviewsSchema,
  ListStocksSchema,
  UpdateCategorySchema,
  UpdateColorSchema,
  UpdateImageSchema,
  UpdateOrderStatusSchema,
  UpdateProductSchema,
  UpdateReviewSchema,
  UpdateSizeSchema,
  UpdateStockSchema,
} from '@resala/shared';
import type { Request, Response } from 'express';
import { Router } from 'express';

import { db } from '../datastore/index.js';
import { AddressService } from '../features/address/address.service.js';
import { AuthService } from '../features/auth/auth.service.js';
import { CategoryController } from '../features/category/category.controller.js';
import { CategoryService } from '../features/category/category.service.js';
import { ColorController } from '../features/color/color.controller.js';
import { ColorService } from '../features/color/color.service.js';
import { FileService } from '../features/filestorage/file.service.js';
import { S3FileStorage } from '../features/filestorage/s3.filestorage.js';
import { ImageController } from '../features/image/image.controller.js';
import { ImageService } from '../features/image/image.service.js';
import { EmailNotification } from '../features/notification/email.notification.js';
import { NotificationService } from '../features/notification/notification.service.js';
import { OrderController } from '../features/order/order.controller.js';
import { OrderService } from '../features/order/order.service.js';
import { PaymentController } from '../features/payment/payment.controller.js';
import { PaymentService } from '../features/payment/payment.service.js';
import { PaymobService } from '../features/payment/paymob/paymob.service.js';
import { ProductController } from '../features/product/product.controller.js';
import { ProductService } from '../features/product/product.service.js';
import { ReviewController } from '../features/review/review.controller.js';
import { ReviewService } from '../features/review/review.service.js';
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
  uploadMiddleware,
  validateMiddleware,
} from '../middlewares/index.js';

/** Create Express Router with all the endpoints and their handlers */
export const expressApiRoutes = (legRequests: boolean) => {
  const router = Router();

  // services
  const fileService = new FileService(new S3FileStorage());
  const authService = new AuthService(db);
  const userService = new UserService(db);
  const addressService = new AddressService(db);
  const stockService = new StockService(db);
  const imageService = new ImageService(db, fileService);
  const productService = new ProductService(db, fileService);
  const categoryService = new CategoryService(db);
  const colorService = new ColorService(db);
  const sizeService = new SizeService(db);
  const notificationService = new NotificationService(new EmailNotification());
  const reviewService = new ReviewService(db);
  const shoppingService = new ShoppingService(db);
  const paymentService = new PaymentService(db, new PaymobService());
  const orderService = new OrderService(db, addressService, stockService, shoppingService);

  // controllers
  const categoryCtrl = new CategoryController(categoryService);
  const productCtrl = new ProductController(productService);
  const colorCtrl = new ColorController(colorService);
  const sizeCtrl = new SizeController(sizeService);
  const stockCtrl = new StockController(stockService);
  const imageCtrl = new ImageController(imageService);
  const shoppingCtrl = new ShoppingController(shoppingService);
  const paymentCtrl = new PaymentController(paymentService, orderService);
  const orderCtrl = new OrderController(orderService, paymentService, notificationService);
  const reviewCtrl = new ReviewController(reviewService);

  const authMiddleware = new AuthMiddleware(authService, userService);

  /** Define the handlers for each endpoint */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HANDLER: { [key in Endpoints]: any[] } = {
    // health check
    [Endpoints.healthz]: [(_: Request, res: Response) => res.send('OK 🤞')],

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
    [Endpoints.getCategory]: [validateMiddleware(GetCategorySchema), categoryCtrl.getCategory],
    [Endpoints.listCategories]: [
      validateMiddleware(DefaultQuerySchema),
      categoryCtrl.listCategories,
    ],
    [Endpoints.createCategory]: [
      validateMiddleware(CreateCategorySchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      categoryCtrl.createCategory,
    ],
    [Endpoints.updateCategory]: [
      validateMiddleware(UpdateCategorySchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      categoryCtrl.updateCategory,
    ],
    [Endpoints.deleteCategory]: [
      validateMiddleware(DeleteCategorySchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      categoryCtrl.deleteCategory,
    ],

    // product endpoints
    [Endpoints.getProduct]: [validateMiddleware(GetProductSchema), productCtrl.getProduct],
    [Endpoints.listProducts]: [validateMiddleware(ListProductsSchema), productCtrl.listProducts],
    [Endpoints.createProduct]: [
      uploadMiddleware.single('image'),
      validateMiddleware(CreateProductSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      productCtrl.createProduct,
    ],
    [Endpoints.updateProduct]: [
      uploadMiddleware.single('image'),
      validateMiddleware(UpdateProductSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      productCtrl.updateProduct,
    ],
    [Endpoints.deleteProduct]: [
      validateMiddleware(DeleteProductSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      productCtrl.deleteProduct,
    ],

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
    [Endpoints.getColor]: [validateMiddleware(DeleteColorSchema), colorCtrl.getColor],
    [Endpoints.listColors]: [colorCtrl.listColors],
    [Endpoints.createColor]: [
      validateMiddleware(CreateColorSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      colorCtrl.createColor,
    ],
    [Endpoints.updateColor]: [
      validateMiddleware(UpdateColorSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      colorCtrl.updateColor,
    ],
    [Endpoints.deleteColor]: [
      validateMiddleware(DeleteColorSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      colorCtrl.deleteColor,
    ],

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
    [Endpoints.findImages]: [validateMiddleware(ListImagesSchema), imageCtrl.listImages],
    [Endpoints.addImages]: [
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      uploadMiddleware.array('images', 5),
      validateMiddleware(CreateImageSchema),
      imageCtrl.createImages,
    ],
    [Endpoints.updateImage]: [
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      validateMiddleware(UpdateImageSchema),
      imageCtrl.updateImage,
    ],
    [Endpoints.deleteImage]: [
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      validateMiddleware(DeleteImageSchema),
      imageCtrl.deleteImage,
    ],

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
    [Endpoints.createOrder]: [validateMiddleware(CreateOrderSchema), orderCtrl.createOrder],
    [Endpoints.getOrder]: [
      authMiddleware.authorizeAccess,
      validateMiddleware(GetOrderSchema),
      orderCtrl.getOrder,
    ],
    [Endpoints.listOrders]: [
      authMiddleware.authorizeAccess,
      validateMiddleware(ListOrdersSchema),
      orderCtrl.listOrders,
    ],
    [Endpoints.deleteOrder]: [
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      validateMiddleware(DeleteOrderSchema),
      orderCtrl.deleteOrder,
    ],
    [Endpoints.updateOrderStatus]: [
      validateMiddleware(UpdateOrderStatusSchema),
      authMiddleware.authorizeRole(['ADMIN', 'MODERATOR']),
      orderCtrl.updateOrderStatus,
    ],

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
    [Endpoints.createReview]: [validateMiddleware(CreateReviewSchema), reviewCtrl.createReview],
    [Endpoints.updateReview]: [validateMiddleware(UpdateReviewSchema), reviewCtrl.updateReview],
    [Endpoints.deleteReview]: [validateMiddleware(DeleteReviewSchema), reviewCtrl.deleteReview],
    [Endpoints.getReview]: [validateMiddleware(GetReviewSchema), reviewCtrl.getReview],
    [Endpoints.listReviews]: [validateMiddleware(ListReviewsSchema), reviewCtrl.listReviews],
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
