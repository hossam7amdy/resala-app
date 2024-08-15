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
  SIZES: '/stocks/sizes',

  ORDERS: '/orders',

  CUSTOMERS: '/customers',
  EDIT_CUSTOMER: (id: string | number) => `/customers/${id}/edit`,
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.CATEGORIES,
  ROUTES.PRODUCTS,
  ROUTES.STOCKS,
  ROUTES.COLORS,
  ROUTES.SIZES,
  ROUTES.ORDERS,
  ROUTES.CUSTOMERS,
];
