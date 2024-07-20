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
    Endpoints["healthz"] = "healthz";
    // auth endpoints
    Endpoints["login"] = "login";
    Endpoints["register"] = "register";
    Endpoints["refresh"] = "refresh";
    Endpoints["forgotPassword"] = "forgotPassword";
    Endpoints["resetPassword"] = "resetPassword";
    Endpoints["changePassword"] = "changePassword";
    Endpoints["verifyEmail"] = "verifyEmail";
    Endpoints["resendEmailVerification"] = "resendEmailVerification";
    // user endpoints
    Endpoints["getCurrentUser"] = "getCurrentUser";
    Endpoints["updateCurrentUser"] = "updateCurrentUser";
    Endpoints["adminGetUser"] = "adminGetUser";
    Endpoints["adminListUsers"] = "adminListUsers";
    Endpoints["adminUpdateUser"] = "adminUpdateUser";
    Endpoints["adminDeleteUser"] = "adminDeleteUser";
    // address endpoints
    Endpoints["createAddress"] = "createAddress";
    Endpoints["listAddress"] = "listAddress";
    Endpoints["updateAddress"] = "updateAddress";
    Endpoints["deleteAddress"] = "deleteAddress";
    // category endpoints
    Endpoints["getCategory"] = "getCategory";
    Endpoints["listCategories"] = "listCategories";
    Endpoints["listCategoryProducts"] = "listCategoryProducts";
    Endpoints["createCategory"] = "createCategory";
    Endpoints["updateCategory"] = "updateCategory";
    Endpoints["deleteCategory"] = "deleteCategory";
    // product endpoints
    Endpoints["getProduct"] = "getProduct";
    Endpoints["listProducts"] = "listProducts";
    Endpoints["listProductStocks"] = "listProductStocks";
    Endpoints["createProduct"] = "createProduct";
    Endpoints["updateProduct"] = "updateProduct";
    Endpoints["deleteProduct"] = "deleteProduct";
    // images endpoints
    Endpoints["addImages"] = "addImages";
    Endpoints["deleteImage"] = "deleteImage";
    Endpoints["updateImage"] = "updateImage";
    // stock endpoints
    Endpoints["addStock"] = "addStock";
    Endpoints["getStock"] = "getStock";
    Endpoints["listStocks"] = "listStocks";
    Endpoints["updateStock"] = "updateStock";
    Endpoints["deleteStock"] = "deleteStock";
    // color endpoints
    Endpoints["getColor"] = "getColor";
    Endpoints["listColors"] = "listColors";
    Endpoints["createColor"] = "createColor";
    Endpoints["updateColor"] = "updateColor";
    Endpoints["deleteColor"] = "deleteColor";
    // size endpoints
    Endpoints["getSize"] = "getSize";
    Endpoints["listSizes"] = "listSizes";
    Endpoints["createSize"] = "createSize";
    Endpoints["updateSize"] = "updateSize";
    Endpoints["deleteSize"] = "deleteSize";
    // shopping endpoints
    Endpoints["getUserCart"] = "getUserCart";
    Endpoints["addItemToCart"] = "addItemToCart";
    Endpoints["removeUserCart"] = "removeUserCart";
    Endpoints["removeItemFromCart"] = "removeItemFromCart";
    Endpoints["getUserWishlist"] = "getUserWishlist";
    Endpoints["addProductToWishlist"] = "addProductToWishlist";
    Endpoints["removeUserWishlist"] = "removeUserWishlist";
    Endpoints["removeProductFromWishlist"] = "removeProductFromWishlist";
    // order endpoints
    Endpoints["createOrder"] = "createOrder";
    Endpoints["getOrder"] = "getOrder";
    Endpoints["listOrders"] = "listOrders";
    Endpoints["deleteOrder"] = "deleteOrder";
    Endpoints["adminGetOrder"] = "adminGetOrder";
    Endpoints["adminListOrders"] = "adminListOrders";
    Endpoints["adminDeleteOrder"] = "adminDeleteOrder";
    Endpoints["adminUpdateOrderStatus"] = "adminUpdateOrderStatus";
    // payment endpoints
    Endpoints["getPayment"] = "getPayment";
    Endpoints["listPayments"] = "listPayments";
    Endpoints["paymentResponseCallback"] = "paymentResponseCallback";
    Endpoints["paymentProcessedCallback"] = "paymentProcessedCallback";
    // reviews endpoints
    Endpoints["getReview"] = "getReview";
    Endpoints["listReviews"] = "listReviews";
    Endpoints["createReview"] = "createReview";
    Endpoints["updateReview"] = "updateReview";
    Endpoints["deleteReview"] = "deleteReview";
    Endpoints["listProductReviews"] = "listProductReviews";
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
 * withParams(ENDPOINT_CONFIGS.adminGetUser, '123')
 * // returns { url: '/api/v1/users/123', method: 'get' }
 */
const withParams = (endpoint, ...params) => {
    let url = endpoint.url;
    const placeholders = url.match(/:[^\\/]*/g) || [];
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
    // health check
    [exports.Endpoints.healthz]: { method: 'get', url: '/api/v1/healthz' },
    // auth endpoints
    [exports.Endpoints.login]: {
        method: 'post',
        url: '/api/v1/auth/login',
        sensitive: true,
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
        method: 'get',
        url: '/api/v1/auth/verify-email',
    },
    [exports.Endpoints.changePassword]: {
        method: 'patch',
        url: '/api/v1/auth/change-password',
        sensitive: true,
        auth: true,
    },
    [exports.Endpoints.resendEmailVerification]: {
        method: 'get',
        url: '/api/v1/auth/resend-email-verification',
        auth: true,
    },
    // user endpoints
    [exports.Endpoints.getCurrentUser]: {
        method: 'get',
        url: '/api/v1/users/self',
        auth: true,
    },
    [exports.Endpoints.updateCurrentUser]: {
        method: 'put',
        url: '/api/v1/users/self',
        auth: true,
    },
    // admin user endpoints
    [exports.Endpoints.adminUpdateUser]: {
        method: 'put',
        url: '/api/v1/users/:userId',
        auth: true,
    },
    [exports.Endpoints.adminGetUser]: {
        method: 'get',
        url: '/api/v1/users/:userId',
        auth: true,
    },
    [exports.Endpoints.adminListUsers]: {
        method: 'get',
        url: '/api/v1/users',
        auth: true,
    },
    [exports.Endpoints.adminDeleteUser]: {
        method: 'delete',
        url: '/api/v1/users/:userId',
        auth: true,
    },
    // address endpoints
    [exports.Endpoints.createAddress]: {
        url: '/api/v1/users/self/addresses',
        method: 'post',
        auth: true,
    },
    [exports.Endpoints.listAddress]: {
        url: '/api/v1/users/self/addresses',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.updateAddress]: {
        url: '/api/v1/users/self/addresses/:addressId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteAddress]: {
        url: '/api/v1/users/self/addresses/:addressId',
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
        url: '/api/v1/categories/:categoryId',
        method: 'get',
    },
    [exports.Endpoints.updateCategory]: {
        url: '/api/v1/categories/:categoryId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteCategory]: {
        url: '/api/v1/categories/:categoryId',
        method: 'delete',
        auth: true,
    },
    [exports.Endpoints.listCategoryProducts]: {
        url: '/api/v1/categories/:categoryId/products',
        method: 'get',
    },
    // product endpoints
    [exports.Endpoints.getProduct]: {
        url: '/api/v1/products/:productId',
        method: 'get',
    },
    [exports.Endpoints.listProductStocks]: {
        url: '/api/v1/products/:productId/stocks',
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
        url: '/api/v1/products/:productId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteProduct]: {
        url: '/api/v1/products/:productId',
        method: 'delete',
        auth: true,
    },
    // product images endpoints
    [exports.Endpoints.addImages]: {
        url: '/api/v1/images',
        method: 'post',
        auth: true,
    },
    [exports.Endpoints.updateImage]: {
        url: '/api/v1/images/:imageId',
        method: 'patch',
        auth: true,
    },
    [exports.Endpoints.deleteImage]: {
        url: '/api/v1/images/:imageId',
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
        url: '/api/v1/stocks/:stockId',
        method: 'get',
    },
    [exports.Endpoints.listStocks]: {
        url: '/api/v1/stocks',
        method: 'get',
    },
    [exports.Endpoints.updateStock]: {
        url: '/api/v1/stocks/:stockId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteStock]: {
        url: '/api/v1/stocks/:stockId',
        method: 'delete',
        auth: true,
    },
    // color endpoints
    [exports.Endpoints.getColor]: {
        url: '/api/v1/colors/:colorId',
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
        url: '/api/v1/colors/:colorId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteColor]: {
        url: '/api/v1/colors/:colorId',
        method: 'delete',
        auth: true,
    },
    // size endpoints
    [exports.Endpoints.getSize]: {
        url: '/api/v1/sizes/:sizeId',
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
        url: '/api/v1/sizes/:sizeId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteSize]: {
        url: '/api/v1/sizes/:sizeId',
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
        url: '/api/v1/cart/items/:stockId',
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
        url: '/api/v1/wishlist/items/:productId',
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
        url: '/api/v1/orders/:orderId',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.listOrders]: {
        url: '/api/v1/orders',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.deleteOrder]: {
        url: '/api/v1/orders/:orderId',
        method: 'delete',
        auth: true,
    },
    [exports.Endpoints.adminGetOrder]: {
        url: '/api/v1/admin/orders/:orderId',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.adminListOrders]: {
        url: '/api/v1/admin/orders',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.adminDeleteOrder]: {
        url: '/api/v1/admin/orders/:orderId',
        method: 'delete',
        auth: true,
    },
    [exports.Endpoints.adminUpdateOrderStatus]: {
        url: '/api/v1/admin/orders/:orderId',
        method: 'patch',
        auth: true,
    },
    // payment endpoints
    [exports.Endpoints.paymentProcessedCallback]: {
        url: '/api/v1/payments/:orderId',
        method: 'post',
    },
    [exports.Endpoints.paymentResponseCallback]: {
        url: '/api/v1/payments/:orderId',
        method: 'get',
    },
    [exports.Endpoints.getPayment]: {
        url: '/api/v1/payments/:paymentId',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.listPayments]: {
        url: '/api/v1/payments',
        method: 'get',
        auth: true,
    },
    // product reviews endpoints
    [exports.Endpoints.createReview]: {
        url: '/api/v1/reviews',
        method: 'post',
        auth: true,
    },
    [exports.Endpoints.updateReview]: {
        url: '/api/v1/reviews/:reviewId',
        method: 'put',
        auth: true,
    },
    [exports.Endpoints.deleteReview]: {
        url: '/api/v1/reviews/:reviewId',
        method: 'delete',
        auth: true,
    },
    [exports.Endpoints.getReview]: {
        url: '/api/v1/reviews/:reviewId',
        method: 'get',
    },
    [exports.Endpoints.listReviews]: {
        url: '/api/v1/reviews',
        method: 'get',
    },
    [exports.Endpoints.listProductReviews]: {
        url: '/api/v1/products/:productId/reviews',
        method: 'get',
    },
};

exports.Role = void 0;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["CUSTOMER"] = "CUSTOMER";
    Role["MODERATOR"] = "MODERATOR";
})(exports.Role || (exports.Role = {}));
exports.OrderStatus = void 0;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["FULFILLED"] = "FULFILLED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(exports.OrderStatus || (exports.OrderStatus = {}));
exports.PaymentStatus = void 0;
(function (PaymentStatus) {
    PaymentStatus["UNPAID"] = "UNPAID";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["VOIDED"] = "VOIDED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(exports.PaymentStatus || (exports.PaymentStatus = {}));
exports.PaymentMethod = void 0;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CARD"] = "CARD";
})(exports.PaymentMethod || (exports.PaymentMethod = {}));

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
    role: zod.z.enum([exports.Role.ADMIN, exports.Role.MODERATOR, exports.Role.CUSTOMER]),
    password: zod.z
        .string()
        .min(8)
        .max(50)
        .regex(validationPatterns.passwordContainsLowerCaseCharacter.pattern, validationPatterns.passwordContainsLowerCaseCharacter.message)
        .regex(validationPatterns.passwordContainsNumericCharacters.pattern, validationPatterns.passwordContainsNumericCharacters.message)
        .regex(validationPatterns.passwordContainsUpperCaseCharacter.pattern, validationPatterns.passwordContainsUpperCaseCharacter.message),
});
// Pagination Schema
const DefaultQuerySchema = zod.z.object({
    query: zod.z.object({
        page: zod.z.coerce
            .number()
            .positive()
            .max(10000)
            .optional()
            .transform(val => val || 1),
        limit: zod.z.coerce
            .number()
            .positive()
            .max(100)
            .optional()
            .transform(val => val || 10),
        query: zod.z
            .string()
            .min(0)
            .max(50)
            .optional()
            .transform(val => val || ''),
    }),
});
// Auth Schemas
const LoginSchema = zod.z.object({
    body: zod.z.object({
        sign: zod.z.string(),
        password: zod.z.string(),
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
const RefreshTokenSchema = zod.z.object({
    body: zod.z.object({
        token: zod.z.string().min(80),
    }),
});
const VerifyEmailSchema = zod.z.object({
    query: zod.z.object({
        email: UserSchema.shape.email,
        token: zod.z.string().min(80),
    }),
});
const ResetPasswordSchema = zod.z.object({
    body: zod.z.object({
        email: UserSchema.shape.email,
        code: zod.z.string().length(6),
        password: UserSchema.shape.password,
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
    }),
});
// User Schemas
const UpdateProfileSchema = zod.z.object({
    body: zod.z.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
    }),
});
const AdminGetUserSchema = zod.z.object({
    params: zod.z.object({
        userId: zod.z.coerce.number().positive(),
    }),
});
const AdminUpdateUserSchema = zod.z.object({
    params: zod.z.object({
        userId: zod.z.coerce.number().positive(),
    }),
    body: UpdateProfileSchema.shape.body.extend({
        role: UserSchema.shape.role,
        isVerified: UserSchema.shape.isVerified,
    }),
});
const AdminDeleteUserSchema = zod.z.object({
    params: zod.z.object({
        userId: zod.z.coerce.number().positive(),
    }),
});
const CreateAddressSchema = zod.z.object({
    body: zod.z.object({
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
const UpdateAddressSchema = zod.z.object({
    params: zod.z.object({
        addressId: zod.z.coerce.number().positive(),
    }),
    body: CreateAddressSchema.shape.body,
});
const DeleteAddressSchema = zod.z.object({
    params: UpdateAddressSchema.shape.params,
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
        categoryId: zod.z.coerce.number().positive(),
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
        productId: zod.z.coerce.number().positive(),
    }),
    body: CreateProductSchema.shape.body,
});
const GetProductSchema = zod.z.object({
    params: UpdateProductSchema.shape.params,
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
        stockId: zod.z.coerce.number().positive(),
    }),
    body: CreateStockSchema.shape.body,
});
const DeleteStockSchema = zod.z.object({
    params: zod.z.object({
        stockId: zod.z.coerce.number().positive(),
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
        colorId: zod.z.coerce.number().positive(),
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
        sizeId: zod.z.coerce.number().positive(),
    }),
    body: CreateSizeSchema.shape.body,
});
const DeleteSizeSchema = zod.z.object({
    params: UpdateSizeSchema.shape.params,
});
// Image Schemas
const CreateImageSchema = zod.z.object({
    body: zod.z.object({
        productId: zod.z.coerce.number().positive(),
        colorId: zod.z.coerce.number().positive(),
    }),
});
const PatchImageSchema = zod.z.object({
    params: zod.z.object({
        imageId: zod.z.coerce.number().positive(),
    }),
    body: zod.z.object({
        isPrimary: zod.z.coerce.boolean().optional(),
    }),
});
const DeleteImageSchema = zod.z.object({
    params: zod.z.object({
        imageId: zod.z.coerce.number().positive(),
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
        stockId: zod.z.coerce.number().positive(),
    }),
});
const CreateWishlistSchema = zod.z.object({
    body: zod.z.object({
        productId: zod.z.coerce.number().positive(),
    }),
});
const DeleteWishlistSchema = zod.z.object({
    params: zod.z.object({
        productId: zod.z.coerce.number().positive(),
    }),
});
// Order Schemas
const CreateOrderSchema = zod.z.object({
    body: zod.z.object({
        paymentMethod: zod.z.enum([exports.PaymentMethod.CARD, exports.PaymentMethod.CASH]),
        note: zod.z.string().max(500).optional(),
        addressId: zod.z.coerce.number().positive(),
    }),
});
const UpdateOrderStatusSchema = zod.z.object({
    params: zod.z.object({
        orderId: zod.z.coerce.number().positive(),
    }),
    body: zod.z.object({
        status: zod.z.enum([exports.OrderStatus.PENDING, exports.OrderStatus.FULFILLED, exports.OrderStatus.CANCELLED]),
    }),
});
const GetOrderSchema = zod.z.object({
    params: zod.z.object({
        orderId: zod.z.coerce.number().positive(),
    }),
});
// Payment Schemas
const GetPaymentSchema = zod.z.object({
    params: zod.z.object({
        paymentId: zod.z.coerce.number().positive(),
    }),
});
// Review Schemas
const CreateReviewSchema = zod.z.object({
    body: zod.z.object({
        productId: zod.z.coerce.number().positive(),
        rating: zod.z.coerce.number().min(1).max(5),
        comment: zod.z.string().max(500).optional(),
    }),
});
const GetReviewSchema = zod.z.object({
    params: zod.z.object({
        reviewId: zod.z.coerce.number().positive(),
    }),
});
const ListProductReviewsSchema = zod.z.object({
    params: zod.z.object({
        productId: zod.z.coerce.number().positive(),
    }),
    query: DefaultQuerySchema.shape.query,
});
const ListReviewsSchema = zod.z.object({
    query: DefaultQuerySchema.shape.query,
});
const UpdateReviewSchema = zod.z.object({
    params: GetReviewSchema.shape.params,
    body: CreateReviewSchema.shape.body,
});
const DeleteReviewSchema = zod.z.object({
    params: GetReviewSchema.shape.params,
});

exports.AdminDeleteUserSchema = AdminDeleteUserSchema;
exports.AdminGetUserSchema = AdminGetUserSchema;
exports.AdminUpdateUserSchema = AdminUpdateUserSchema;
exports.ChangePasswordSchema = ChangePasswordSchema;
exports.CreateAddressSchema = CreateAddressSchema;
exports.CreateCartSchema = CreateCartSchema;
exports.CreateCategorySchema = CreateCategorySchema;
exports.CreateColorSchema = CreateColorSchema;
exports.CreateImageSchema = CreateImageSchema;
exports.CreateOrderSchema = CreateOrderSchema;
exports.CreateProductSchema = CreateProductSchema;
exports.CreateReviewSchema = CreateReviewSchema;
exports.CreateSizeSchema = CreateSizeSchema;
exports.CreateStockSchema = CreateStockSchema;
exports.CreateWishlistSchema = CreateWishlistSchema;
exports.DefaultQuerySchema = DefaultQuerySchema;
exports.DeleteAddressSchema = DeleteAddressSchema;
exports.DeleteCartSchema = DeleteCartSchema;
exports.DeleteCategorySchema = DeleteCategorySchema;
exports.DeleteColorSchema = DeleteColorSchema;
exports.DeleteImageSchema = DeleteImageSchema;
exports.DeleteProductSchema = DeleteProductSchema;
exports.DeleteReviewSchema = DeleteReviewSchema;
exports.DeleteSizeSchema = DeleteSizeSchema;
exports.DeleteStockSchema = DeleteStockSchema;
exports.DeleteWishlistSchema = DeleteWishlistSchema;
exports.ENDPOINT_CONFIGS = ENDPOINT_CONFIGS;
exports.ForgotPasswordSchema = ForgotPasswordSchema;
exports.GetCategorySchema = GetCategorySchema;
exports.GetOrderSchema = GetOrderSchema;
exports.GetPaymentSchema = GetPaymentSchema;
exports.GetProductSchema = GetProductSchema;
exports.GetReviewSchema = GetReviewSchema;
exports.ListProductReviewsSchema = ListProductReviewsSchema;
exports.ListReviewsSchema = ListReviewsSchema;
exports.LoginSchema = LoginSchema;
exports.PatchImageSchema = PatchImageSchema;
exports.RefreshTokenSchema = RefreshTokenSchema;
exports.RegisterSchema = RegisterSchema;
exports.ResetPasswordSchema = ResetPasswordSchema;
exports.UpdateAddressSchema = UpdateAddressSchema;
exports.UpdateCategorySchema = UpdateCategorySchema;
exports.UpdateColorSchema = UpdateColorSchema;
exports.UpdateOrderStatusSchema = UpdateOrderStatusSchema;
exports.UpdateProductSchema = UpdateProductSchema;
exports.UpdateProfileSchema = UpdateProfileSchema;
exports.UpdateReviewSchema = UpdateReviewSchema;
exports.UpdateSizeSchema = UpdateSizeSchema;
exports.UpdateStockSchema = UpdateStockSchema;
exports.VerifyEmailSchema = VerifyEmailSchema;
exports.validationPatterns = validationPatterns;
exports.withParams = withParams;
