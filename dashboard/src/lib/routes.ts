const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  DASHBOARD: '/dashboard',
  CATEGORIES: '/dashboard/categories',
  CREATE_CATEGORY: '/dashboard/categories/create',
  EDIT_CATEGORY: (id: string | number) => `/dashboard/categories/${id}/edit`,
  PRODUCTS: '/dashboard/products',
  CREATE_PRODUCT: '/dashboard/products/create',
  EDIT_PRODUCT: (id: string | number) => `/dashboard/products/${id}/edit`,
  ORDERS: '/dashboard/orders',
  CUSTOMERS: '/dashboard/customers',
  NOT_FOUND: '/404',
};

export default ROUTES;
