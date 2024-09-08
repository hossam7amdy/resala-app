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
    createCategory = "createCategory",
    updateCategory = "updateCategory",
    deleteCategory = "deleteCategory",
    getProduct = "getProduct",
    listProducts = "listProducts",
    createProduct = "createProduct",
    updateProduct = "updateProduct",
    deleteProduct = "deleteProduct",
    findImages = "findImages",
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
    voidPayment = "voidPayment",
    refundPayment = "refundPayment",
    postPayCallback = "postPayCallback",
    getReview = "getReview",
    listReviews = "listReviews",
    createReview = "createReview",
    updateReview = "updateReview",
    deleteReview = "deleteReview",
    getDashboardOverview = "getDashboardOverview",
    getInventoryStatus = "getInventoryStatus",
    getOrdersStatus = "getOrdersStatus",
    getSalesTrends = "getSalesTrends",
    listCustomersFeedback = "listCustomersFeedback",
    listTopCustomers = "listTopCustomers",
    listTopProducts = "listTopProducts"
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
export declare const withQueryParams: (endpoint: EndpointConfig, query: Record<string, string | number>) => EndpointConfig;
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
