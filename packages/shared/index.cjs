'use strict';

var zod = require('zod');

/**
 * @fileoverview Endpoints configuration
 *
 * This file contains the configuration for all the endpoints in the application.
 */
/**
 * Enum for all the endpoints in the application.
 */
exports.Endpoints = void 0;
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
})(exports.Endpoints || (exports.Endpoints = {}));
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
const withParams = (endpoint, ...params) => {
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
const withQueryParams = (endpoint, query) => {
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
const ENDPOINT_CONFIGS = {
  // auth endpoints
  [exports.Endpoints.login]: {
    method: 'post',
    url: '/api/v1/auth/login',
    sensitive: true,
  },
  [exports.Endpoints.loginWithGoogle]: {
    method: 'get',
    url: '/auth/google',
  },
  [exports.Endpoints.register]: {
    method: 'post',
    url: '/api/v1/auth/register',
    sensitive: true,
  },
  [exports.Endpoints.refresh]: {
    method: 'post',
    url: '/api/v1/auth/refresh',
    sensitive: true,
  },
  [exports.Endpoints.forgotPassword]: {
    method: 'post',
    url: '/api/v1/auth/forgot-password',
  },
  [exports.Endpoints.resetPassword]: {
    method: 'post',
    url: '/api/v1/auth/reset-password',
    sensitive: true,
    auth: true,
  },
  [exports.Endpoints.verifyEmail]: {
    method: 'post',
    url: '/api/v1/auth/verify-email',
    auth: true,
  },
  [exports.Endpoints.changePassword]: {
    method: 'patch',
    url: '/api/v1/auth/change-password',
    sensitive: true,
    auth: true,
  },
  [exports.Endpoints.resendEmailVerification]: {
    method: 'post',
    url: '/api/v1/auth/resend-email-verification',
    auth: true,
  },
  [exports.Endpoints.listUsers]: {
    method: 'get',
    url: '/api/v1/users',
    auth: true,
  },
  [exports.Endpoints.getUser]: {
    method: 'get',
    url: '/api/v1/users/{userId}',
    auth: true,
  },
  [exports.Endpoints.updateUser]: {
    method: 'put',
    url: '/api/v1/users/{userId}',
    auth: true,
  },
  [exports.Endpoints.deleteUser]: {
    method: 'delete',
    url: '/api/v1/users/{userId}',
    auth: true,
  },
  // address endpoints
  [exports.Endpoints.createAddress]: {
    url: '/api/v1/addresses',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.listAddress]: {
    url: '/api/v1/addresses',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.updateAddress]: {
    url: '/api/v1/addresses/{addressId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteAddress]: {
    url: '/api/v1/addresses/{addressId}',
    method: 'delete',
    auth: true,
  },
  // category endpoints
  [exports.Endpoints.listCategories]: {
    url: '/api/v1/categories',
    method: 'get',
  },
  [exports.Endpoints.createCategory]: {
    url: '/api/v1/categories',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.getCategory]: {
    url: '/api/v1/categories/{categoryId}',
    method: 'get',
  },
  [exports.Endpoints.updateCategory]: {
    url: '/api/v1/categories/{categoryId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteCategory]: {
    url: '/api/v1/categories/{categoryId}',
    method: 'delete',
    auth: true,
  },
  // product endpoints
  [exports.Endpoints.getProduct]: {
    url: '/api/v1/products/{productId}',
    method: 'get',
  },
  [exports.Endpoints.listProducts]: {
    url: '/api/v1/products',
    method: 'get',
  },
  [exports.Endpoints.createProduct]: {
    url: '/api/v1/products',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.updateProduct]: {
    url: '/api/v1/products/{productId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteProduct]: {
    url: '/api/v1/products/{productId}',
    method: 'delete',
    auth: true,
  },
  // product images endpoints
  [exports.Endpoints.findImages]: {
    url: '/api/v1/images',
    method: 'get',
  },
  [exports.Endpoints.addImages]: {
    url: '/api/v1/images',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.updateImage]: {
    url: '/api/v1/images/{imageId}',
    method: 'patch',
    auth: true,
  },
  [exports.Endpoints.deleteImage]: {
    url: '/api/v1/images/{imageId}',
    method: 'delete',
    auth: true,
  },
  // stock endpoints
  [exports.Endpoints.addStock]: {
    url: '/api/v1/stocks',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.getStock]: {
    url: '/api/v1/stocks/{stockId}',
    method: 'get',
  },
  [exports.Endpoints.listStocks]: {
    url: '/api/v1/stocks',
    method: 'get',
  },
  [exports.Endpoints.updateStock]: {
    url: '/api/v1/stocks/{stockId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteStock]: {
    url: '/api/v1/stocks/{stockId}',
    method: 'delete',
    auth: true,
  },
  // color endpoints
  [exports.Endpoints.getColor]: {
    url: '/api/v1/colors/{colorId}',
    method: 'get',
  },
  [exports.Endpoints.listColors]: {
    url: '/api/v1/colors',
    method: 'get',
  },
  [exports.Endpoints.createColor]: {
    url: '/api/v1/colors',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.updateColor]: {
    url: '/api/v1/colors/{colorId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteColor]: {
    url: '/api/v1/colors/{colorId}',
    method: 'delete',
    auth: true,
  },
  // size endpoints
  [exports.Endpoints.getSize]: {
    url: '/api/v1/sizes/{sizeId}',
    method: 'get',
  },
  [exports.Endpoints.listSizes]: {
    url: '/api/v1/sizes',
    method: 'get',
  },
  [exports.Endpoints.createSize]: {
    url: '/api/v1/sizes',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.updateSize]: {
    url: '/api/v1/sizes/{sizeId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteSize]: {
    url: '/api/v1/sizes/{sizeId}',
    method: 'delete',
    auth: true,
  },
  // shopping endpoints
  [exports.Endpoints.addItemToCart]: {
    url: '/api/v1/cart/items',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.removeItemFromCart]: {
    url: '/api/v1/cart/items/{stockId}',
    method: 'delete',
    auth: true,
  },
  [exports.Endpoints.getUserCart]: {
    url: '/api/v1/cart',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.removeUserCart]: {
    url: '/api/v1/cart',
    method: 'delete',
    auth: true,
  },
  [exports.Endpoints.addProductToWishlist]: {
    url: '/api/v1/wishlist/items',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.removeProductFromWishlist]: {
    url: '/api/v1/wishlist/items/{productId}',
    method: 'delete',
    auth: true,
  },
  [exports.Endpoints.removeUserWishlist]: {
    url: '/api/v1/wishlist',
    method: 'delete',
    auth: true,
  },
  [exports.Endpoints.getUserWishlist]: {
    url: '/api/v1/wishlist',
    method: 'get',
    auth: true,
  },
  // order endpoints
  [exports.Endpoints.createOrder]: {
    url: '/api/v1/orders',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.getOrder]: {
    url: '/api/v1/orders/{orderId}',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.listOrders]: {
    url: '/api/v1/orders',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.deleteOrder]: {
    url: '/api/v1/orders/{orderId}',
    method: 'delete',
    auth: true,
  },
  [exports.Endpoints.updateOrderStatus]: {
    url: '/api/v1/orders/{orderId}',
    method: 'patch',
    auth: true,
  },
  // payment endpoints
  [exports.Endpoints.getPayment]: {
    url: '/api/v1/payments/{transactionId}',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.voidPayment]: {
    url: '/api/v1/payments/void',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.refundPayment]: {
    url: '/api/v1/payments/refund',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.postPayCallback]: {
    url: '/post_pay/{orderId}',
    method: 'post',
  },
  // product reviews endpoints
  [exports.Endpoints.createReview]: {
    url: '/api/v1/reviews',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.updateReview]: {
    url: '/api/v1/reviews/{reviewId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteReview]: {
    url: '/api/v1/reviews/{reviewId}',
    method: 'delete',
    auth: true,
  },
  [exports.Endpoints.getReview]: {
    url: '/api/v1/reviews/{reviewId}',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.listReviews]: {
    url: '/api/v1/reviews',
    method: 'get',
    auth: true,
  },
  // dashboard endpoints
  [exports.Endpoints.getDashboardOverview]: {
    url: '/api/v1/dashboard/overview',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.getInventoryStatus]: {
    url: '/api/v1/dashboard/inventory-status',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.getOrdersStatus]: {
    url: '/api/v1/dashboard/orders-status',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.getSalesTrends]: {
    url: '/api/v1/dashboard/sales-trends',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.listCustomersFeedback]: {
    url: '/api/v1/dashboard/customers-feedback',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.listTopCustomers]: {
    url: '/api/v1/dashboard/top-customers',
    method: 'get',
    auth: true,
  },
  [exports.Endpoints.listTopProducts]: {
    url: '/api/v1/dashboard/top-products',
    method: 'get',
  },
  // discount endpoints
  [exports.Endpoints.getDiscount]: {
    url: '/api/v1/discounts/{discountId}',
    method: 'get',
  },
  [exports.Endpoints.listDiscounts]: {
    url: '/api/v1/discounts',
    method: 'get',
  },
  [exports.Endpoints.createDiscount]: {
    url: '/api/v1/discounts',
    method: 'post',
    auth: true,
  },
  [exports.Endpoints.updateDiscount]: {
    url: '/api/v1/discounts/{discountId}',
    method: 'put',
    auth: true,
  },
  [exports.Endpoints.deleteDiscount]: {
    url: '/api/v1/discounts/{discountId}',
    method: 'delete',
    auth: true,
  },
};

exports.Role = void 0;
(function (Role) {
  Role['ADMIN'] = 'ADMIN';
  Role['CUSTOMER'] = 'CUSTOMER';
  Role['MODERATOR'] = 'MODERATOR';
})(exports.Role || (exports.Role = {}));
exports.OrderStatus = void 0;
(function (OrderStatus) {
  OrderStatus['PENDING'] = 'PENDING';
  OrderStatus['FULFILLED'] = 'FULFILLED';
  OrderStatus['SHIPPED'] = 'SHIPPED';
  OrderStatus['DELIVERED'] = 'DELIVERED';
  OrderStatus['CANCELLED'] = 'CANCELLED';
})(exports.OrderStatus || (exports.OrderStatus = {}));
exports.PaymentStatus = void 0;
(function (PaymentStatus) {
  PaymentStatus['UNPAID'] = 'UNPAID';
  PaymentStatus['PAID'] = 'PAID';
  PaymentStatus['FAILED'] = 'FAILED';
  PaymentStatus['VOIDED'] = 'VOIDED';
  PaymentStatus['REFUNDED'] = 'REFUNDED';
})(exports.PaymentStatus || (exports.PaymentStatus = {}));
exports.PaymentMethod = void 0;
(function (PaymentMethod) {
  PaymentMethod['CASH'] = 'CASH';
  PaymentMethod['CARD'] = 'CARD';
})(exports.PaymentMethod || (exports.PaymentMethod = {}));
exports.DiscountEnum = void 0;
(function (DiscountEnum) {
  DiscountEnum['PERCENTAGE'] = 'PERCENTAGE';
  DiscountEnum['FIXED'] = 'FIXED';
  DiscountEnum['BOGO'] = 'BOGO';
  DiscountEnum['BULK'] = 'BULK';
})(exports.DiscountEnum || (exports.DiscountEnum = {}));

const validationPatterns = {
  validatePasswordLength: {
    pattern: /(?=.{8,})/,
    message: 'Password must have at least 8 characters',
  },
  passwordContainsNumericCharacters: {
    pattern: /(?=.*[0-9])/,
    message: 'Password must have at least 1 numeric characters',
  },
  passwordContainsUpperCaseCharacter: {
    pattern: /(?=.*[A-Z])/,
    message: 'Password must have at least 1 uppercase alphabetical character',
  },
  passwordContainsLowerCaseCharacter: {
    pattern: /(?=.*[a-z])/,
    message: 'Password must have at least 1 lowercase alphabetical character',
  },
  validateUsernameLength: {
    pattern: /(?=.{5,})/,
    message: 'Username must have at least 5 characters',
  },
  validateUsernameCharacters: {
    pattern: /^[a-zA-Z0-9_\-.]{5,}$/,
    message: 'Only characters (a-z), (A-Z), (0-9), -, _, . are available',
  },
  /*
        \p{Pd} - dash connectors
        \p{Pc} - connector punctuations
        \p{Cf} - invisible formatting indicator
        \p{L} - any alphabetic character
        Useful links:
        https://stackoverflow.com/questions/4323386/multi-language-input-validation-with-utf-8-encoding
        https://stackoverflow.com/questions/280712/javascript-unicode-regexes
        https://stackoverflow.com/questions/6377407/how-to-validate-both-chinese-unicode-and-english-name
    */
  validateName: {
    // eslint-disable-next-line
    pattern: /^(\p{L}|\p{Pd}|\p{Cf}|\p{Pc}|['\s]){2,}$/gu,
    message: 'Invalid name',
  },
  validateURL: {
    // eslint-disable-next-line
    pattern: /^((https?:\/\/)|((ssh:\/\/)?git@))[^\s$.?#].[^\s]*$/, // url, ssh url, ip
    message: 'URL is not valid',
  },
  validatePath: {
    // eslint-disable-next-line
    pattern: /^\[\/?([A-z0-9-_+]+\/)*([A-z0-9]+\.(xml|zip|json))\]$/,
    message: 'Git path is not valid',
  },
  validateSlug: {
    pattern: /^[a-zA-Z\d]+$/,
    message: 'Only Latin characters and numbers are allowed',
  },
  validatePhoneLength: {
    pattern: /(?=.{11,15})/,
    message: 'Phone must have at least 11 digits',
  },
  validatePhoneNumber: {
    pattern: /^(01)\d$/,
    message: 'Input phone number is not correct',
  },
  validateLatinDigits: {
    pattern: /^[0-9]+$/g,
    message: 'Only Latin numbers are allowed',
  },
  validateLngLat: {
    pattern: /^[+-]?[0-9]*\.?[0-9]+/gm,
    message: 'Invalid latitude/longitude point',
  },
  validateArabicCharacters: {
    pattern: /^[\u0600-\u06FF\s0-9.,!?'"-]+$/,
    message: 'فقط الحروف العربية مسموح بها',
  },
  validateEnglishCharacters: {
    pattern: /^[a-zA-Z\s0-9.,!?'"-]+$/,
    message: 'Only English characters and common punctuation marks are allowed',
  },
};

const UserSchema = zod.z.object({
  email: zod.z.string().min(5).max(128).email(),
  isVerified: zod.z.boolean().optional(),
  phone: zod.z.string().length(11).startsWith('01'),
  firstName: zod.z.string().min(2).max(50),
  lastName: zod.z.string().min(2).max(50),
  role: zod.z.enum(['ADMIN', 'MODERATOR', 'CUSTOMER']),
  password: zod.z
    .string()
    .min(8)
    .max(50)
    .regex(
      validationPatterns.passwordContainsLowerCaseCharacter.pattern,
      validationPatterns.passwordContainsLowerCaseCharacter.message
    )
    .regex(
      validationPatterns.passwordContainsNumericCharacters.pattern,
      validationPatterns.passwordContainsNumericCharacters.message
    )
    .regex(
      validationPatterns.passwordContainsUpperCaseCharacter.pattern,
      validationPatterns.passwordContainsUpperCaseCharacter.message
    ),
});
// Offset page schema
const OffsetPageParamsSchema = zod.z.object({
  page: zod.z.coerce.number().positive().default(1).optional(),
  limit: zod.z.coerce.number().positive().max(100).default(10).optional(),
});
// Auth Schemas
const LoginSchema = zod.z.object({
  body: zod.z.object({
    sign: zod.z.string().min(3),
    password: zod.z.string(),
  }),
});
const GoogleLoginSchema = zod.z.object({
  query: zod.z.object({
    redirectUrl: zod.z.string().url().max(200).optional(),
  }),
});
const RegisterSchema = zod.z.object({
  body: zod.z.object({
    firstName: UserSchema.shape.firstName,
    lastName: UserSchema.shape.lastName,
    phone: UserSchema.shape.phone,
    email: UserSchema.shape.email,
    password: UserSchema.shape.password,
  }),
});
const ResendVerificationSchema = zod.z.object({
  body: zod.z.object({
    email: UserSchema.shape.email,
  }),
});
const RefreshTokenSchema = zod.z.object({
  body: zod.z.object({
    token: zod.z.string().min(80),
  }),
});
const VerifyEmailSchema = zod.z.object({
  body: zod.z.object({}),
});
const ResetPasswordSchema = zod.z.object({
  body: zod.z.object({
    newPassword: UserSchema.shape.password,
    confirmNewPassword: UserSchema.shape.password,
  }),
});
const ChangePasswordSchema = zod.z.object({
  body: zod.z.object({
    oldPassword: UserSchema.shape.password,
    newPassword: UserSchema.shape.password,
  }),
});
const ForgotPasswordSchema = zod.z.object({
  body: zod.z.object({
    email: UserSchema.shape.email,
    redirectUrl: zod.z.string().url().max(100).optional(),
  }),
});
// User Schemas
const GetUserSchema = zod.z.object({
  params: zod.z.object({
    userId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const ListUsersSchema = zod.z.object({
  query: OffsetPageParamsSchema.extend({
    search: zod.z.string().max(100).default('').optional(),
  }),
});
const UpdateUserSchema = zod.z.object({
  params: zod.z.object({
    userId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: zod.z.object({
    firstName: UserSchema.shape.firstName,
    lastName: UserSchema.shape.lastName,
    phone: UserSchema.shape.phone,
    role: UserSchema.shape.role.optional(),
    isVerified: UserSchema.shape.isVerified.optional(),
  }),
});
const DeleteUserSchema = zod.z.object({
  params: zod.z.object({
    userId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const CreateAddressSchema = zod.z.object({
  body: zod.z.object({
    userId: zod.z.coerce.number().positive(),
    firstName: UserSchema.shape.firstName,
    lastName: UserSchema.shape.lastName,
    phone: UserSchema.shape.phone,
    state: zod.z.string().max(100),
    city: zod.z.string().max(100),
    street: zod.z.string().max(100),
    country: zod.z.string().max(100).optional(),
    building: zod.z.string().max(50).optional(),
    floor: zod.z.coerce.number().positive().optional(),
    address: zod.z.string().max(500).optional(),
  }),
});
const ListAddressSchema = zod.z.object({
  query: zod.z.object({
    userId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const UpdateAddressSchema = zod.z.object({
  params: zod.z.object({
    addressId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateAddressSchema.shape.body,
});
const DeleteAddressSchema = zod.z.object({
  params: UpdateAddressSchema.shape.params,
  query: ListAddressSchema.shape.query,
});
// Category Schemas
const CreateCategorySchema = zod.z.object({
  body: zod.z.object({
    arName: zod.z.string().min(2).max(100),
    enName: zod.z.string().min(2).max(100),
  }),
});
const UpdateCategorySchema = zod.z.object({
  params: zod.z.object({
    categoryId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateCategorySchema.shape.body,
});
const GetCategorySchema = zod.z.object({
  params: UpdateCategorySchema.shape.params,
});
const DeleteCategorySchema = zod.z.object({
  params: UpdateCategorySchema.shape.params,
});
// Product Schemas
const CreateProductSchema = zod.z.object({
  body: zod.z.object({
    categoryId: zod.z.coerce.number().positive(),
    arName: zod.z.string().min(2).max(100),
    enName: zod.z.string().min(2).max(100),
    arDescription: zod.z.string().max(500),
    enDescription: zod.z.string().max(500),
    price: zod.z.coerce.number().positive(),
  }),
});
const UpdateProductSchema = zod.z.object({
  params: zod.z.object({
    productId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateProductSchema.shape.body,
});
const GetProductSchema = zod.z.object({
  params: UpdateProductSchema.shape.params,
});
const ListProductsSchema = zod.z.object({
  query: OffsetPageParamsSchema.extend({
    search: zod.z.string().max(100).optional(),
    categoryId: zod.z.coerce.number().positive().optional(),
  }),
});
const DeleteProductSchema = zod.z.object({
  params: UpdateProductSchema.shape.params,
});
// Stock Schemas
const CreateStockSchema = zod.z.object({
  body: zod.z.object({
    productId: zod.z.coerce.number().positive(),
    colorId: zod.z.coerce.number().positive(),
    sizeId: zod.z.coerce.number().positive(),
    quantity: zod.z.coerce.number().nonnegative(),
  }),
});
const UpdateStockSchema = zod.z.object({
  params: zod.z.object({
    stockId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateStockSchema.shape.body,
});
const DeleteStockSchema = zod.z.object({
  params: zod.z.object({
    stockId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const ListStocksSchema = zod.z.object({
  query: OffsetPageParamsSchema.extend({
    search: zod.z.string().max(100).optional(),
    productId: zod.z.coerce.number().positive().optional(),
  }),
});
// Color Schemas
const CreateColorSchema = zod.z.object({
  body: zod.z.object({
    arName: zod.z.string().min(2).max(15),
    enName: zod.z.string().min(2).max(15),
    code: zod.z.string().startsWith('#').length(7),
  }),
});
const UpdateColorSchema = zod.z.object({
  params: zod.z.object({
    colorId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateColorSchema.shape.body,
});
const DeleteColorSchema = zod.z.object({
  params: UpdateColorSchema.shape.params,
});
// Size Schemas
const CreateSizeSchema = zod.z.object({
  body: zod.z.object({
    name: zod.z.string().min(1).max(5),
  }),
});
const UpdateSizeSchema = zod.z.object({
  params: zod.z.object({
    sizeId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateSizeSchema.shape.body,
});
const DeleteSizeSchema = zod.z.object({
  params: UpdateSizeSchema.shape.params,
});
// Image Schemas
const ListImagesSchema = zod.z.object({
  query: zod.z.object({
    productId: zod.z.coerce.number().positive().optional(),
    colorId: zod.z.coerce.number().positive().optional(),
  }),
});
const CreateImageSchema = zod.z.object({
  body: zod.z.object({
    productId: zod.z.coerce.number().positive(),
    colorId: zod.z.coerce.number().positive(),
  }),
});
const UpdateImageSchema = zod.z.object({
  params: zod.z.object({
    imageId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: zod.z.object({
    isPrimary: zod.z.coerce.boolean().optional(),
  }),
});
const DeleteImageSchema = zod.z.object({
  params: zod.z.object({
    imageId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Cart Schemas
const CreateCartSchema = zod.z.object({
  body: zod.z.object({
    stockId: zod.z.coerce.number().positive(),
    quantity: zod.z.coerce.number().positive(),
  }),
});
const DeleteCartSchema = zod.z.object({
  params: zod.z.object({
    stockId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const CreateWishlistSchema = zod.z.object({
  body: zod.z.object({
    productId: zod.z.coerce.number().positive(),
  }),
});
const DeleteWishlistSchema = zod.z.object({
  params: zod.z.object({
    productId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Order Schemas
const CreateOrderSchema = zod.z.object({
  body: zod.z.object({
    paymentMethod: zod.z.enum(['CARD', 'CASH']),
    note: zod.z.string().max(500).optional(),
    addressId: zod.z.coerce.number().positive(),
  }),
});
const GetOrderSchema = zod.z.object({
  params: zod.z.object({
    orderId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const ListOrdersSchema = zod.z.object({
  query: OffsetPageParamsSchema.extend({
    userId: zod.z.coerce.number().positive().optional(),
    search: zod.z.string().max(100).optional(),
  }),
});
const UpdateOrderStatusSchema = zod.z.object({
  params: zod.z.object({
    orderId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: zod.z.object({
    orderStatus: zod.z.enum(['PENDING', 'FULFILLED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
    paymentStatus: zod.z.enum(['UNPAID', 'PAID', 'FAILED', 'VOIDED', 'REFUNDED']),
  }),
});
const DeleteOrderSchema = zod.z.object({
  params: GetOrderSchema.shape.params,
  query: zod.z.object({
    userId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Payment Schemas
const GetPaymentSchema = zod.z.object({
  params: zod.z.object({
    transactionId: zod.z.string(),
  }),
});
const VoidPaymentSchema = zod.z.object({
  body: zod.z.object({
    transactionId: zod.z.string(),
  }),
});
const RefundPaymentSchema = zod.z.object({
  body: zod.z.object({
    transactionId: zod.z.string(),
    amount: zod.z.coerce.number().positive(),
  }),
});
// Review Schemas
const CreateReviewSchema = zod.z.object({
  body: zod.z.object({
    userId: zod.z.coerce.number().positive(),
    productId: zod.z.coerce.number().positive(),
    rating: zod.z.coerce.number().min(1).max(5),
    comment: zod.z.string().max(500).optional(),
  }),
});
const GetReviewSchema = zod.z.object({
  params: zod.z.object({
    reviewId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
const ListReviewsSchema = zod.z.object({
  query: OffsetPageParamsSchema.extend({
    productId: zod.z.coerce.number().positive().optional(),
  }),
});
const UpdateReviewSchema = zod.z.object({
  params: GetReviewSchema.shape.params,
  body: CreateReviewSchema.shape.body,
});
const DeleteReviewSchema = zod.z.object({
  params: GetReviewSchema.shape.params,
  query: zod.z.object({
    userId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Discount Schemas
const CreateDiscountSchema = zod.z.object({
  body: zod.z
    .object({
      type: zod.z.enum(['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']),
      amount: zod.z.coerce.number().positive().min(0.1),
      description: zod.z.string().max(250).optional(),
      minQty: zod.z.coerce.number().positive().optional(),
      isActive: zod.z.boolean().optional(),
      isStoreWide: zod.z.boolean().optional(),
      startDate: zod.z.coerce
        .date()
        .optional()
        .transform(val => val?.toISOString()),
      endDate: zod.z.coerce
        .date()
        .optional()
        .transform(val => val?.toISOString()),
      productIds: zod.z.array(zod.z.coerce.number().positive()).min(1).max(50).optional(),
    })
    .refine(
      ({ type, productIds }) => {
        return ['FIXED', 'BULK'].includes(type) && productIds === undefined;
      },
      {
        message: 'You cannot provide products for order-level discounts. (e.g. FIXED, BULK)',
        path: ['productIds'],
      }
    )
    .refine(
      ({ isStoreWide, productIds }) => {
        return isStoreWide ? !productIds : !!productIds;
      },
      {
        message: 'Please choose either store-wide or select specific products, but not both.',
        path: ['productIds'],
      }
    )
    .refine(
      ({ startDate, endDate }) => {
        // if both startDate and endDate are provided, endDate must be greater than startDate
        if (startDate && endDate) {
          const start = new Date(startDate).getTime();
          const end = new Date(endDate).getTime();
          return end >= start;
        }
        // if endDate is provided, startDate must be provided
        return endDate ? !!startDate : true;
      },
      {
        message:
          'Start date must not be in the past and end date must be greater than the start date.',
        path: ['startDate'],
      }
    )
    .refine(
      data => {
        if (data.type === 'BULK') return data.minQty;
        return true;
      },
      {
        message: 'Minimum quantity is required for BULK discount type.',
        path: ['minQty'],
      }
    )
    .refine(
      data => {
        if (data.type === 'BOGO') {
          return data.minQty && data.amount === Math.trunc(data.amount);
        }
        return true;
      },
      {
        message: 'Amount must be an integer for BOGO discount type.',
        path: ['amount'],
      }
    ),
});
const UpdateDiscountSchema = zod.z.object({
  params: zod.z.object({
    discountId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateDiscountSchema.shape.body,
});
const DeleteDiscountSchema = zod.z.object({
  params: UpdateDiscountSchema.shape.params,
});
const ListDiscountsSchema = zod.z.object({
  query: OffsetPageParamsSchema.extend({
    type: zod.z.enum(['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']).optional(),
    isActive: zod.z.boolean().optional(),
    isStoreWide: zod.z.boolean().optional(),
    startDate: zod.z.coerce
      .date()
      .optional()
      .transform(val => val?.toISOString()),
    endDate: zod.z.coerce
      .date()
      .optional()
      .transform(val => val?.toISOString()),
  }).refine(
    data => {
      if (!data.startDate || !data.endDate) return true;
      const startDate = new Date(data.startDate).getTime();
      const endDate = new Date(data.endDate).getTime();
      const now = new Date(new Date().toDateString()).getTime();
      return startDate >= now && endDate >= startDate;
    },
    {
      message:
        'Start date must not be in the past and end date must be greater than the start date.',
      path: ['startDate'],
    }
  ),
});
const GetDiscountSchema = zod.z.object({
  params: zod.z.object({
    discountId: zod.z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  query: OffsetPageParamsSchema,
});

exports.ChangePasswordSchema = ChangePasswordSchema;
exports.CreateAddressSchema = CreateAddressSchema;
exports.CreateCartSchema = CreateCartSchema;
exports.CreateCategorySchema = CreateCategorySchema;
exports.CreateColorSchema = CreateColorSchema;
exports.CreateDiscountSchema = CreateDiscountSchema;
exports.CreateImageSchema = CreateImageSchema;
exports.CreateOrderSchema = CreateOrderSchema;
exports.CreateProductSchema = CreateProductSchema;
exports.CreateReviewSchema = CreateReviewSchema;
exports.CreateSizeSchema = CreateSizeSchema;
exports.CreateStockSchema = CreateStockSchema;
exports.CreateWishlistSchema = CreateWishlistSchema;
exports.DeleteAddressSchema = DeleteAddressSchema;
exports.DeleteCartSchema = DeleteCartSchema;
exports.DeleteCategorySchema = DeleteCategorySchema;
exports.DeleteColorSchema = DeleteColorSchema;
exports.DeleteDiscountSchema = DeleteDiscountSchema;
exports.DeleteImageSchema = DeleteImageSchema;
exports.DeleteOrderSchema = DeleteOrderSchema;
exports.DeleteProductSchema = DeleteProductSchema;
exports.DeleteReviewSchema = DeleteReviewSchema;
exports.DeleteSizeSchema = DeleteSizeSchema;
exports.DeleteStockSchema = DeleteStockSchema;
exports.DeleteUserSchema = DeleteUserSchema;
exports.DeleteWishlistSchema = DeleteWishlistSchema;
exports.ENDPOINT_CONFIGS = ENDPOINT_CONFIGS;
exports.ForgotPasswordSchema = ForgotPasswordSchema;
exports.GetCategorySchema = GetCategorySchema;
exports.GetDiscountSchema = GetDiscountSchema;
exports.GetOrderSchema = GetOrderSchema;
exports.GetPaymentSchema = GetPaymentSchema;
exports.GetProductSchema = GetProductSchema;
exports.GetReviewSchema = GetReviewSchema;
exports.GetUserSchema = GetUserSchema;
exports.GoogleLoginSchema = GoogleLoginSchema;
exports.ListAddressSchema = ListAddressSchema;
exports.ListDiscountsSchema = ListDiscountsSchema;
exports.ListImagesSchema = ListImagesSchema;
exports.ListOrdersSchema = ListOrdersSchema;
exports.ListProductsSchema = ListProductsSchema;
exports.ListReviewsSchema = ListReviewsSchema;
exports.ListStocksSchema = ListStocksSchema;
exports.ListUsersSchema = ListUsersSchema;
exports.LoginSchema = LoginSchema;
exports.OffsetPageParamsSchema = OffsetPageParamsSchema;
exports.RefreshTokenSchema = RefreshTokenSchema;
exports.RefundPaymentSchema = RefundPaymentSchema;
exports.RegisterSchema = RegisterSchema;
exports.ResendVerificationSchema = ResendVerificationSchema;
exports.ResetPasswordSchema = ResetPasswordSchema;
exports.UpdateAddressSchema = UpdateAddressSchema;
exports.UpdateCategorySchema = UpdateCategorySchema;
exports.UpdateColorSchema = UpdateColorSchema;
exports.UpdateDiscountSchema = UpdateDiscountSchema;
exports.UpdateImageSchema = UpdateImageSchema;
exports.UpdateOrderStatusSchema = UpdateOrderStatusSchema;
exports.UpdateProductSchema = UpdateProductSchema;
exports.UpdateReviewSchema = UpdateReviewSchema;
exports.UpdateSizeSchema = UpdateSizeSchema;
exports.UpdateStockSchema = UpdateStockSchema;
exports.UpdateUserSchema = UpdateUserSchema;
exports.VerifyEmailSchema = VerifyEmailSchema;
exports.VoidPaymentSchema = VoidPaymentSchema;
exports.validationPatterns = validationPatterns;
exports.withParams = withParams;
exports.withQueryParams = withQueryParams;
