export type EndpointConfig = {
  url: string;
  method: 'put' | 'patch' | 'get' | 'post' | 'delete';
  auth?: boolean;
  sensitive?: boolean; // Skips logging request body
};

export enum Endpoints {
  healthz = 'healthz',

  // user endpoints
  login = 'login',
  register = 'register',
  forgotPassword = 'forgotPassword',
  resetPassword = 'resetPassword',
  changePassword = 'changePassword',
  verifyEmail = 'verifyEmail',
  resendEmailVerification = 'resendEmailVerification',
  getCurrentUser = 'getCurrentUser',
  updateCurrentUser = 'updateCurrentUser',
  adminGetUser = 'adminGetUser',
  adminGetUsersList = 'adminGetUsersList',
  adminAddUser = 'adminAddUser',
  adminUpdateUser = 'adminUpdateUser',
  adminDeleteUser = 'adminDeleteUser',

  // user address endpoints
  createAddress = 'createAddress',
  getAddressList = 'getAddressList',
  updateAddress = 'updateAddress',
  deleteAddress = 'deleteAddress',

  // category endpoints
  getCategory = 'getCategory',
  getCategoryList = 'getCategoryList',
  getCategoryProducts = 'getCategoryProducts',
  getSubCategories = 'getSubCategories',
  createCategory = 'createCategory',
  updateCategory = 'updateCategory',
  deleteCategory = 'deleteCategory',
  restoreCategory = 'restoreCategory',

  // product endpoints
  getProduct = 'getProduct',
  getProductsList = 'getProductsList',
  createProduct = 'createProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',
  restoreProduct = 'restoreProduct',
  addProductImages = 'addProductImages',
  deleteProductImage = 'deleteProductImage',

  // stock endpoints
  getStock = 'getStock',
  getStocksList = 'getStocksList',
  createStock = 'createStock',
  updateStock = 'updateStock',

  // color endpoints
  getColor = 'getColor',
  getColorsList = 'getColorsList',
  createColor = 'createColor',
  updateColor = 'updateColor',

  // size endpoints
  getSize = 'getSize',
  getSizesList = 'getSizesList',
  createSize = 'createSize',
  updateSize = 'updateSize',

  // shopping endpoints
  getUserCart = 'getUserCart',
  addItemToCart = 'addItemToCart',
  removeItemFromCart = 'removeItemFromCart',
  getUserWishlist = 'getUserWishlist',
  addProductToWishlist = 'addProductToWishlist',
  removeProductFromWishlist = 'removeProductFromWishlist',
}

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

export const ENDPOINT_CONFIGS: { [key in Endpoints]: EndpointConfig } = {
  [Endpoints.healthz]: { method: 'get', url: '/api/v1/healthz' },

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
  [Endpoints.adminAddUser]: {
    method: 'post',
    url: '/api/v1/users',
    auth: true,
  },
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

  [Endpoints.createAddress]: {
    url: '/api/v1/address',
    method: 'post',
    auth: true,
  },
  [Endpoints.getAddressList]: {
    url: '/api/v1/address',
    method: 'get',
    auth: true,
  },
  [Endpoints.updateAddress]: {
    url: '/api/v1/address/:addressId',
    method: 'put',
    auth: true,
  },
  [Endpoints.deleteAddress]: {
    url: '/api/v1/address/:addressId',
    method: 'delete',
    auth: true,
  },

  [Endpoints.getCategory]: {
    url: '/api/v1/categories/:categoryId',
    method: 'get',
  },
  [Endpoints.getCategoryList]: {
    url: '/api/v1/categories',
    method: 'get',
  },
  [Endpoints.getSubCategories]: {
    url: '/api/v1/categories/:categoryId/sub-categories',
    method: 'get',
  },
  [Endpoints.getCategoryProducts]: {
    url: '/api/v1/categories/:categoryId/products',
    method: 'get',
  },
  [Endpoints.createCategory]: {
    url: '/api/v1/categories',
    method: 'post',
    auth: true,
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
  [Endpoints.restoreCategory]: {
    url: '/api/v1/categories',
    method: 'patch',
    auth: true,
  },
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
  [Endpoints.restoreProduct]: {
    url: '/api/v1/products',
    method: 'patch',
    auth: true,
  },
  [Endpoints.addProductImages]: {
    url: '/api/v1/products/:productId/images',
    method: 'post',
    auth: true,
  },
  [Endpoints.deleteProductImage]: {
    url: '/api/v1/products/:productId/images/:imageId',
    method: 'delete',
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
  [Endpoints.createStock]: {
    url: '/api/v1/stocks',
    method: 'post',
    auth: true,
  },
  [Endpoints.updateStock]: {
    url: '/api/v1/stocks/:stockId',
    method: 'put',
    auth: true,
  },
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

  [Endpoints.getUserCart]: {
    url: '/api/v1/users/cart',
    method: 'get',
    auth: true,
  },
  [Endpoints.addItemToCart]: {
    url: '/api/v1/users/cart',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeItemFromCart]: {
    url: '/api/v1/users/cart/:stockId',
    method: 'delete',
    auth: true,
  },
  [Endpoints.getUserWishlist]: {
    url: '/api/v1/users/wishlist',
    method: 'get',
    auth: true,
  },
  [Endpoints.addProductToWishlist]: {
    url: '/api/v1/users/wishlist',
    method: 'post',
    auth: true,
  },
  [Endpoints.removeProductFromWishlist]: {
    url: '/api/v1/users/wishlist/:productId',
    method: 'delete',
    auth: true,
  },
};
