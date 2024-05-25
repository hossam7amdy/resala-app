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
    Endpoints["adminUpdateOrderStatus"] = "adminUpdateOrderStatus";
    // payment endpoints
    Endpoints["createPayment"] = "createPayment";
    Endpoints["getPayment"] = "getPayment";
    Endpoints["getPaymentsList"] = "getPaymentsList";
    Endpoints["paymentResponse"] = "paymentResponse";
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
 * withParams(ENDPOINT_CONFIGS.adminGetUser, '123')
 * // returns { url: '/api/v1/users/123', method: 'get' }
 */
export const withParams = (endpoint, ...params) => {
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
export const ENDPOINT_CONFIGS = {
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
        auth: true,
    },
    [Endpoints.verifyEmail]: {
        method: 'get',
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
        url: '/api/v1/products/images',
        method: 'post',
        auth: true,
    },
    [Endpoints.listProductImages]: {
        url: '/api/v1/products/:productId/images',
        method: 'get',
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
    [Endpoints.adminUpdateOrderStatus]: {
        url: '/api/v1/admin/orders/:orderId',
        method: 'patch',
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
    [Endpoints.paymentResponse]: {
        url: '/api/v1/payments/response',
        method: 'get',
    },
    [Endpoints.getPaymentsList]: {
        url: '/api/v1/payments',
        method: 'get',
        auth: true,
    },
};
