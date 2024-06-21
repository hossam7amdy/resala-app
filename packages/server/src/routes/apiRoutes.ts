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
  DeleteProductSchema,
  DeleteReviewSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  ENDPOINT_CONFIGS,
  Endpoints,
  ForgotPasswordSchema,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  GetReviewSchema,
  ListProductReviewsSchema,
  ListReviewsSchema,
  LoginSchema,
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
  uploadMultiple,
  uploadSingle,
  validate,
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
  LocalFileStorageService,
  NotificationService,
  OrderService,
  PaymentService,
  PaymobPaymentService,
  ReviewService,
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
  const fileService = new FileService(new LocalFileStorageService());
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
  const stockCtrl = new StockController(inventoryService, fileService);
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
    [Endpoints.login]: [validate(LoginSchema), authCtrl.login],
    [Endpoints.register]: [validate(RegisterSchema), authCtrl.register],
    [Endpoints.refresh]: [validate(RefreshTokenSchema), authCtrl.refresh],
    [Endpoints.verifyEmail]: [validate(VerifyEmailSchema), authCtrl.verifyEmail],
    [Endpoints.forgotPassword]: [validate(ForgotPasswordSchema), authCtrl.forgotPassword],
    [Endpoints.resetPassword]: [validate(ResetPasswordSchema), authCtrl.resetPassword],
    [Endpoints.changePassword]: [validate(ChangePasswordSchema), authCtrl.changePassword],
    [Endpoints.resendEmailVerification]: [authCtrl.resendVerificationEmail],

    // user endpoints
    [Endpoints.getCurrentUser]: [userCtrl.getProfile],
    [Endpoints.updateCurrentUser]: [validate(UpdateProfileSchema), userCtrl.updateProfile],

    // admin user endpoints
    [Endpoints.adminGetUser]: [
      validate(AdminGetUserSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      userCtrl.adminGetUser,
    ],
    [Endpoints.adminGetUsersList]: [
      validate(DefaultQuerySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      userCtrl.adminGetUsersList,
    ],
    [Endpoints.adminUpdateUser]: [
      validate(AdminUpdateUserSchema),
      authMiddleware.authorizeUser(['ADMIN']),
      userCtrl.adminUpdateUser,
    ],
    [Endpoints.adminDeleteUser]: [
      validate(AdminDeleteUserSchema),
      authMiddleware.authorizeUser(['ADMIN']),
      userCtrl.adminDeleteUser,
    ],

    // user address endpoints
    [Endpoints.createAddress]: [validate(CreateAddressSchema), userCtrl.createUserAddress],
    [Endpoints.updateAddress]: [validate(UpdateAddressSchema), userCtrl.updateUserAddress],
    [Endpoints.deleteAddress]: [validate(DeleteAddressSchema), userCtrl.deleteUserAddress],
    [Endpoints.getAddressList]: [validate(DefaultQuerySchema), userCtrl.getUserAddressList],

    // category endpoints
    [Endpoints.getCategory]: [validate(GetCategorySchema), categoryCtrl.getCategory],
    [Endpoints.listCategories]: [validate(DefaultQuerySchema), categoryCtrl.listCategories],
    [Endpoints.listCategoryProducts]: [
      validate(GetCategorySchema),
      categoryCtrl.listCategoryProducts,
    ],
    [Endpoints.createCategory]: [
      validate(CreateCategorySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.createCategory,
    ],
    [Endpoints.updateCategory]: [
      validate(UpdateCategorySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.updateCategory,
    ],
    [Endpoints.deleteCategory]: [
      validate(DeleteCategorySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.deleteCategory,
    ],

    // product endpoints
    [Endpoints.getProduct]: [validate(DeleteProductSchema), productCtrl.getProduct],
    [Endpoints.getProductsList]: [validate(DefaultQuerySchema), productCtrl.getProductsList],
    [Endpoints.createProduct]: [
      uploadSingle('image'),
      validate(CreateProductSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.createProduct,
    ],
    [Endpoints.updateProduct]: [
      uploadSingle('image'),
      validate(UpdateProductSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.updateProduct,
    ],
    [Endpoints.deleteProduct]: [
      validate(DeleteProductSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.deleteProduct,
    ],
    [Endpoints.listProductImages]: [validate(DeleteProductSchema)],
    [Endpoints.getProductStocks]: [validate(DeleteProductSchema), productCtrl.listProductStocks],
    [Endpoints.addProductImages]: [
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      uploadMultiple('images'),
    ],
    [Endpoints.deleteProductImage]: [authMiddleware.authorizeUser(['ADMIN', 'MODERATOR'])],

    // stock endpoints
    [Endpoints.getStock]: [validate(DeleteStockSchema), stockCtrl.getStock],
    [Endpoints.getStocksList]: [validate(DefaultQuerySchema), stockCtrl.getStocksList],
    [Endpoints.addStock]: [
      validate(CreateStockSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.createStock,
    ],
    [Endpoints.updateStock]: [
      validate(UpdateStockSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.updateStock,
    ],
    [Endpoints.deleteStock]: [
      validate(DeleteStockSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.deleteStock,
    ],

    // color endpoints
    [Endpoints.getColor]: [validate(DeleteColorSchema), colorCtrl.getColor],
    [Endpoints.getColorsList]: [colorCtrl.getColorsList],
    [Endpoints.createColor]: [
      validate(CreateColorSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.createColor,
    ],
    [Endpoints.updateColor]: [
      validate(UpdateColorSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.updateColor,
    ],
    [Endpoints.deleteColor]: [
      validate(DeleteColorSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.deleteColor,
    ],

    // size endpoints
    [Endpoints.getSize]: [validate(DeleteSizeSchema), sizeCtrl.getSize],
    [Endpoints.getSizesList]: [sizeCtrl.getSizesList],
    [Endpoints.createSize]: [
      validate(CreateSizeSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.createSize,
    ],
    [Endpoints.updateSize]: [
      validate(UpdateSizeSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.updateSize,
    ],
    [Endpoints.deleteSize]: [
      validate(DeleteSizeSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.deleteSize,
    ],

    // shopping endpoints
    [Endpoints.addItemToCart]: [validate(CreateCartSchema), shoppingCtrl.addItemToCart],
    [Endpoints.removeItemFromCart]: [validate(DeleteCartSchema), shoppingCtrl.removeItemFromCart],
    [Endpoints.getUserCart]: [shoppingCtrl.getUserCart],
    [Endpoints.removeUserCart]: [shoppingCtrl.removeUserCart],

    [Endpoints.addProductToWishlist]: [
      validate(CreateWishlistSchema),
      shoppingCtrl.addProductToWishlist,
    ],
    [Endpoints.removeProductFromWishlist]: [
      validate(CreateWishlistSchema),
      shoppingCtrl.removeProductFromWishlist,
    ],
    [Endpoints.getUserWishlist]: [shoppingCtrl.getUserWishlist],
    [Endpoints.removeUserWishlist]: [shoppingCtrl.removeUserWishlist],

    // order endpoints
    [Endpoints.createOrder]: [validate(CreateOrderSchema), orderCtrl.createOrder],
    [Endpoints.getOrder]: [validate(GetOrderSchema), orderCtrl.getOrder],
    [Endpoints.getOrdersList]: [validate(DefaultQuerySchema), orderCtrl.getOrdersList],
    [Endpoints.deleteOrder]: [validate(GetOrderSchema), orderCtrl.deleteOrder],
    [Endpoints.adminGetOrder]: [
      validate(GetOrderSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminGetOrder,
    ],
    [Endpoints.adminGetOrdersList]: [
      validate(DefaultQuerySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminGetOrdersList,
    ],
    [Endpoints.adminUpdateOrderStatus]: [
      validate(UpdateOrderStatusSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.updateOrderStatus,
    ],
    [Endpoints.adminDeleteOrder]: [
      validate(GetOrderSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminDeleteOrder,
    ],

    // payment endpoints
    [Endpoints.createPayment]: [validate(CreatePaymentSchema), paymentCtrl.createPayment],
    [Endpoints.paymentResponse]: [paymentCtrl.paymentResponse],
    [Endpoints.getPayment]: [
      validate(GetPaymentSchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPayment,
    ],
    [Endpoints.getPaymentsList]: [
      validate(DefaultQuerySchema),
      authMiddleware.authorizeUser(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPaymentList,
    ],

    // review endpoints
    [Endpoints.createReview]: [validate(CreateReviewSchema), reviewCtrl.createReview],
    [Endpoints.updateReview]: [validate(UpdateReviewSchema), reviewCtrl.updateReview],
    [Endpoints.deleteReview]: [validate(DeleteReviewSchema), reviewCtrl.deleteReview],
    [Endpoints.getReview]: [validate(GetReviewSchema), reviewCtrl.getReview],
    [Endpoints.listReviews]: [validate(ListReviewsSchema), reviewCtrl.listReviews],
    [Endpoints.listProductReviews]: [
      validate(ListProductReviewsSchema),
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
