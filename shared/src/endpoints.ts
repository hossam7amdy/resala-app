/**
 * @fileoverview Endpoints configuration
 *
 * This file contains the configuration for all the endpoints in the application.
 */

/**
 * Endpoint configuration type definition for the application.
 */
export type EndpointConfig = {
  url: string;
  method: 'put' | 'patch' | 'get' | 'post' | 'delete';
  auth?: boolean;
  sensitive?: boolean; // Skips logging request body
};

/**
 * Enum for all the endpoints in the application.
 */
export enum Endpoints {
  healthz = 'healthz',

  // auth endpoints
  login = 'login',
  register = 'register',
  forgotPassword = 'forgotPassword',
  resetPassword = 'resetPassword',
  changePassword = 'changePassword',
  verifyEmail = 'verifyEmail',
  resendEmailVerification = 'resendEmailVerification',

  // user endpoints
  getCurrentUser = 'getCurrentUser',
  updateCurrentUser = 'updateCurrentUser',
  adminGetUser = 'adminGetUser',
  adminGetUsersList = 'adminGetUsersList',
  adminUpdateUser = 'adminUpdateUser',
  adminDeleteUser = 'adminDeleteUser',

  // address endpoints
  createAddress = 'createAddress',
  getAddressList = 'getAddressList',
  updateAddress = 'updateAddress',
  deleteAddress = 'deleteAddress',

  // category endpoints
  getCategory = 'getCategory',
  listCategories = 'listCategories',
  listCategoryProducts = 'listCategoryProducts',
  createCategory = 'createCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',

  // product endpoints
  getProduct = 'getProduct',
  getProductsList = 'getProductsList',
  createProduct = 'createProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',
  addProductImages = 'addProductImages',
  getProductStocks = 'getProductStocks',
  listProductImages = 'listProductImages',
  deleteProductImage = 'deleteProductImage',

  // stock endpoints
  addStock = 'addStock',
  getStock = 'getStock',
  getStocksList = 'getStocksList',
  updateStock = 'updateStock',
  deleteStock = 'deleteStock',

  // color endpoints
  getColor = 'getColor',
  getColorsList = 'getColorsList',
  createColor = 'createColor',
  updateColor = 'updateColor',
  deleteColor = 'deleteColor',

  // size endpoints
  getSize = 'getSize',
  getSizesList = 'getSizesList',
  createSize = 'createSize',
  updateSize = 'updateSize',
  deleteSize = 'deleteSize',

  // shopping endpoints
  getUserCart = 'getUserCart',
  addItemToCart = 'addItemToCart',
  removeUserCart = 'removeUserCart',
  removeItemFromCart = 'removeItemFromCart',
  getUserWishlist = 'getUserWishlist',
  addProductToWishlist = 'addProductToWishlist',
  removeUserWishlist = 'removeUserWishlist',
  removeProductFromWishlist = 'removeProductFromWishlist',

  // order endpoints
  createOrder = 'createOrder',
  getOrder = 'getOrder',
  getOrdersList = 'getOrdersList',
  deleteOrder = 'deleteOrder',
  adminGetOrder = 'adminGetOrder',
  adminGetOrdersList = 'adminGetOrdersList',
  adminDeleteOrder = 'adminDeleteOrder',

  // payment endpoints
  createPayment = 'createPayment',
  getPayment = 'getPayment',
  getPaymentsList = 'getPaymentsList',
}

/**
 * Function to add params to the endpoint url
 *
 * @param endpoint EndpointConfig
 * @param params string[]
 * @returns EndpointConfig
 *
 * @example
 * withParams(ENDPOINT_CONFIGS.getProduct, '123')
 * // returns { url: '/api/v1/products/123', method: 'get' }
 *
 * withParams(ENDPOINT_CONFIGS.adminGetUser, '123')
 * // returns { url: '/api/v1/users/123', method: 'get' }
 */
export function withParams(endpoint: EndpointConfig, ...params: string[]): EndpointConfig {
  let url = endpoint.url;
  const placeholders = url.match(/:[^\/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${placeholders.length < params.length ? 'many' : 'few'} params for url: ${url}!`;
  }
  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index], params[index]);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
}

/**
 * Endpoint configuration for all the endpoints in the application.
 *
 * @example
 *
 * ENDPOINT_CONFIGS.healthz
 * // returns { url: '/api/v1/healthz', method: 'get' }
 *
 * ENDPOINT_CONFIGS.login
 * // returns { url: '/api/v1/auth/login', method: 'post', sensitive: true }
 */
export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  // health check
  [Endpoints.healthz]: { method: 'get', url: '/api/v1/healthz' },

  // auth endpoints
  [Endpoints.login]: {
    method: 'post',
    url: '/api/v1/auth/login',
    sensitive: true,
  },
  [Endpoints.register]: {
    method: 'post',
    url: '/api/v1/auth/register',
    sensitive: true,
  },
  [Endpoints.forgotPassword]: {
    method: 'post',
    url: '/api/v1/auth/forgot-password',
  },
  [Endpoints.resetPassword]: {
    method: 'post',
    url: '/api/v1/auth/reset-password',
    sensitive: true,
  },
  [Endpoints.verifyEmail]: {
    method: 'post',
    url: '/api/v1/auth/verify-email',
  },
  [Endpoints.changePassword]: {
    method: 'patch',
    url: '/api/v1/auth/change-password',
    sensitive: true,
    auth: true,
  },
  [Endpoints.resendEmailVerification]: {
    method: 'get',
    url: '/api/v1/auth/resend-email-verification',
    auth: true,
  },

  // user endpoints
  [Endpoints.getCurrentUser]: {
    method: 'get',
    url: '/api/v1/users/self',
    auth: true,
  },
  [Endpoints.updateCurrentUser]: {
    method: 'put',
    url: '/api/v1/users/self',
    auth: true,
  },

  // admin user endpoints
  [Endpoints.adminUpdateUser]: {
    method: 'put',
    url: '/api/v1/users/:userId',
    auth: true,
  },
  [Endpoints.adminGetUser]: {
    method: 'get',
    url: '/api/v1/users/:userId',
    auth: true,
  },
  [Endpoints.adminGetUsersList]: {
    method: 'get',
    url: '/api/v1/users',
    auth: true,
  },
  [Endpoints.adminDeleteUser]: {
    method: 'delete',
    url: '/api/v1/users/:userId',
    auth: true,
  },

  // address endpoints
  [Endpoints.createAddress]: {
    url: '/api/v1/users/self/addresses',
    method: 'post',
    auth: true,
  },
  [Endpoints.getAddressList]: {
    url: '/api/v1/users/self/addresses',
    method: 'get',
    auth: true,
  },
  [Endpoints.updateAddress]: {
    url: '/api/v1/users/self/addresses/:addressId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteAddress]: {
    url: '/api/v1/users/self/addresses/:addressId',
    method: 'delete',
    auth: true,
  },

  // category endpoints
  [Endpoints.listCategories]: {
    url: '/api/v1/categories',
    method: 'get',
  },
  [Endpoints.createCategory]: {
    url: '/api/v1/categories',
    method: 'post',
    auth: true,
  },
  [Endpoints.getCategory]: {
    url: '/api/v1/categories/:categoryId',
    method: 'get',
  },
  [Endpoints.updateCategory]: {
    url: '/api/v1/categories/:categoryId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteCategory]: {
    url: '/api/v1/categories/:categoryId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.listCategoryProducts]: {
    url: '/api/v1/categories/:categoryId/products',
    method: 'get',
  },

  // product endpoints
  [Endpoints.getProduct]: {
    url: '/api/v1/products/:productId',
    method: 'get',
  },
  [Endpoints.getProductsList]: {
    url: '/api/v1/products',
    method: 'get',
  },
  [Endpoints.createProduct]: {
    url: '/api/v1/products',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateProduct]: {
    url: '/api/v1/products/:productId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteProduct]: {
    url: '/api/v1/products/:productId',
    method: 'delete',
    auth: true,
  },

  // product images endpoints
  [Endpoints.addProductImages]: {
    url: '/api/v1/products/:productId/images',
    method: 'post',
    auth: true,
  },
  [Endpoints.listProductImages]: {
    url: '/api/v1/products/:productId/images',
    method: 'get',
    auth: true,
  },
  [Endpoints.deleteProductImage]: {
    url: '/api/v1/products/:productId/images/:imageId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.getProductStocks]: {
    url: '/api/v1/products/:productId/stocks',
    method: 'get',
  },

  // stock endpoints
  [Endpoints.addStock]: {
    url: '/api/v1/stocks',
    method: 'post',
    auth: true,
  },
  [Endpoints.getStock]: {
    url: '/api/v1/stocks/:stockId',
    method: 'get',
  },
  [Endpoints.getStocksList]: {
    url: '/api/v1/stocks',
    method: 'get',
  },
  [Endpoints.updateStock]: {
    url: '/api/v1/stocks/:stockId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteStock]: {
    url: '/api/v1/stocks/:stockId',
    method: 'delete',
    auth: true,
  },

  // color endpoints
  [Endpoints.getColor]: {
    url: '/api/v1/colors/:colorId',
    method: 'get',
  },
  [Endpoints.getColorsList]: {
    url: '/api/v1/colors',
    method: 'get',
  },
  [Endpoints.createColor]: {
    url: '/api/v1/colors',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateColor]: {
    url: '/api/v1/colors/:colorId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteColor]: {
    url: '/api/v1/colors/:colorId',
    method: 'delete',
    auth: true,
  },

  // size endpoints
  [Endpoints.getSize]: {
    url: '/api/v1/sizes/:sizeId',
    method: 'get',
  },
  [Endpoints.getSizesList]: {
    url: '/api/v1/sizes',
    method: 'get',
  },
  [Endpoints.createSize]: {
    url: '/api/v1/sizes',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateSize]: {
    url: '/api/v1/sizes/:sizeId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteSize]: {
    url: '/api/v1/sizes/:sizeId',
    method: 'delete',
    auth: true,
  },

  // shopping endpoints
  [Endpoints.addItemToCart]: {
    url: '/api/v1/cart/items',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeItemFromCart]: {
    url: '/api/v1/cart/items/:stockId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.getUserCart]: {
    url: '/api/v1/cart',
    method: 'get',
    auth: true,
  },
  [Endpoints.removeUserCart]: {
    url: '/api/v1/cart',
    method: 'delete',
    auth: true,
  },

  [Endpoints.addProductToWishlist]: {
    url: '/api/v1/wishlist/items',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeProductFromWishlist]: {
    url: '/api/v1/wishlist/items/:productId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.removeUserWishlist]: {
    url: '/api/v1/wishlist',
    method: 'delete',
    auth: true,
  },
  [Endpoints.getUserWishlist]: {
    url: '/api/v1/wishlist',
    method: 'get',
    auth: true,
  },

  // order endpoints
  [Endpoints.createOrder]: {
    url: '/api/v1/orders',
    method: 'post',
    auth: true,
  },
  [Endpoints.getOrder]: {
    url: '/api/v1/orders/:orderId',
    method: 'get',
    auth: true,
  },
  [Endpoints.getOrdersList]: {
    url: '/api/v1/orders',
    method: 'get',
    auth: true,
  },
  [Endpoints.deleteOrder]: {
    url: '/api/v1/orders/:orderId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.adminGetOrder]: {
    url: '/api/v1/admin/orders/:orderId',
    method: 'get',
    auth: true,
  },
  [Endpoints.adminGetOrdersList]: {
    url: '/api/v1/admin/orders',
    method: 'get',
    auth: true,
  },
  [Endpoints.adminDeleteOrder]: {
    url: '/api/v1/admin/orders/:orderId',
    method: 'delete',
    auth: true,
  },

  // payment endpoints
  [Endpoints.createPayment]: {
    url: '/api/v1/payments',
    method: 'post',
  },
  [Endpoints.getPayment]: {
    url: '/api/v1/payments/:paymentId',
    method: 'get',
    auth: true,
  },
  [Endpoints.getPaymentsList]: {
    url: '/api/v1/payments',
    method: 'get',
    auth: true,
  },
};
