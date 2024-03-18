import { ENDPOINT_CONFIGS, Endpoints } from '@resala/shared';
import { Request, RequestHandler, Response, Router } from 'express';

import {
  authCtrl,
  authValidator,
  categoryCtrl,
  categoryValidator,
  colorCtrl,
  colorValidator,
  productCtrl,
  productValidator,
  shoppingCtrl,
  shoppingValidator,
  sizeCtrl,
  sizeValidator,
  stockCtrl,
  stockValidator,
  userCtrl,
  userValidator,
} from '../controller';
import { authenticateToken, authorizeUser } from '../middleware/auth-middleware';
import { errHandler } from '../middleware/error-middleware';
import { loggerMiddleware } from '../middleware/logger-middleware';
import { uploadMultiple } from '../middleware/upload-middleware';

export function createExpressRouter(legRequests: boolean) {
  const router = Router();

  /** Define the handlers for each endpoint */
  const HANDLER: { [key in Endpoints]: RequestHandler<any, any, any, any, any>[] } = {
    // health check
    [Endpoints.healthz]: [(_: Request, res: Response) => res.send('OK 🤞')],

    // auth endpoints
    [Endpoints.login]: [authValidator.validateLogin, authCtrl.login],
    [Endpoints.register]: [authValidator.validateRegistration, authCtrl.register],
    [Endpoints.forgotPassword]: [authValidator.validateForgotPassword, authCtrl.forgotPassword],
    [Endpoints.resetPassword]: [authValidator.validateResetPassword, authCtrl.resetPassword],
    [Endpoints.verifyEmail]: [authCtrl.verifyEmail],
    [Endpoints.changePassword]: [authValidator.validateChangePassword, authCtrl.changePassword],
    [Endpoints.resendEmailVerification]: [authCtrl.resendVerificationEmail],

    // user endpoints
    [Endpoints.getCurrentUser]: [userCtrl.getProfile],
    [Endpoints.updateCurrentUser]: [userValidator.validateUpdateProfile, userCtrl.updateProfile],

    // shopping endpoints
    [Endpoints.getUserCart]: [shoppingCtrl.getUserCart],
    [Endpoints.addItemToCart]: [shoppingValidator.validateCart, shoppingCtrl.addItemToCart],
    [Endpoints.removeItemFromCart]: [shoppingCtrl.removeItemFromCart],
    [Endpoints.getUserWishlist]: [shoppingCtrl.getUserWishlist],
    [Endpoints.addProductToWishlist]: [
      shoppingValidator.validateWishlist,
      shoppingCtrl.addProductToWishlist,
    ],
    [Endpoints.removeProductFromWishlist]: [shoppingCtrl.removeProductFromWishlist],

    // admin user endpoints
    [Endpoints.adminUpdateUser]: [
      userValidator.validateAdminUpdateUser,
      authorizeUser(['ADMIN']),
      userCtrl.adminUpdateUser,
    ],
    [Endpoints.adminGetUser]: [authorizeUser(['ADMIN']), userCtrl.adminGetUser],
    [Endpoints.adminGetUsersList]: [authorizeUser(['ADMIN']), userCtrl.adminGetUsersList],
    [Endpoints.adminDeleteUser]: [authorizeUser(['ADMIN']), userCtrl.adminDeleteUser],

    // user address endpoints
    [Endpoints.createAddress]: [userValidator.validateCreateAddress, userCtrl.createUserAddress],
    [Endpoints.updateAddress]: [userValidator.validateUpdateAddress, userCtrl.updateUserAddress],
    [Endpoints.deleteAddress]: [userCtrl.deleteUserAddress],
    [Endpoints.getAddressList]: [userCtrl.getUserAddressList],

    // category endpoints
    [Endpoints.getCategory]: [categoryCtrl.getCategory],
    [Endpoints.listCategories]: [categoryCtrl.listCategories],
    [Endpoints.listSubcategories]: [categoryCtrl.listSubCategories],
    [Endpoints.listCategoryProducts]: [categoryCtrl.listCategoryProducts],
    [Endpoints.createCategory]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryValidator.validateCreateCategory,
      categoryCtrl.createCategory,
    ],
    [Endpoints.createSubcategory]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryValidator.validateCreateCategory,
      categoryCtrl.createSubcategory,
    ],
    [Endpoints.updateCategory]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryValidator.validateUpdateCategory,
      categoryCtrl.updateCategory,
    ],
    [Endpoints.deleteCategory]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      categoryCtrl.deleteCategory,
    ],

    // product endpoints
    [Endpoints.getProduct]: [productCtrl.getProduct],
    [Endpoints.getProductsList]: [productCtrl.getProductsList],
    [Endpoints.createProduct]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      productValidator.validateCreateProduct,
      productCtrl.createProduct,
    ],
    [Endpoints.updateProduct]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      productValidator.validateUpdateProduct,
      productCtrl.updateProduct,
    ],
    [Endpoints.deleteProduct]: [authorizeUser(['ADMIN', 'MODERATOR']), productCtrl.deleteProduct],
    [Endpoints.listProductImages]: [productCtrl.listProductImages],
    [Endpoints.addProductImages]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      uploadMultiple('images'),
      productCtrl.addProductImages,
    ],
    [Endpoints.deleteProductImage]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      productCtrl.deleteProductImage,
    ],

    // stock endpoints
    [Endpoints.getStock]: [stockCtrl.getStock],
    [Endpoints.getStocksList]: [stockCtrl.getStocksList],
    [Endpoints.createStock]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      stockValidator.validateCreateStock,
      stockCtrl.createStock,
    ],
    [Endpoints.updateStock]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      stockValidator.validateUpdateStock,
      stockCtrl.updateStock,
    ],

    // color endpoints
    [Endpoints.getColor]: [colorCtrl.getColor],
    [Endpoints.getColorsList]: [colorCtrl.getColorsList],
    [Endpoints.createColor]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      colorValidator.validateCreateColor,
      colorCtrl.createColor,
    ],
    [Endpoints.updateColor]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      colorValidator.validateUpdateColor,
      colorCtrl.updateColor,
    ],

    // size endpoints
    [Endpoints.getSize]: [sizeCtrl.getSize],
    [Endpoints.getSizesList]: [sizeCtrl.getSizesList],
    [Endpoints.createSize]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      sizeValidator.validateCreateSize,
      sizeCtrl.createSize,
    ],
    [Endpoints.updateSize]: [
      authorizeUser(['ADMIN', 'MODERATOR']),
      sizeValidator.validateUpdateSize,
      sizeCtrl.updateSize,
    ],
  };

  // Register all the routes and their handlers
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
