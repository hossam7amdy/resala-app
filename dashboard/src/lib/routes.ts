export const ROUTES = {
  // Auth routes (public)
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Dashboard routes (private)
  DASHBOARD: '/dashboard',

  CATEGORIES: '/categories',
  CREATE_CATEGORY: '/categories/create',
  EDIT_CATEGORY: (id: string | number) => `/categories/${id}/edit`,

  PRODUCTS: '/products',
  PRODUCT_DETAILS: (id: string | number) => `/products/${id}`,
  CREATE_PRODUCT: '/products/create',
  EDIT_PRODUCT: (id: string | number) => `/products/${id}/edit`,
  PRODUCT_IMAGES: (id: string | number) => `/products/${id}?tab=images`,
  UPLOAD_IMAGES: (id: string | number) => `/products/${id}/upload`,
  PRODUCT_STOCKS: (id: string | number) => `/products/${id}?tab=stocks`,

  STOCKS: '/stocks',
  CREATE_STOCK: (id?: string | number) => `/stocks/create?productId=${id}`,
  EDIT_STOCK: (stockId: string | number) => `/stocks/${stockId}/edit`,

  ORDERS: '/orders',
  CUSTOMERS: '/customers',
};

export default ROUTES;
