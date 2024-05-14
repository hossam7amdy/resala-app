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
    forgotPassword = "forgotPassword",
    resetPassword = "resetPassword",
    changePassword = "changePassword",
    verifyEmail = "verifyEmail",
    resendEmailVerification = "resendEmailVerification",
    getCurrentUser = "getCurrentUser",
    updateCurrentUser = "updateCurrentUser",
    adminGetUser = "adminGetUser",
    adminGetUsersList = "adminGetUsersList",
    adminUpdateUser = "adminUpdateUser",
    adminDeleteUser = "adminDeleteUser",
    createAddress = "createAddress",
    getAddressList = "getAddressList",
    updateAddress = "updateAddress",
    deleteAddress = "deleteAddress",
    getCategory = "getCategory",
    listCategories = "listCategories",
    listCategoryProducts = "listCategoryProducts",
    createCategory = "createCategory",
    updateCategory = "updateCategory",
    deleteCategory = "deleteCategory",
    getProduct = "getProduct",
    getProductsList = "getProductsList",
    createProduct = "createProduct",
    updateProduct = "updateProduct",
    deleteProduct = "deleteProduct",
    addProductImages = "addProductImages",
    getProductStocks = "getProductStocks",
    listProductImages = "listProductImages",
    deleteProductImage = "deleteProductImage",
    addStock = "addStock",
    getStock = "getStock",
    getStocksList = "getStocksList",
    updateStock = "updateStock",
    deleteStock = "deleteStock",
    getColor = "getColor",
    getColorsList = "getColorsList",
    createColor = "createColor",
    updateColor = "updateColor",
    deleteColor = "deleteColor",
    getSize = "getSize",
    getSizesList = "getSizesList",
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
    getOrdersList = "getOrdersList",
    deleteOrder = "deleteOrder",
    adminGetOrder = "adminGetOrder",
    adminGetOrdersList = "adminGetOrdersList",
    adminDeleteOrder = "adminDeleteOrder",
    adminUpdateOrderStatus = "adminUpdateOrderStatus",
    createPayment = "createPayment",
    getPayment = "getPayment",
    getPaymentsList = "getPaymentsList",
    paymentResponse = "paymentResponse"
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
