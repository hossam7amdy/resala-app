import type { OrderStatus, PaymentMethod, PaymentStatus, Role } from './enums.js';

export type User = {
  id: number;
  email: string;
  isVerified: boolean;
  phone: string;
  firstName: string;
  lastName: string;
  role: Role;
  lastLogin?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
};

export type UserAddress = {
  userId: number;
  addressId: number;
};

export type Category = {
  id: number;
  categoryId?: number;
  arName: string;
  enName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
};

export type Product = {
  id: number;
  categoryId: number;
  arName: string;
  enName: string;
  arDescription: string;
  enDescription: string;
  price: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
};

export type ProductImage = {
  id: number;
  productId: number;
  imageKey: string;
  imageUrl: string;
  createdAt: Date | string;
};

export type Stock = {
  id: number;
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Color = {
  id: number;
  code: string;
  arName: string;
  enName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Size = {
  id: number;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Cart = {
  userId: number;
  stockId: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Wishlist = {
  userId: number;
  productId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Order = {
  id: number;
  userId?: number;
  subtotal: number;
  discount: number;
  total: number;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  note?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type OrderItem = {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Shipping = {
  id: number;
  orderId: number;
  addressId: number;
  cost: number;
  createdAt: Date | string;
  updatedAt: Date | string;
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
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Review = {
  id: number;
  productId: number;
  userId?: number;
  rating: number;
  comment?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Address = {
  id: number;
  country: string;
  state: string;
  city: string;
  street: string;
  building?: string;
  floor?: string;
  address?: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Notification = {
  id: number;
  userId: number;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};
