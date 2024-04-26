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
  ORDERS: '/dashboard/orders',
  CUSTOMERS: '/dashboard/customers',
  NOT_FOUND: '/404',
};

export default ROUTES;
