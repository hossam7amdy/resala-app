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
  CreateProductImageSchema,
  CreateProductSchema,
  CreateSizeSchema,
  CreateStockSchema,
  CreateWishlistSchema,
  DefaultQuerySchema,
  DeleteAddressSchema,
  DeleteCartSchema,
  DeleteCategorySchema,
  DeleteColorSchema,
  DeleteProductImageSchema,
  DeleteProductSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  ENDPOINT_CONFIGS,
  Endpoints,
  ForgotPasswordSchema,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  UpdateAddressSchema,
  UpdateCategorySchema,
  UpdateColorSchema,
  UpdateProductSchema,
  UpdateProfileSchema,
  UpdateSizeSchema,
  UpdateStockSchema,
  VerifyEmailSchema,
} from '@resala/shared';
import { Request, RequestHandler, Response, Router } from 'express';

import {
  authCtrl,
  categoryCtrl,
  colorCtrl,
  orderCtrl,
  paymentCtrl,
  productCtrl,
  shoppingCtrl,
  sizeCtrl,
  stockCtrl,
  userCtrl,
} from '../controller';
import { authenticateToken, authorizeUser } from '../middleware/auth-middleware';
import { errHandler } from '../middleware/error-middleware';
import { loggerMiddleware } from '../middleware/logger-middleware';
import { uploadMultiple } from '../middleware/upload-middleware';
import { validate } from '../middleware/validate-middleware';

export function createExpressRouter(legRequests: boolean) {
  const router = Router();

  /** Define the handlers for each endpoint */
  const HANDLER: { [key in Endpoints]: RequestHandler<any, any, any, any, any>[] } = {
    // health check
    [Endpoints.healthz]: [(_: Request, res: Response) => res.send('OK 🤞')],

    // auth endpoints
    [Endpoints.login]: [validate(LoginSchema), authCtrl.login],
    [Endpoints.register]: [validate(RegisterSchema), authCtrl.register],
    [Endpoints.verifyEmail]: [validate(VerifyEmailSchema), authCtrl.verifyEmail],
    [Endpoints.forgotPassword]: [validate(ForgotPasswordSchema), authCtrl.forgotPassword],
    [Endpoints.resetPassword]: [validate(ResetPasswordSchema), authCtrl.resetPassword],
    [Endpoints.changePassword]: [validate(ChangePasswordSchema), authCtrl.changePassword],
    [Endpoints.resendEmailVerification]: [authCtrl.resendVerificationEmail],

    // user endpoints
    [Endpoints.getCurrentUser]: [userCtrl.getProfile],
    [Endpoints.updateCurrentUser]: [validate(UpdateProfileSchema), userCtrl.updateProfile],

    // admin user endpoints
    [Endpoints.adminUpdateUser]: [
      validate(AdminUpdateUserSchema),
      authorizeUser(['ADMIN']),
      userCtrl.adminUpdateUser,
    ],
    [Endpoints.adminGetUser]: [
      validate(AdminGetUserSchema),
      authorizeUser(['ADMIN']),
      userCtrl.adminGetUser,
    ],
    [Endpoints.adminGetUsersList]: [
      validate(DefaultQuerySchema),
      authorizeUser(['ADMIN']),
      userCtrl.adminGetUsersList,
    ],
    [Endpoints.adminDeleteUser]: [
      validate(AdminDeleteUserSchema),
      authorizeUser(['ADMIN']),
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
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.createCategory,
    ],
    [Endpoints.updateCategory]: [
      validate(UpdateCategorySchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.updateCategory,
    ],
    [Endpoints.deleteCategory]: [
      validate(DeleteCategorySchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.deleteCategory,
    ],

    // product endpoints
    [Endpoints.getProduct]: [validate(DeleteProductSchema), productCtrl.getProduct],
    [Endpoints.getProductsList]: [validate(DefaultQuerySchema), productCtrl.getProductsList],
    [Endpoints.createProduct]: [
      validate(CreateProductSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.createProduct,
    ],
    [Endpoints.updateProduct]: [
      validate(UpdateProductSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.updateProduct,
    ],
    [Endpoints.deleteProduct]: [
      validate(DeleteProductSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.deleteProduct,
    ],
    [Endpoints.listProductImages]: [validate(DefaultQuerySchema), productCtrl.listProductImages],
    [Endpoints.getProductStocks]: [validate(DeleteProductSchema), productCtrl.listProductStocks],
    [Endpoints.addProductImages]: [
      validate(CreateProductImageSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      uploadMultiple('images'),
      productCtrl.addProductImages,
    ],
    [Endpoints.deleteProductImage]: [
      validate(DeleteProductImageSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.deleteProductImage,
    ],

    // stock endpoints
    [Endpoints.getStock]: [validate(DeleteStockSchema), stockCtrl.getStock],
    [Endpoints.getStocksList]: [validate(DefaultQuerySchema), stockCtrl.getStocksList],
    [Endpoints.addStock]: [
      validate(CreateStockSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.createStock,
    ],
    [Endpoints.updateStock]: [
      validate(UpdateStockSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.updateStock,
    ],
    [Endpoints.deleteStock]: [
      validate(DeleteStockSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      stockCtrl.deleteStock,
    ],

    // color endpoints
    [Endpoints.getColor]: [validate(DeleteColorSchema), colorCtrl.getColor],
    [Endpoints.getColorsList]: [colorCtrl.getColorsList],
    [Endpoints.createColor]: [
      validate(CreateColorSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.createColor,
    ],
    [Endpoints.updateColor]: [
      validate(UpdateColorSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.updateColor,
    ],
    [Endpoints.deleteColor]: [
      validate(DeleteColorSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      colorCtrl.deleteColor,
    ],

    // size endpoints
    [Endpoints.getSize]: [validate(DeleteSizeSchema), sizeCtrl.getSize],
    [Endpoints.getSizesList]: [sizeCtrl.getSizesList],
    [Endpoints.createSize]: [
      validate(CreateSizeSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.createSize,
    ],
    [Endpoints.updateSize]: [
      validate(UpdateSizeSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      sizeCtrl.updateSize,
    ],
    [Endpoints.deleteSize]: [
      validate(DeleteSizeSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
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
      authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminGetOrder,
    ],
    [Endpoints.adminGetOrdersList]: [
      validate(DefaultQuerySchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminGetOrdersList,
    ],
    [Endpoints.adminDeleteOrder]: [
      validate(GetOrderSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      orderCtrl.adminDeleteOrder,
    ],

    // payment endpoints
    [Endpoints.createPayment]: [validate(CreatePaymentSchema), paymentCtrl.createPayment],
    [Endpoints.paymentResponse]: [paymentCtrl.paymentResponse],
    [Endpoints.getPayment]: [
      validate(GetPaymentSchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPayment,
    ],
    [Endpoints.getPaymentsList]: [
      validate(DefaultQuerySchema),
      authorizeUser(['ADMIN', 'MODERATOR']),
      paymentCtrl.getPaymentList,
    ],
  };

  /** Register all the routes and their handlers */
  Object.entries(HANDLER).forEach(([endpoint, handlers]) => {
    const { url, method, sensitive, auth } = ENDPOINT_CONFIGS[endpoint as Endpoints];

    if (legRequests && !sensitive) {
      handlers = [loggerMiddleware, ...handlers];
    }
    if (auth) {
      handlers = [authenticateToken, ...handlers];
    }

    const withErrorHandler = handlers.map(handler => errHandler(handler));
    router[method](url, ...withErrorHandler);
  });

  return router;
}
