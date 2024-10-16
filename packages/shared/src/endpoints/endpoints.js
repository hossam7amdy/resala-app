/**
 * @fileoverview Endpoints configuration
 *
 * This file contains the configuration for all the endpoints in the application.
 */
/**
 * Enum for all the endpoints in the application.
 */
export var Endpoints;
(function (Endpoints) {
  // auth endpoints
  Endpoints['login'] = 'login';
  Endpoints['loginWithGoogle'] = 'loginWithGoogle';
  Endpoints['register'] = 'register';
  Endpoints['refresh'] = 'refresh';
  Endpoints['forgotPassword'] = 'forgotPassword';
  Endpoints['resetPassword'] = 'resetPassword';
  Endpoints['changePassword'] = 'changePassword';
  Endpoints['verifyEmail'] = 'verifyEmail';
  Endpoints['resendEmailVerification'] = 'resendEmailVerification';
  // user endpoints
  Endpoints['getUser'] = 'getUser';
  Endpoints['listUsers'] = 'listUsers';
  Endpoints['updateUser'] = 'updateUser';
  Endpoints['deleteUser'] = 'deleteUser';
  // address endpoints
  Endpoints['createAddress'] = 'createAddress';
  Endpoints['listAddress'] = 'listAddress';
  Endpoints['updateAddress'] = 'updateAddress';
  Endpoints['deleteAddress'] = 'deleteAddress';
  // category endpoints
  Endpoints['getCategory'] = 'getCategory';
  Endpoints['listCategories'] = 'listCategories';
  Endpoints['createCategory'] = 'createCategory';
  Endpoints['updateCategory'] = 'updateCategory';
  Endpoints['deleteCategory'] = 'deleteCategory';
  // product endpoints
  Endpoints['getProduct'] = 'getProduct';
  Endpoints['listProducts'] = 'listProducts';
  Endpoints['createProduct'] = 'createProduct';
  Endpoints['updateProduct'] = 'updateProduct';
  Endpoints['deleteProduct'] = 'deleteProduct';
  // images endpoints
  Endpoints['findImages'] = 'findImages';
  Endpoints['addImages'] = 'addImages';
  Endpoints['deleteImage'] = 'deleteImage';
  Endpoints['updateImage'] = 'updateImage';
  // stock endpoints
  Endpoints['addStock'] = 'addStock';
  Endpoints['getStock'] = 'getStock';
  Endpoints['listStocks'] = 'listStocks';
  Endpoints['updateStock'] = 'updateStock';
  Endpoints['deleteStock'] = 'deleteStock';
  // color endpoints
  Endpoints['getColor'] = 'getColor';
  Endpoints['listColors'] = 'listColors';
  Endpoints['createColor'] = 'createColor';
  Endpoints['updateColor'] = 'updateColor';
  Endpoints['deleteColor'] = 'deleteColor';
  // size endpoints
  Endpoints['getSize'] = 'getSize';
  Endpoints['listSizes'] = 'listSizes';
  Endpoints['createSize'] = 'createSize';
  Endpoints['updateSize'] = 'updateSize';
  Endpoints['deleteSize'] = 'deleteSize';
  // shopping endpoints
  Endpoints['getUserCart'] = 'getUserCart';
  Endpoints['addItemToCart'] = 'addItemToCart';
  Endpoints['removeUserCart'] = 'removeUserCart';
  Endpoints['removeItemFromCart'] = 'removeItemFromCart';
  Endpoints['getUserWishlist'] = 'getUserWishlist';
  Endpoints['addProductToWishlist'] = 'addProductToWishlist';
  Endpoints['removeUserWishlist'] = 'removeUserWishlist';
  Endpoints['removeProductFromWishlist'] = 'removeProductFromWishlist';
  // order endpoints
  Endpoints['createOrder'] = 'createOrder';
  Endpoints['getOrder'] = 'getOrder';
  Endpoints['listOrders'] = 'listOrders';
  Endpoints['deleteOrder'] = 'deleteOrder';
  Endpoints['updateOrderStatus'] = 'updateOrderStatus';
  // payment endpoints
  Endpoints['getPayment'] = 'getPayment';
  Endpoints['voidPayment'] = 'voidPayment';
  Endpoints['refundPayment'] = 'refundPayment';
  Endpoints['postPayCallback'] = 'postPayCallback';
  // reviews endpoints
  Endpoints['getReview'] = 'getReview';
  Endpoints['listReviews'] = 'listReviews';
  Endpoints['createReview'] = 'createReview';
  Endpoints['updateReview'] = 'updateReview';
  Endpoints['deleteReview'] = 'deleteReview';
  // dashboard summery
  Endpoints['getDashboardOverview'] = 'getDashboardOverview';
  Endpoints['getInventoryStatus'] = 'getInventoryStatus';
  Endpoints['getOrdersStatus'] = 'getOrdersStatus';
  Endpoints['getSalesTrends'] = 'getSalesTrends';
  Endpoints['listCustomersFeedback'] = 'listCustomersFeedback';
  Endpoints['listTopCustomers'] = 'listTopCustomers';
  Endpoints['listTopProducts'] = 'listTopProducts';
  // discount endpoints
  Endpoints['getDiscount'] = 'getDiscount';
  Endpoints['listDiscounts'] = 'listDiscounts';
  Endpoints['createDiscount'] = 'createDiscount';
  Endpoints['updateDiscount'] = 'updateDiscount';
  Endpoints['deleteDiscount'] = 'deleteDiscount';
  Endpoints['addProductsToDiscount'] = 'addProductsToDiscount';
  Endpoints['removeProductsFromDiscount'] = 'removeProductsFromDiscount';
})(Endpoints || (Endpoints = {}));
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
export const withParams = (endpoint, ...params) => {
  let url = endpoint.url;
  const placeholders = url.match(/{[^}]*}/g) ?? [];
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
  };
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
export const withQueryParams = (endpoint, query) => {
  const searchParams = new URLSearchParams(query);
  const url = endpoint.url.concat('?', searchParams.toString());
  return {
    url: url.toString(),
    method: endpoint.method,
    auth: endpoint.auth,
  };
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
export const ENDPOINT_CONFIGS = {
  // auth endpoints
  [Endpoints.login]: {
    method: 'post',
    url: '/api/v1/auth/login',
    sensitive: true,
  },
  [Endpoints.loginWithGoogle]: {
    method: 'get',
    url: '/auth/google',
  },
  [Endpoints.register]: {
    method: 'post',
    url: '/api/v1/auth/register',
    sensitive: true,
  },
  [Endpoints.refresh]: {
    method: 'post',
    url: '/api/v1/auth/refresh',
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
    auth: true,
  },
  [Endpoints.verifyEmail]: {
    method: 'post',
    url: '/api/v1/auth/verify-email',
    auth: true,
  },
  [Endpoints.changePassword]: {
    method: 'patch',
    url: '/api/v1/auth/change-password',
    sensitive: true,
    auth: true,
  },
  [Endpoints.resendEmailVerification]: {
    method: 'post',
    url: '/api/v1/auth/resend-email-verification',
    auth: true,
  },
  [Endpoints.listUsers]: {
    method: 'get',
    url: '/api/v1/users',
    auth: true,
  },
  [Endpoints.getUser]: {
    method: 'get',
    url: '/api/v1/users/{userId}',
    auth: true,
  },
  [Endpoints.updateUser]: {
    method: 'put',
    url: '/api/v1/users/{userId}',
    auth: true,
  },
  [Endpoints.deleteUser]: {
    method: 'delete',
    url: '/api/v1/users/{userId}',
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
    url: '/api/v1/addresses/{addressId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteAddress]: {
    url: '/api/v1/addresses/{addressId}',
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
    url: '/api/v1/categories/{categoryId}',
    method: 'get',
  },
  [Endpoints.updateCategory]: {
    url: '/api/v1/categories/{categoryId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteCategory]: {
    url: '/api/v1/categories/{categoryId}',
    method: 'delete',
    auth: true,
  },
  // product endpoints
  [Endpoints.getProduct]: {
    url: '/api/v1/products/{productId}',
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
    url: '/api/v1/products/{productId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteProduct]: {
    url: '/api/v1/products/{productId}',
    method: 'delete',
    auth: true,
  },
  // product images endpoints
  [Endpoints.findImages]: {
    url: '/api/v1/images',
    method: 'get',
  },
  [Endpoints.addImages]: {
    url: '/api/v1/images',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateImage]: {
    url: '/api/v1/images/{imageId}',
    method: 'patch',
    auth: true,
  },
  [Endpoints.deleteImage]: {
    url: '/api/v1/images/{imageId}',
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
    url: '/api/v1/stocks/{stockId}',
    method: 'get',
  },
  [Endpoints.listStocks]: {
    url: '/api/v1/stocks',
    method: 'get',
  },
  [Endpoints.updateStock]: {
    url: '/api/v1/stocks/{stockId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteStock]: {
    url: '/api/v1/stocks/{stockId}',
    method: 'delete',
    auth: true,
  },
  // color endpoints
  [Endpoints.getColor]: {
    url: '/api/v1/colors/{colorId}',
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
    url: '/api/v1/colors/{colorId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteColor]: {
    url: '/api/v1/colors/{colorId}',
    method: 'delete',
    auth: true,
  },
  // size endpoints
  [Endpoints.getSize]: {
    url: '/api/v1/sizes/{sizeId}',
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
    url: '/api/v1/sizes/{sizeId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteSize]: {
    url: '/api/v1/sizes/{sizeId}',
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
    url: '/api/v1/cart/items/{stockId}',
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
    url: '/api/v1/wishlist/items/{productId}',
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
    url: '/api/v1/orders/{orderId}',
    method: 'get',
    auth: true,
  },
  [Endpoints.listOrders]: {
    url: '/api/v1/orders',
    method: 'get',
    auth: true,
  },
  [Endpoints.deleteOrder]: {
    url: '/api/v1/orders/{orderId}',
    method: 'delete',
    auth: true,
  },
  [Endpoints.updateOrderStatus]: {
    url: '/api/v1/orders/{orderId}',
    method: 'patch',
    auth: true,
  },
  // payment endpoints
  [Endpoints.getPayment]: {
    url: '/api/v1/payments/{transactionId}',
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
    url: '/post_pay/{orderId}',
    method: 'post',
  },
  // product reviews endpoints
  [Endpoints.createReview]: {
    url: '/api/v1/reviews',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateReview]: {
    url: '/api/v1/reviews/{reviewId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteReview]: {
    url: '/api/v1/reviews/{reviewId}',
    method: 'delete',
    auth: true,
  },
  [Endpoints.getReview]: {
    url: '/api/v1/reviews/{reviewId}',
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
    url: '/api/v1/discounts/{discountId}',
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
    url: '/api/v1/discounts/{discountId}',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteDiscount]: {
    url: '/api/v1/discounts/{discountId}',
    method: 'delete',
    auth: true,
  },
  [Endpoints.addProductsToDiscount]: {
    url: '/api/v1/discounts/{discountId}/products',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeProductsFromDiscount]: {
    url: '/api/v1/discounts/{discountId}/products',
    method: 'delete',
    auth: true,
  },
};
