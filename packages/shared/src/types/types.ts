/* eslint-disable @typescript-eslint/no-explicit-any */
import type { z } from 'zod';

import type { OrderStatus, PaymentMethod, PaymentStatus, Role } from '../enums/index.js';
import type { OffsetPageParamsSchema } from '../validations/index.js';

export type RoleType = keyof typeof Role;

export type OrderStatusType = keyof typeof OrderStatus;

export type PaymentStatusType = keyof typeof PaymentStatus;

export type PaymentMethodType = keyof typeof PaymentMethod;

export type OffsetPageParams = z.infer<typeof OffsetPageParamsSchema>;

export type SignProvider = 'google';

export type ProviderUser = Pick<User, 'email' | 'firstName' | 'lastName' | 'isEmailVerified'>;

export type JwtPayload = {
  id: string;
  email: string;
  strategy?: 'credentials' | SignProvider;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type User = {
  id: number;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  isPhoneVerified: boolean;
  firstName: string;
  lastName: string;
  role: RoleType;
  lastLogin: null | Date;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAddress = {
  userId: number;
  addressId: number;
};

export type Category = {
  id: number;
  arName: string;
  enName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  categoryId: number;
  arName: string;
  enName: string;
  arDescription: string;
  enDescription: string;
  price: any; // Decimal type from 'decimal.js' lib
  imageKey: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Image = {
  id: number;
  colorId: number;
  productId: number;
  isPrimary: boolean;
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
  subtotal: any; // Decimal type from 'decimal.js' lib
  discount: any; // Decimal type from 'decimal.js' lib
  total: any; // Decimal type from 'decimal.js' lib
  orderStatus: OrderStatusType;
  transactionId: null | string;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatusType;
  note: null | string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  productId: number;
  stockId: number;
  price: any; // Decimal type from 'decimal.js' lib
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Shipping = {
  id: number;
  orderId: number;
  addressId: number;
  cost: any; // Decimal type from 'decimal.js' lib
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
  floor: null | number;
  address: null | string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};
