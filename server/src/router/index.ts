import { ENDPOINT_CONFIGS, Endpoints } from '@resala/shared';
import { RequestHandler, Router } from 'express';

import {
  addressCtrl,
  authCtrl,
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
} from '../controller';
import { authenticateToken, authorizeUser } from '../middleware/auth-middleware';
import { errHandler } from '../middleware/error-middleware';
import { loggerMiddleware } from '../middleware/logger-middleware';
import { uploadMultiple } from '../middleware/upload-middleware';

const router = Router();

/** Define the handlers for each endpoint */
const HANDLER: { [key in Endpoints]: RequestHandler[] } = {
  [Endpoints.healthz]: [(_, res) => res.send('OK 🤞')],

  [Endpoints.login]: [authCtrl.login],
  [Endpoints.register]: [authCtrl.register],
  [Endpoints.forgotPassword]: [authCtrl.forgotPassword],
  [Endpoints.resetPassword]: [authCtrl.resetPassword],
  [Endpoints.verifyEmail]: [authCtrl.verifyEmail],
  [Endpoints.changePassword]: [userCtrl.changePassword],
  [Endpoints.resendEmailVerification]: [userCtrl.resendVerificationEmail],
  [Endpoints.getCurrentUser]: [userCtrl.getProfile],
  [Endpoints.updateCurrentUser]: [userCtrl.updateProfile],

  [Endpoints.getUserCart]: [shoppingCtrl.getUserCart],
  [Endpoints.addItemToCart]: [shoppingValidator.validateCart, shoppingCtrl.addItemToCart],
  [Endpoints.removeItemFromCart]: [shoppingCtrl.removeItemFromCart],
  [Endpoints.getUserWishlist]: [shoppingCtrl.getUserWishlist],
  [Endpoints.addProductToWishlist]: [
    shoppingValidator.validateWishlist,
    shoppingCtrl.addProductToWishlist,
  ],
  [Endpoints.removeProductFromWishlist]: [shoppingCtrl.removeProductFromWishlist],

  [Endpoints.adminAddUser]: [authorizeUser(['ADMIN']), userCtrl.adminCreateUser],
  [Endpoints.adminUpdateUser]: [authorizeUser(['ADMIN']), userCtrl.adminUpdateUser],
  [Endpoints.adminGetUser]: [authorizeUser(['ADMIN']), userCtrl.adminGetUser],
  [Endpoints.adminGetUsersList]: [authorizeUser(['ADMIN']), userCtrl.adminGetUsersList],
  [Endpoints.adminDeleteUser]: [authorizeUser(['ADMIN']), userCtrl.adminDeleteUser],

  [Endpoints.createAddress]: [addressCtrl.createAddress],
  [Endpoints.updateAddress]: [addressCtrl.updateAddress],
  [Endpoints.deleteAddress]: [addressCtrl.deleteAddress],
  [Endpoints.getAddressList]: [addressCtrl.getAddressList],

  [Endpoints.getCategory]: [categoryCtrl.getCategory],
  [Endpoints.getCategoryList]: [categoryCtrl.getCategoryList],
  [Endpoints.getCategoryProducts]: [categoryCtrl.getCategoryProducts],
  [Endpoints.getSubCategories]: [categoryCtrl.getSubCategories],
  [Endpoints.createCategory]: [
    authorizeUser(['ADMIN', 'MODERATOR']),
    categoryValidator.validateCreateCategory,
    categoryCtrl.createCategory,
  ],
  [Endpoints.updateCategory]: [
    authorizeUser(['ADMIN', 'MODERATOR']),
    categoryValidator.validateUpdateCategory,
    categoryCtrl.updateCategory,
  ],
  [Endpoints.deleteCategory]: [authorizeUser(['ADMIN', 'MODERATOR']), categoryCtrl.deleteCategory],
  [Endpoints.restoreCategory]: [
    authorizeUser(['ADMIN', 'MODERATOR']),
    categoryCtrl.restoreCategory,
  ],

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
  [Endpoints.restoreProduct]: [authorizeUser(['ADMIN', 'MODERATOR']), productCtrl.restoreProduct],
  [Endpoints.addProductImages]: [
    authorizeUser(['ADMIN', 'MODERATOR']),
    uploadMultiple('images'),
    productCtrl.addProductImages,
  ],
  [Endpoints.deleteProductImage]: [
    authorizeUser(['ADMIN', 'MODERATOR']),
    productCtrl.deleteProductImage,
  ],

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

  if (!sensitive) {
    handlers = [loggerMiddleware, ...handlers];
  }
  if (auth) {
    handlers = [authenticateToken, ...handlers];
  }

  const withErrorHandler = handlers.map(handler => errHandler(handler));
  router[method](url, ...withErrorHandler);
});

export default router;
