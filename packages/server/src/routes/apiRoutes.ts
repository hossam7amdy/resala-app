import { PrismaClient } from '@prisma/client';
import {
  AdminDeleteUserSchema,
  AdminGetUserSchema,
  AdminUpdateUserSchema,
  ChangePasswordSchema,
  CreateAddressSchema,
  CreateCartSchema,
  CreateCategorySchema,
  CreateColorSchema,
  CreateImageSchema,
  CreateOrderSchema,
  CreatePaymentSchema,
  CreateProductSchema,
  CreateReviewSchema,
  CreateSizeSchema,
  CreateStockSchema,
  CreateWishlistSchema,
  DefaultQuerySchema,
  DeleteAddressSchema,
  DeleteCartSchema,
  DeleteCategorySchema,
  DeleteColorSchema,
  DeleteImageSchema,
  DeleteProductSchema,
  DeleteReviewSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  DeleteWishlistSchema,
  ENDPOINT_CONFIGS,
  Endpoints,
  ForgotPasswordSchema,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  GetProductSchema,
  GetReviewSchema,
  ListProductReviewsSchema,
  ListReviewsSchema,
  LoginSchema,
  PatchImageSchema,
  RefreshTokenSchema,
  RegisterSchema,
  ResetPasswordSchema,
  UpdateAddressSchema,
  UpdateCategorySchema,
  UpdateColorSchema,
  UpdateOrderStatusSchema,
  UpdateProductSchema,
  UpdateProfileSchema,
  UpdateReviewSchema,
  UpdateSizeSchema,
  UpdateStockSchema,
  VerifyEmailSchema,
} from '@resala/shared';
import type { Request, RequestHandler, Response } from 'express';
import { Router } from 'express';

import {
  AuthController,
  CategoryCtrl,
  ColorController,
  ImageController,
  OrderController,
  PaymentController,
  ProductController,
  ReviewController,
  ShoppingController,
  SizeController,
  StockController,
  UserController,
} from '../controllers/index.js';
import {
  AuthMiddleware,
  errHandler,
  loggerMiddleware,
  uploadMiddleware,
  validateMiddleware,
} from '../middlewares/index.js';
import {
  InventoryRepository,
  OrderRepository,
  PaymentRepository,
  ReviewRepository,
  ShoppingRepository,
  UserRepository,
} from '../repositories/index.js';
import {
  AuthService,
  EmailNotificationService,
  FileService,
  InventoryService,
  NotificationService,
  OrderService,
  PaymentService,
  PaymobPaymentService,
  ReviewService,
  S3FileStorageService,
  ShoppingService,
  UserService,
} from '../services/index.js';

/** Create Express Router with all the endpoints and their handlers */
export const createExpressRouter = (legRequests: boolean) => {
  const router = Router();

  const prisma = new PrismaClient();

  // repositories
  const userRepository = new UserRepository(prisma);
  const inventoryRepository = new InventoryRepository(prisma);
  const orderRepository = new OrderRepository(prisma);
  const paymentRepository = new PaymentRepository(prisma);
  const reviewRepository = new ReviewRepository(prisma);
  const shoppingRepository = new ShoppingRepository(prisma);

  // services
  const authService = new AuthService(userRepository);
  const userService = new UserService(userRepository);
  const fileService = new FileService(new S3FileStorageService());
  const inventoryService = new InventoryService(inventoryRepository, fileService);
  const notificationService = new NotificationService(new EmailNotificationService());
  const reviewService = new ReviewService(reviewRepository, userService, inventoryService);
  const shoppingService = new ShoppingService(shoppingRepository, inventoryService);
  const paymentService = new PaymentService(paymentRepository, new PaymobPaymentService());
  const orderService = new OrderService(orderRepository, shoppingService, userService);

  // controllers
  const authCtrl = new AuthController(authService, notificationService);
  const userCtrl = new UserController(userService);
  const categoryCtrl = new CategoryCtrl(inventoryService);
  const productCtrl = new ProductController(inventoryService);
  const colorCtrl = new ColorController(inventoryService);
  const sizeCtrl = new SizeController(inventoryService);
  const stockCtrl = new StockController(inventoryService);
  const imageCtrl = new ImageController(inventoryService);
  const shoppingCtrl = new ShoppingController(shoppingService);
  const paymentCtrl = new PaymentController(paymentService, orderService);
  const orderCtrl = new OrderController(orderService, paymentService, notificationService);
  const reviewCtrl = new ReviewController(reviewService);

  const authMiddleware = new AuthMiddleware(authService, userService);

  /** Define the handlers for each endpoint */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HANDLER: { [key in Endpoints]: RequestHandler<any, any, any, any, any>[] } = {
    // health check
    [Endpoints.healthz]: [(_: Request, res: Response) => res.send('OK 🤞')],

    // auth endpoints
    [Endpoints.login]: [validateMiddleware(LoginSchema), authCtrl.login],
    [Endpoints.register]: [validateMiddleware(RegisterSchema), authCtrl.register],
    [Endpoints.refresh]: [validateMiddleware(RefreshTokenSchema), authCtrl.refresh],
    [Endpoints.verifyEmail]: [validateMiddleware(VerifyEmailSchema), authCtrl.verifyEmail],
    [Endpoints.forgotPassword]: [validateMiddleware(ForgotPasswordSchema), authCtrl.forgotPassword],
    [Endpoints.resetPassword]: [validateMiddleware(ResetPasswordSchema), authCtrl.resetPassword],
    [Endpoints.changePassword]: [validateMiddleware(ChangePasswordSchema), authCtrl.changePassword],
    [Endpoints.resendEmailVerification]: [authCtrl.resendVerificationEmail],

    // user endpoints
    [Endpoints.getCurrentUser]: [userCtrl.getProfile],
    [Endpoints.updateCurrentUser]: [
      validateMiddleware(UpdateProfileSchema),
      userCtrl.updateProfile,
    ],

    // admin user endpoints
    [Endpoints.adminGetUser]: [
      validateMiddleware(AdminGetUserSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      userCtrl.adminGetUser,
    ],
    [Endpoints.adminListUsers]: [
      validateMiddleware(DefaultQuerySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      userCtrl.adminListUsers,
    ],
    [Endpoints.adminUpdateUser]: [
      validateMiddleware(AdminUpdateUserSchema),
      authMiddleware.authorizeUser(['ADMIN']),
      userCtrl.adminUpdateUser,
    ],
    [Endpoints.adminDeleteUser]: [
      validateMiddleware(AdminDeleteUserSchema),
      authMiddleware.authorizeUser(['ADMIN']),
      userCtrl.adminDeleteUser,
    ],

    // user address endpoints
    [Endpoints.createAddress]: [
      validateMiddleware(CreateAddressSchema),
      userCtrl.createUserAddress,
    ],
    [Endpoints.updateAddress]: [
      validateMiddleware(UpdateAddressSchema),
      userCtrl.updateUserAddress,
    ],
    [Endpoints.deleteAddress]: [
      validateMiddleware(DeleteAddressSchema),
      userCtrl.deleteUserAddress,
    ],
    [Endpoints.listAddress]: [validateMiddleware(DefaultQuerySchema), userCtrl.getUserAddressList],

    // category endpoints
    [Endpoints.getCategory]: [validateMiddleware(GetCategorySchema), categoryCtrl.getCategory],
    [Endpoints.listCategories]: [
      validateMiddleware(DefaultQuerySchema),
      categoryCtrl.listCategories,
    ],
    [Endpoints.listCategoryProducts]: [
      validateMiddleware(GetCategorySchema),
      categoryCtrl.listCategoryProducts,
    ],
    [Endpoints.createCategory]: [
      validateMiddleware(CreateCategorySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.createCategory,
    ],
    [Endpoints.updateCategory]: [
      validateMiddleware(UpdateCategorySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.updateCategory,
    ],
    [Endpoints.deleteCategory]: [
      validateMiddleware(DeleteCategorySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.deleteCategory,
    ],

    // product endpoints
    [Endpoints.getProduct]: [validateMiddleware(GetProductSchema), productCtrl.getProduct],
    [Endpoints.listProducts]: [validateMiddleware(DefaultQuerySchema), productCtrl.listProducts],
    [Endpoints.listProductStocks]: [
      validateMiddleware(GetProductSchema),
      productCtrl.listProductStocks,
    ],

    [Endpoints.createProduct]: [
      uploadMiddleware.single('image'),
      validateMiddleware(CreateProductSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.createProduct,
    ],
    [Endpoints.updateProduct]: [
      uploadMiddleware.single('image'),
      validateMiddleware(UpdateProductSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.updateProduct,
    ],
    [Endpoints.deleteProduct]: [
      validateMiddleware(DeleteProductSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.deleteProduct,
    ],

    // stock endpoints
    [Endpoints.getStock]: [validateMiddleware(DeleteStockSchema), stockCtrl.getStock],
    [Endpoints.listStocks]: [validateMiddleware(DefaultQuerySchema), stockCtrl.listStocks],
    [Endpoints.addStock]: [
      validateMiddleware(CreateStockSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.createStock,
    ],
    [Endpoints.updateStock]: [
      validateMiddleware(UpdateStockSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.updateStock,
    ],
    [Endpoints.deleteStock]: [
      validateMiddleware(DeleteStockSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.deleteStock,
    ],

    // color endpoints
    [Endpoints.getColor]: [validateMiddleware(DeleteColorSchema), colorCtrl.getColor],
    [Endpoints.listColors]: [colorCtrl.listColors],
    [Endpoints.createColor]: [
      validateMiddleware(CreateColorSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.createColor,
    ],
    [Endpoints.updateColor]: [
      validateMiddleware(UpdateColorSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.updateColor,
    ],
    [Endpoints.deleteColor]: [
      validateMiddleware(DeleteColorSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.deleteColor,
    ],

    // size endpoints
    [Endpoints.getSize]: [validateMiddleware(DeleteSizeSchema), sizeCtrl.getSize],
    [Endpoints.listSizes]: [sizeCtrl.listSizes],
    [Endpoints.createSize]: [
      validateMiddleware(CreateSizeSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.createSize,
    ],
    [Endpoints.updateSize]: [
      validateMiddleware(UpdateSizeSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.updateSize,
    ],
    [Endpoints.deleteSize]: [
      validateMiddleware(DeleteSizeSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.deleteSize,
    ],

    // image endpoints
    [Endpoints.addImages]: [
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      uploadMiddleware.array('images', 5),
      validateMiddleware(CreateImageSchema),
      imageCtrl.createImages,
    ],
    [Endpoints.updateImage]: [
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      validateMiddleware(PatchImageSchema),
      imageCtrl.updateImage,
    ],
    [Endpoints.deleteImage]: [
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
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
    [Endpoints.getOrder]: [validateMiddleware(GetOrderSchema), orderCtrl.getOrder],
    [Endpoints.listOrders]: [validateMiddleware(DefaultQuerySchema), orderCtrl.listOrders],
    [Endpoints.deleteOrder]: [validateMiddleware(GetOrderSchema), orderCtrl.deleteOrder],
    [Endpoints.adminGetOrder]: [
      validateMiddleware(GetOrderSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminGetOrder,
    ],
    [Endpoints.adminListOrders]: [
      validateMiddleware(DefaultQuerySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminListOrders,
    ],
    [Endpoints.adminUpdateOrderStatus]: [
      validateMiddleware(UpdateOrderStatusSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.updateOrderStatus,
    ],
    [Endpoints.adminDeleteOrder]: [
      validateMiddleware(GetOrderSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminDeleteOrder,
    ],

    // payment endpoints
    [Endpoints.createPayment]: [
      validateMiddleware(CreatePaymentSchema),
      paymentCtrl.transactionProcessedCb,
    ],
    [Endpoints.paymentResponse]: [paymentCtrl.transactionResponseCb],
    [Endpoints.getPayment]: [
      validateMiddleware(GetPaymentSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPayment,
    ],
    [Endpoints.listPayments]: [
      validateMiddleware(DefaultQuerySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPaymentList,
    ],

    // review endpoints
    [Endpoints.createReview]: [validateMiddleware(CreateReviewSchema), reviewCtrl.createReview],
    [Endpoints.updateReview]: [validateMiddleware(UpdateReviewSchema), reviewCtrl.updateReview],
    [Endpoints.deleteReview]: [validateMiddleware(DeleteReviewSchema), reviewCtrl.deleteReview],
    [Endpoints.getReview]: [validateMiddleware(GetReviewSchema), reviewCtrl.getReview],
    [Endpoints.listReviews]: [validateMiddleware(ListReviewsSchema), reviewCtrl.listReviews],
    [Endpoints.listProductReviews]: [
      validateMiddleware(ListProductReviewsSchema),
      reviewCtrl.listProductReviews,
    ],
  };

  /** Register all the routes and their handlers */
  Object.entries(HANDLER).forEach(([endpoint, handlers]) => {
    const { url, method, sensitive, auth } = ENDPOINT_CONFIGS[endpoint as Endpoints];

    if (legRequests && !sensitive) {
      handlers = [loggerMiddleware, ...handlers];
    }
    if (auth) {
      handlers = [authMiddleware.enforceJwtMiddleware, ...handlers];
    }

    handlers = [authMiddleware.jwtParseMiddleware, ...handlers];

    const withErrorHandler = handlers.map(handler => errHandler(handler));
    router[method](url, ...withErrorHandler);
  });

  return router;
};
