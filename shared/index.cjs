'use strict';

var zod = require('zod');

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
        pattern: /^[\u0600-\u06FF\s0-9]+$/,
        message: 'فقط الحروف العربية مسموح بها',
    },
    validateEnglishCharacters: {
        pattern: /^[a-zA-Z\s0-9]+$/,
        message: 'Only English characters are allowed',
    },
};

exports.ROLE = void 0;
(function (ROLE) {
    ROLE["ADMIN"] = "ADMIN";
    ROLE["CUSTOMER"] = "CUSTOMER";
    ROLE["MODERATOR"] = "MODERATOR";
})(exports.ROLE || (exports.ROLE = {}));

const UserSchema = zod.object({
    email: zod.string().min(5).max(128).email(),
    isVerified: zod.boolean().optional(),
    phone: zod.string().length(11).startsWith('01'),
    firstName: zod.string().min(2).max(50),
    lastName: zod.string().min(2).max(50),
    role: zod.enum([exports.ROLE.ADMIN, exports.ROLE.MODERATOR, exports.ROLE.CUSTOMER]),
    password: zod
        .string()
        .min(8)
        .max(50)
        .regex(validationPatterns.passwordContainsLowerCaseCharacter.pattern, validationPatterns.passwordContainsLowerCaseCharacter.message)
        .regex(validationPatterns.passwordContainsNumericCharacters.pattern, validationPatterns.passwordContainsNumericCharacters.message)
        .regex(validationPatterns.passwordContainsUpperCaseCharacter.pattern, validationPatterns.passwordContainsUpperCaseCharacter.message),
});
// Pagination Schema
const DefaultQuerySchema = zod.object({
    query: zod.object({
        page: zod.coerce
            .number()
            .positive()
            .max(100)
            .optional()
            .transform(val => val || 1),
        limit: zod.coerce
            .number()
            .positive()
            .max(100)
            .optional()
            .transform(val => val || 10),
        query: zod
            .string()
            .min(0)
            .max(50)
            .optional()
            .transform(val => val || ''),
        deleted: zod
            .enum(['true', 'false'])
            .optional()
            .transform(val => val === 'true'),
    }),
});
// Auth Schemas
const LoginSchema = zod.object({
    body: zod.object({
        sign: zod.string(),
        password: zod.string(),
    }),
});
const RegisterSchema = zod.object({
    body: zod.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
        email: UserSchema.shape.email,
        password: UserSchema.shape.password,
    }),
});
const VerifyEmailSchema = zod.object({
    query: zod.object({
        email: UserSchema.shape.email,
        token: zod.string().min(80),
    }),
});
const ResetPasswordSchema = zod.object({
    body: zod.object({
        email: UserSchema.shape.email,
        code: zod.string().length(6),
        password: UserSchema.shape.password,
    }),
});
const ChangePasswordSchema = zod.object({
    body: zod.object({
        oldPassword: UserSchema.shape.password,
        newPassword: UserSchema.shape.password,
    }),
});
const ForgotPasswordSchema = zod.object({
    body: zod.object({
        email: UserSchema.shape.email,
    }),
});
// User Schemas
const UpdateProfileSchema = zod.object({
    body: zod.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
    }),
});
const AdminGetUserSchema = zod.object({
    params: zod.object({
        userId: zod.coerce.number().positive(),
    }),
});
const AdminUpdateUserSchema = zod.object({
    params: zod.object({
        userId: zod.coerce.number().positive(),
    }),
    body: UpdateProfileSchema.shape.body.extend({
        role: UserSchema.shape.role,
        isVerified: UserSchema.shape.isVerified,
        deletedAt: zod.date().optional(),
    }),
});
const AdminDeleteUserSchema = zod.object({
    params: zod.object({
        userId: zod.coerce.number().positive(),
    }),
});
const CreateAddressSchema = zod.object({
    body: zod.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
        state: zod.string().max(100),
        city: zod.string().max(100),
        street: zod.string().max(100),
        country: zod.string().max(100).optional(),
        building: zod.string().max(50).optional(),
        floor: zod.coerce.number().positive().optional(),
        address: zod.string().max(500).optional(),
    }),
});
const UpdateAddressSchema = zod.object({
    params: zod.object({
        addressId: zod.coerce.number().positive(),
    }),
    body: CreateAddressSchema.shape.body,
});
const DeleteAddressSchema = zod.object({
    params: UpdateAddressSchema.shape.params,
});
// Category Schemas
const CreateCategorySchema = zod.object({
    body: zod.object({
        categoryId: zod.coerce.number().positive().optional(),
        arName: zod.string().min(2).max(100),
        enName: zod.string().min(2).max(100),
    }),
});
const UpdateCategorySchema = zod.object({
    params: zod.object({
        categoryId: zod.coerce.number().positive(),
    }),
    body: CreateCategorySchema.shape.body.extend({
        deletedAt: zod.coerce.date().optional(),
    }),
});
const GetCategorySchema = zod.object({
    params: UpdateCategorySchema.shape.params,
});
const DeleteCategorySchema = zod.object({
    params: UpdateCategorySchema.shape.params,
});
// Product Schemas
const CreateProductSchema = zod.object({
    body: zod.object({
        id: zod.coerce.number().positive().optional(),
        categoryId: zod.coerce.number().positive(),
        arName: zod.string().min(2).max(100),
        enName: zod.string().min(2).max(100),
        arDescription: zod.string().max(500),
        enDescription: zod.string().max(500),
        price: zod.coerce.number().positive(),
    }),
});
const UpdateProductSchema = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
    }),
    body: CreateProductSchema.shape.body.extend({
        deletedAt: zod.coerce.date().optional(),
    }),
});
const DeleteProductSchema = zod.object({
    params: UpdateProductSchema.shape.params,
});
const GetProductImages = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
const CreateProductImageSchema = zod.object({
    body: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
const DeleteProductImageSchema = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
        imageId: zod.coerce.number().positive(),
    }),
});
// Stock Schemas
const CreateStockSchema = zod.object({
    body: zod.object({
        productId: zod.coerce.number().positive(),
        colorId: zod.coerce.number().positive(),
        sizeId: zod.coerce.number().positive(),
        quantity: zod.coerce.number().nonnegative(),
    }),
});
const UpdateStockSchema = zod.object({
    params: zod.object({
        stockId: zod.coerce.number().positive(),
    }),
    body: CreateStockSchema.shape.body,
});
const DeleteStockSchema = zod.object({
    params: zod.object({
        stockId: zod.coerce.number().positive(),
    }),
});
// Color Schemas
const CreateColorSchema = zod.object({
    body: zod.object({
        arName: zod.string().min(2).max(15),
        enName: zod.string().min(2).max(15),
        code: zod.string().startsWith('#').length(7),
    }),
});
const UpdateColorSchema = zod.object({
    params: zod.object({
        colorId: zod.coerce.number().positive(),
    }),
    body: CreateColorSchema.shape.body,
});
const DeleteColorSchema = zod.object({
    params: UpdateColorSchema.shape.params,
});
// Size Schemas
const CreateSizeSchema = zod.object({
    body: zod.object({
        name: zod.string().min(1).max(15),
    }),
});
const UpdateSizeSchema = zod.object({
    params: zod.object({
        sizeId: zod.coerce.number().positive(),
    }),
    body: CreateSizeSchema.shape.body,
});
const DeleteSizeSchema = zod.object({
    params: UpdateSizeSchema.shape.params,
});
// Cart Schemas
const CreateCartSchema = zod.object({
    body: zod.object({
        stockId: zod.coerce.number().positive(),
        quantity: zod.coerce.number().positive(),
    }),
});
const DeleteCartSchema = zod.object({
    params: zod.object({
        stockId: zod.coerce.number().positive(),
    }),
});
const CreateWishlistSchema = zod.object({
    body: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
const DeleteWishlistSchema = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
// Order Schemas
const CreateOrderSchema = zod.object({
    body: zod.object({
        paymentMethod: zod.enum(['CARD', 'CASH']),
        note: zod.string().max(500).optional(),
        addressId: zod.coerce.number().positive(),
    }),
});
const GetOrderSchema = zod.object({
    params: zod.object({
        orderId: zod.coerce.number().positive(),
    }),
});
// Payment Schemas
const CreatePaymentSchema = zod.object({
    query: zod.object({
        hmac: zod.string(),
    }),
});
const GetPaymentSchema = zod.object({
    params: zod.object({
        paymentId: zod.coerce.number().positive(),
    }),
});

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
    Endpoints["forgotPassword"] = "forgotPassword";
    Endpoints["resetPassword"] = "resetPassword";
    Endpoints["changePassword"] = "changePassword";
    Endpoints["verifyEmail"] = "verifyEmail";
    Endpoints["resendEmailVerification"] = "resendEmailVerification";
    // user endpoints
    Endpoints["getCurrentUser"] = "getCurrentUser";
    Endpoints["updateCurrentUser"] = "updateCurrentUser";
    Endpoints["adminGetUser"] = "adminGetUser";
    Endpoints["adminGetUsersList"] = "adminGetUsersList";
    Endpoints["adminUpdateUser"] = "adminUpdateUser";
    Endpoints["adminDeleteUser"] = "adminDeleteUser";
    // address endpoints
    Endpoints["createAddress"] = "createAddress";
    Endpoints["getAddressList"] = "getAddressList";
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
    Endpoints["getProductsList"] = "getProductsList";
    Endpoints["createProduct"] = "createProduct";
    Endpoints["updateProduct"] = "updateProduct";
    Endpoints["deleteProduct"] = "deleteProduct";
    Endpoints["addProductImages"] = "addProductImages";
    Endpoints["getProductStocks"] = "getProductStocks";
    Endpoints["listProductImages"] = "listProductImages";
    Endpoints["deleteProductImage"] = "deleteProductImage";
    // stock endpoints
    Endpoints["addStock"] = "addStock";
    Endpoints["getStock"] = "getStock";
    Endpoints["getStocksList"] = "getStocksList";
    Endpoints["updateStock"] = "updateStock";
    Endpoints["deleteStock"] = "deleteStock";
    // color endpoints
    Endpoints["getColor"] = "getColor";
    Endpoints["getColorsList"] = "getColorsList";
    Endpoints["createColor"] = "createColor";
    Endpoints["updateColor"] = "updateColor";
    Endpoints["deleteColor"] = "deleteColor";
    // size endpoints
    Endpoints["getSize"] = "getSize";
    Endpoints["getSizesList"] = "getSizesList";
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
    Endpoints["getOrdersList"] = "getOrdersList";
    Endpoints["deleteOrder"] = "deleteOrder";
    Endpoints["adminGetOrder"] = "adminGetOrder";
    Endpoints["adminGetOrdersList"] = "adminGetOrdersList";
    Endpoints["adminDeleteOrder"] = "adminDeleteOrder";
    // payment endpoints
    Endpoints["createPayment"] = "createPayment";
    Endpoints["getPayment"] = "getPayment";
    Endpoints["getPaymentsList"] = "getPaymentsList";
    Endpoints["paymentResponse"] = "paymentResponse";
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
function withParams(endpoint, ...params) {
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
    };
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
    [exports.Endpoints.adminGetUsersList]: {
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
    [exports.Endpoints.getAddressList]: {
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
    [exports.Endpoints.getProductsList]: {
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
    [exports.Endpoints.addProductImages]: {
        url: '/api/v1/products/images',
        method: 'post',
        auth: true,
    },
    [exports.Endpoints.listProductImages]: {
        url: '/api/v1/products/:productId/images',
        method: 'get',
    },
    [exports.Endpoints.deleteProductImage]: {
        url: '/api/v1/products/:productId/images/:imageId',
        method: 'delete',
        auth: true,
    },
    [exports.Endpoints.getProductStocks]: {
        url: '/api/v1/products/:productId/stocks',
        method: 'get',
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
    [exports.Endpoints.getStocksList]: {
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
    [exports.Endpoints.getColorsList]: {
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
    [exports.Endpoints.getSizesList]: {
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
    [exports.Endpoints.getOrdersList]: {
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
    [exports.Endpoints.adminGetOrdersList]: {
        url: '/api/v1/admin/orders',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.adminDeleteOrder]: {
        url: '/api/v1/admin/orders/:orderId',
        method: 'delete',
        auth: true,
    },
    // payment endpoints
    [exports.Endpoints.createPayment]: {
        url: '/api/v1/payments',
        method: 'post',
    },
    [exports.Endpoints.getPayment]: {
        url: '/api/v1/payments/:paymentId',
        method: 'get',
        auth: true,
    },
    [exports.Endpoints.paymentResponse]: {
        url: '/api/v1/payments/response',
        method: 'get',
    },
    [exports.Endpoints.getPaymentsList]: {
        url: '/api/v1/payments',
        method: 'get',
        auth: true,
    },
};

exports.AdminDeleteUserSchema = AdminDeleteUserSchema;
exports.AdminGetUserSchema = AdminGetUserSchema;
exports.AdminUpdateUserSchema = AdminUpdateUserSchema;
exports.ChangePasswordSchema = ChangePasswordSchema;
exports.CreateAddressSchema = CreateAddressSchema;
exports.CreateCartSchema = CreateCartSchema;
exports.CreateCategorySchema = CreateCategorySchema;
exports.CreateColorSchema = CreateColorSchema;
exports.CreateOrderSchema = CreateOrderSchema;
exports.CreatePaymentSchema = CreatePaymentSchema;
exports.CreateProductImageSchema = CreateProductImageSchema;
exports.CreateProductSchema = CreateProductSchema;
exports.CreateSizeSchema = CreateSizeSchema;
exports.CreateStockSchema = CreateStockSchema;
exports.CreateWishlistSchema = CreateWishlistSchema;
exports.DefaultQuerySchema = DefaultQuerySchema;
exports.DeleteAddressSchema = DeleteAddressSchema;
exports.DeleteCartSchema = DeleteCartSchema;
exports.DeleteCategorySchema = DeleteCategorySchema;
exports.DeleteColorSchema = DeleteColorSchema;
exports.DeleteProductImageSchema = DeleteProductImageSchema;
exports.DeleteProductSchema = DeleteProductSchema;
exports.DeleteSizeSchema = DeleteSizeSchema;
exports.DeleteStockSchema = DeleteStockSchema;
exports.DeleteWishlistSchema = DeleteWishlistSchema;
exports.ENDPOINT_CONFIGS = ENDPOINT_CONFIGS;
exports.ForgotPasswordSchema = ForgotPasswordSchema;
exports.GetCategorySchema = GetCategorySchema;
exports.GetOrderSchema = GetOrderSchema;
exports.GetPaymentSchema = GetPaymentSchema;
exports.GetProductImages = GetProductImages;
exports.LoginSchema = LoginSchema;
exports.RegisterSchema = RegisterSchema;
exports.ResetPasswordSchema = ResetPasswordSchema;
exports.UpdateAddressSchema = UpdateAddressSchema;
exports.UpdateCategorySchema = UpdateCategorySchema;
exports.UpdateColorSchema = UpdateColorSchema;
exports.UpdateProductSchema = UpdateProductSchema;
exports.UpdateProfileSchema = UpdateProfileSchema;
exports.UpdateSizeSchema = UpdateSizeSchema;
exports.UpdateStockSchema = UpdateStockSchema;
exports.VerifyEmailSchema = VerifyEmailSchema;
exports.validationPatterns = validationPatterns;
exports.withParams = withParams;
