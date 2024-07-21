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
    sensitive?: boolean;
};
/**
 * Enum for all the endpoints in the application.
 */
export declare enum Endpoints {
    healthz = "healthz",
    login = "login",
    register = "register",
    refresh = "refresh",
    forgotPassword = "forgotPassword",
    resetPassword = "resetPassword",
    changePassword = "changePassword",
    verifyEmail = "verifyEmail",
    resendEmailVerification = "resendEmailVerification",
    getUser = "getUser",
    listUsers = "listUsers",
    updateUser = "updateUser",
    deleteUser = "deleteUser",
    createAddress = "createAddress",
    listAddress = "listAddress",
    updateAddress = "updateAddress",
    deleteAddress = "deleteAddress",
    getCategory = "getCategory",
    listCategories = "listCategories",
    listCategoryProducts = "listCategoryProducts",
    createCategory = "createCategory",
    updateCategory = "updateCategory",
    deleteCategory = "deleteCategory",
    getProduct = "getProduct",
    listProducts = "listProducts",
    listProductStocks = "listProductStocks",
    createProduct = "createProduct",
    updateProduct = "updateProduct",
    deleteProduct = "deleteProduct",
    addImages = "addImages",
    deleteImage = "deleteImage",
    updateImage = "updateImage",
    addStock = "addStock",
    getStock = "getStock",
    listStocks = "listStocks",
    updateStock = "updateStock",
    deleteStock = "deleteStock",
    getColor = "getColor",
    listColors = "listColors",
    createColor = "createColor",
    updateColor = "updateColor",
    deleteColor = "deleteColor",
    getSize = "getSize",
    listSizes = "listSizes",
    createSize = "createSize",
    updateSize = "updateSize",
    deleteSize = "deleteSize",
    getUserCart = "getUserCart",
    addItemToCart = "addItemToCart",
    removeUserCart = "removeUserCart",
    removeItemFromCart = "removeItemFromCart",
    getUserWishlist = "getUserWishlist",
    addProductToWishlist = "addProductToWishlist",
    removeUserWishlist = "removeUserWishlist",
    removeProductFromWishlist = "removeProductFromWishlist",
    createOrder = "createOrder",
    getOrder = "getOrder",
    listOrders = "listOrders",
    deleteOrder = "deleteOrder",
    updateOrderStatus = "updateOrderStatus",
    getPayment = "getPayment",
    listPayments = "listPayments",
    paymentResponseCallback = "paymentResponseCallback",
    paymentProcessedCallback = "paymentProcessedCallback",
    getReview = "getReview",
    listReviews = "listReviews",
    createReview = "createReview",
    updateReview = "updateReview",
    deleteReview = "deleteReview",
    listProductReviews = "listProductReviews"
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
export declare const withParams: (endpoint: EndpointConfig, ...params: string[]) => EndpointConfig;
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
export declare const ENDPOINT_CONFIGS: {
    [key in Endpoints]: EndpointConfig;
};
