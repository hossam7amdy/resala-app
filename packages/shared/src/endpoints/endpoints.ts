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
  // auth endpoints
  login = 'login',
  logout = 'logout',
  register = 'register',
  getSession = 'getSession',
  verifyEmail = 'verifyEmail',
  sendPhoneOtp = 'sendPhoneOtp',
  resetPassword = 'resetPassword',
  forgetPassword = 'forgetPassword',
  loginAnonymous = 'loginAnonymous',
  loginWithPhone = 'loginWithPhone',
  changePassword = 'changePassword',
  verifyPhoneOtp = 'verifyPhoneOtp',
  loginWithProvider = 'loginWithProvider',
  sendVerificationEmail = 'sendVerificationEmail',

  // user endpoints
  getUser = 'getUser',
  listUsers = 'listUsers',
  updateUser = 'updateUser',
  deleteUser = 'deleteUser',

  // address endpoints
  createAddress = 'createAddress',
  listAddress = 'listAddress',
  updateAddress = 'updateAddress',
  deleteAddress = 'deleteAddress',

  // category endpoints
  getCategory = 'getCategory',
  listCategories = 'listCategories',
  createCategory = 'createCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',

  // product endpoints
  getProduct = 'getProduct',
  listProducts = 'listProducts',
  createProduct = 'createProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',

  // stock endpoints
  addStock = 'addStock',
  getStock = 'getStock',
  listStocks = 'listStocks',
  updateStock = 'updateStock',
  deleteStock = 'deleteStock',

  // color endpoints
  getColor = 'getColor',
  listColors = 'listColors',
  createColor = 'createColor',
  updateColor = 'updateColor',
  deleteColor = 'deleteColor',

  // size endpoints
  getSize = 'getSize',
  listSizes = 'listSizes',
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
  checkout = 'checkout',
  getOrder = 'getOrder',
  listOrders = 'listOrders',
  deleteOrder = 'deleteOrder',
  updateOrderStatus = 'updateOrderStatus',

  // payment endpoints
  getPayment = 'getPayment',
  voidPayment = 'voidPayment',
  refundPayment = 'refundPayment',
  postPayCallback = 'postPayCallback',

  // reviews endpoints
  getReview = 'getReview',
  listReviews = 'listReviews',
  createReview = 'createReview',
  updateReview = 'updateReview',
  deleteReview = 'deleteReview',

  // dashboard summery
  getDashboardOverview = 'getDashboardOverview',
  getInventoryStatus = 'getInventoryStatus',
  getOrdersStatus = 'getOrdersStatus',
  getSalesTrends = 'getSalesTrends',
  listCustomersFeedback = 'listCustomersFeedback',
  listTopCustomers = 'listTopCustomers',
  listTopProducts = 'listTopProducts',

  // discount endpoints
  getDiscount = 'getDiscount',
  listDiscounts = 'listDiscounts',
  createDiscount = 'createDiscount',
  updateDiscount = 'updateDiscount',
  deleteDiscount = 'deleteDiscount',
  addProductsToDiscount = 'addProductsToDiscount',
  removeProductsFromDiscount = 'removeProductsFromDiscount',
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
 * withParams(ENDPOINT_CONFIGS.getUser, '123')
 * // returns { url: '/api/v1/users/123', method: 'get' }
 */
export const withParams = (endpoint: EndpointConfig, ...params: string[]): EndpointConfig => {
  let url = endpoint.url;
  const placeholders = url.match(/:[^/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${placeholders.length < params.length ? 'many' : 'few'} params for url: ${url}!`;
  }
  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index]!, params[index]!);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
};

/**
 * Function to add query params to the endpoint url
 *
 * @param endpoint EndpointConfig
 * @param query Record<string, string>
 * @returns EndpointConfig
 *
 * @example
 * withQueryParams(ENDPOINT_CONFIGS.listProducts, { page: '1', limit: '10' })
 * // returns { url: '/api/v1/products?page=1&limit=10', method: 'get' }
 */
export const withQueryParams = (
  endpoint: EndpointConfig,
  query: Record<string, unknown>
): EndpointConfig => {
  const searchParams = new URLSearchParams(query as Record<string, string>);
  const url = endpoint.url.concat('?', searchParams.toString());
  return {
    url: url.toString(),
    method: endpoint.method,
    auth: endpoint.auth,
  } as EndpointConfig;
};

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
  // auth endpoints
  [Endpoints.loginAnonymous]: {
    method: 'post',
    url: '/api/auth/sign-in/anonymous',
    sensitive: true,
  },
  [Endpoints.loginWithProvider]: {
    method: 'post',
    url: '/api/auth/sign-in/social',
    sensitive: true,
  },
  [Endpoints.register]: {
    method: 'post',
    url: '/api/auth/sign-up/email',
    sensitive: true,
  },
  [Endpoints.login]: {
    method: 'post',
    url: '/api/auth/sign-in/email',
    sensitive: true,
  },
  [Endpoints.loginWithPhone]: {
    method: 'post',
    url: '/api/auth/sign-in/phone-number',
    sensitive: true,
  },
  [Endpoints.getSession]: {
    method: 'post',
    url: '/api/auth/get-session',
  },
  [Endpoints.logout]: {
    url: '/api/auth/sign-out',
    method: 'post',
    auth: true,
  },
  [Endpoints.forgetPassword]: {
    method: 'post',
    url: '/api/auth/forget-password',
  },
  [Endpoints.resetPassword]: {
    method: 'post',
    url: '/api/auth/reset-password',
    sensitive: true,
  },
  [Endpoints.verifyEmail]: {
    method: 'post',
    url: '/api/auth/verify-email',
    auth: true,
  },
  [Endpoints.sendVerificationEmail]: {
    method: 'post',
    url: '/api/auth/send-verification-email',
  },
  [Endpoints.changePassword]: {
    method: 'post',
    url: '/api/auth/change-password',
    sensitive: true,
    auth: true,
  },
  [Endpoints.sendPhoneOtp]: {
    url: '/api/auth/phone-number/send-otp',
    method: 'post',
  },
  [Endpoints.verifyPhoneOtp]: {
    url: '/api/auth/phone-number/verify',
    method: 'post',
    sensitive: true,
  },

  [Endpoints.listUsers]: {
    method: 'get',
    url: '/api/v1/users',
    auth: true,
  },
  [Endpoints.getUser]: {
    method: 'get',
    url: '/api/v1/users/:userId',
    auth: true,
  },
  [Endpoints.updateUser]: {
    method: 'put',
    url: '/api/v1/users/:userId',
    auth: true,
  },
  [Endpoints.deleteUser]: {
    method: 'delete',
    url: '/api/v1/users/:userId',
    auth: true,
  },

  // address endpoints
  [Endpoints.createAddress]: {
    url: '/api/v1/addresses',
    method: 'post',
    auth: true,
  },
  [Endpoints.listAddress]: {
    url: '/api/v1/addresses',
    method: 'get',
    auth: true,
  },
  [Endpoints.updateAddress]: {
    url: '/api/v1/addresses/:addressId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteAddress]: {
    url: '/api/v1/addresses/:addressId',
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

  // product endpoints
  [Endpoints.getProduct]: {
    url: '/api/v1/products/:productId',
    method: 'get',
  },
  [Endpoints.listProducts]: {
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
  [Endpoints.listStocks]: {
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
  [Endpoints.listColors]: {
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
  [Endpoints.listSizes]: {
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
    url: '/api/v1/cart',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeItemFromCart]: {
    url: '/api/v1/cart/:stockId',
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
    url: '/api/v1/wishlist',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeProductFromWishlist]: {
    url: '/api/v1/wishlist/:productId',
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
  [Endpoints.checkout]: {
    url: '/api/v1/orders',
    method: 'post',
    auth: true,
  },
  [Endpoints.getOrder]: {
    url: '/api/v1/orders/:orderId',
    method: 'get',
    auth: true,
  },
  [Endpoints.listOrders]: {
    url: '/api/v1/orders',
    method: 'get',
    auth: true,
  },
  [Endpoints.deleteOrder]: {
    url: '/api/v1/orders/:orderId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.updateOrderStatus]: {
    url: '/api/v1/orders/:orderId',
    method: 'patch',
    auth: true,
  },

  // payment endpoints
  [Endpoints.getPayment]: {
    url: '/api/v1/payments/:transactionId',
    method: 'get',
    auth: true,
  },
  [Endpoints.voidPayment]: {
    url: '/api/v1/payments/void',
    method: 'post',
    auth: true,
  },
  [Endpoints.refundPayment]: {
    url: '/api/v1/payments/refund',
    method: 'post',
    auth: true,
  },
  [Endpoints.postPayCallback]: {
    url: '/post_pay/:orderId',
    method: 'post',
  },

  // product reviews endpoints
  [Endpoints.createReview]: {
    url: '/api/v1/reviews',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateReview]: {
    url: '/api/v1/reviews/:reviewId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteReview]: {
    url: '/api/v1/reviews/:reviewId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.getReview]: {
    url: '/api/v1/reviews/:reviewId',
    method: 'get',
    auth: true,
  },
  [Endpoints.listReviews]: {
    url: '/api/v1/reviews',
    method: 'get',
    auth: true,
  },

  // dashboard endpoints
  [Endpoints.getDashboardOverview]: {
    url: '/api/v1/dashboard/overview',
    method: 'get',
    auth: true,
  },
  [Endpoints.getInventoryStatus]: {
    url: '/api/v1/dashboard/inventory-status',
    method: 'get',
    auth: true,
  },
  [Endpoints.getOrdersStatus]: {
    url: '/api/v1/dashboard/orders-status',
    method: 'get',
    auth: true,
  },
  [Endpoints.getSalesTrends]: {
    url: '/api/v1/dashboard/sales-trends',
    method: 'get',
    auth: true,
  },
  [Endpoints.listCustomersFeedback]: {
    url: '/api/v1/dashboard/customers-feedback',
    method: 'get',
    auth: true,
  },
  [Endpoints.listTopCustomers]: {
    url: '/api/v1/dashboard/top-customers',
    method: 'get',
    auth: true,
  },
  [Endpoints.listTopProducts]: {
    url: '/api/v1/dashboard/top-products',
    method: 'get',
  },

  // discount endpoints
  [Endpoints.getDiscount]: {
    url: '/api/v1/discounts/:discountId',
    method: 'get',
  },
  [Endpoints.listDiscounts]: {
    url: '/api/v1/discounts',
    method: 'get',
  },
  [Endpoints.createDiscount]: {
    url: '/api/v1/discounts',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateDiscount]: {
    url: '/api/v1/discounts/:discountId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteDiscount]: {
    url: '/api/v1/discounts/:discountId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.addProductsToDiscount]: {
    url: '/api/v1/discounts/:discountId/products',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeProductsFromDiscount]: {
    url: '/api/v1/discounts/:discountId/products',
    method: 'delete',
    auth: true,
  },
};
