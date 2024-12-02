import { ENDPOINT_CONFIGS, type EndpointConfig, Endpoints } from '@resala/shared';

export enum StorefrontEndpoints {
  createAddress = Endpoints.createAddress,
  listAddress = Endpoints.listAddress,
  updateAddress = Endpoints.updateAddress,
  deleteAddress = Endpoints.deleteAddress,

  getCategory = Endpoints.getCategory,
  listCategories = Endpoints.listCategories,

  getProduct = Endpoints.getProduct,
  listProducts = Endpoints.listProducts,
  listStocks = Endpoints.listStocks,

  getUserCart = Endpoints.getUserCart,
  addItemToCart = Endpoints.addItemToCart,
  removeUserCart = Endpoints.removeUserCart,
  removeItemFromCart = Endpoints.removeItemFromCart,
  getUserWishlist = Endpoints.getUserWishlist,
  addProductToWishlist = Endpoints.addProductToWishlist,
  removeUserWishlist = Endpoints.removeUserWishlist,
  removeProductFromWishlist = Endpoints.removeProductFromWishlist,

  checkout = Endpoints.checkout,
  listOrders = Endpoints.listOrders,

  getReview = Endpoints.getReview,
  listReviews = Endpoints.listReviews,
  createReview = Endpoints.createReview,
  updateReview = Endpoints.updateReview,
  deleteReview = Endpoints.deleteReview,

  getSalesTrends = Endpoints.getSalesTrends,
  listTopProducts = Endpoints.listTopProducts,
}

export const STOREFRONT_ENDPOINT_CONFIGS: { [_key in StorefrontEndpoints]: EndpointConfig } = {
  // address endpoints
  [Endpoints.createAddress]: ENDPOINT_CONFIGS[Endpoints.createAddress],
  [Endpoints.listAddress]: ENDPOINT_CONFIGS[Endpoints.listAddress],
  [Endpoints.updateAddress]: ENDPOINT_CONFIGS[Endpoints.updateAddress],
  [Endpoints.deleteAddress]: ENDPOINT_CONFIGS[Endpoints.deleteAddress],

  // category endpoints
  [Endpoints.listCategories]: ENDPOINT_CONFIGS[Endpoints.listCategories],
  [Endpoints.getCategory]: ENDPOINT_CONFIGS[Endpoints.getCategory],

  // product endpoints
  [Endpoints.getProduct]: ENDPOINT_CONFIGS[Endpoints.getProduct],
  [Endpoints.listProducts]: ENDPOINT_CONFIGS[Endpoints.listProducts],
  [Endpoints.listStocks]: ENDPOINT_CONFIGS[Endpoints.listStocks],

  // shopping endpoints
  [Endpoints.addItemToCart]: ENDPOINT_CONFIGS[Endpoints.addItemToCart],
  [Endpoints.removeItemFromCart]: ENDPOINT_CONFIGS[Endpoints.removeItemFromCart],
  [Endpoints.getUserCart]: ENDPOINT_CONFIGS[Endpoints.getUserCart],
  [Endpoints.removeUserCart]: ENDPOINT_CONFIGS[Endpoints.removeUserCart],
  [Endpoints.addProductToWishlist]: ENDPOINT_CONFIGS[Endpoints.addProductToWishlist],
  [Endpoints.removeProductFromWishlist]: ENDPOINT_CONFIGS[Endpoints.removeProductFromWishlist],
  [Endpoints.removeUserWishlist]: ENDPOINT_CONFIGS[Endpoints.removeUserWishlist],
  [Endpoints.getUserWishlist]: ENDPOINT_CONFIGS[Endpoints.getUserWishlist],

  // order endpoints
  [Endpoints.checkout]: ENDPOINT_CONFIGS[Endpoints.checkout],
  [Endpoints.listOrders]: ENDPOINT_CONFIGS[Endpoints.listOrders],

  // product reviews endpoints
  [Endpoints.createReview]: ENDPOINT_CONFIGS[Endpoints.createReview],
  [Endpoints.updateReview]: ENDPOINT_CONFIGS[Endpoints.updateReview],
  [Endpoints.deleteReview]: ENDPOINT_CONFIGS[Endpoints.deleteReview],
  [Endpoints.getReview]: ENDPOINT_CONFIGS[Endpoints.getReview],
  [Endpoints.listReviews]: ENDPOINT_CONFIGS[Endpoints.listReviews],

  // dashboard endpoints
  [Endpoints.listTopProducts]: ENDPOINT_CONFIGS[Endpoints.listTopProducts],
  [Endpoints.getSalesTrends]: ENDPOINT_CONFIGS[Endpoints.getSalesTrends],
};
