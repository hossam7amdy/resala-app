export type Role = 'ADMIN' | 'CUSTOMER' | 'MODERATOR';

export type OrderStatus = 'PENDING' | 'FULFILLED' | 'CANCELLED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'FAILED' | 'VOIDED' | 'REFUNDED';

export type PaymentMethod = 'CASH' | 'CARD';

export type User = {
  id: number;
  email: string;
  isVerified: boolean;
  phone: string;
  firstName: string;
  lastName: string;
  role: Role;
  lastLogin: null | Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
};

export type UserAddress = {
  userId: number;
  addressId: number;
};

export type Category = {
  id: number;
  categoryId: null | number;
  arName: string;
  enName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
};

export type Product = {
  id: number;
  categoryId: number;
  arName: string;
  enName: string;
  arDescription: string;
  enDescription: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
};

export type ProductImage = {
  id: number;
  productId: number;
  imageKey: string;
  imageUrl: string;
  createdAt: Date;
};

export type Stock = {
  id: number;
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Color = {
  id: number;
  code: string;
  arName: string;
  enName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Size = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = {
  userId: number;
  stockId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Wishlist = {
  userId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: number;
  userId: null | number;
  subtotal: number;
  discount: number;
  total: number;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  note: null | string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Shipping = {
  id: number;
  orderId: number;
  addressId: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: number;
  orderId: number;
  transactionId: string;
  transactionOrderId: string;
  pending: boolean;
  success: boolean;
  isAuth: boolean;
  isCapture: boolean;
  amountCents: number;
  isVoided: boolean;
  isRefunded: boolean;
  is3DSecure: boolean;
  integrationId: number;
  deliveryNeeded: boolean;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Review = {
  id: number;
  productId: number;
  userId: null | number;
  rating: number;
  comment: null | string;
  createdAt: Date;
  updatedAt: Date;
};

export type Address = {
  id: number;
  country: string;
  state: string;
  city: string;
  street: string;
  building: null | string;
  floor: null | string;
  address: null | string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Notification = {
  id: number;
  userId: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};
