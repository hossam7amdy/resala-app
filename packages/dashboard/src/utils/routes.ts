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
  CREATE_PRODUCT: '/products/create',
  EDIT_PRODUCT: (id: string | number) => `/products/${id}/edit`,
  PRODUCT_STOCKS: (id: string | number) => `/products/${id}`,

  STOCKS: '/stocks',
  CREATE_STOCK: (id?: string | number) => `/stocks/create?productId=${id}`,
  EDIT_STOCK: (stockId: string | number) => `/stocks/${stockId}/edit`,

  COLORS: '/stocks/colors',
  CREATE_COLOR: '/stocks/colors/create',
  EDIT_COLOR: (id: string | number) => `/stocks/colors/${id}/edit`,

  SIZES: '/stocks/sizes',
  CREATE_SIZE: '/stocks/sizes/create',
  EDIT_SIZE: (id: string | number) => `/stocks/sizes/${id}/edit`,

  ORDERS: '/orders',

  CUSTOMERS: '/customers',
  EDIT_CUSTOMER: (id: string | number) => `/customers/${id}/edit`,
};

export default ROUTES;
