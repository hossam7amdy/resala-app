import type { z } from 'zod';

import type {
  DiscountEnum,
  MarketingState,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Role,
} from '../enums/index.js';
import type {
  AddressSchema,
  CartSchema,
  CategorySchema,
  ColorSchema,
  DiscountSchema,
  ImageSchema,
  MediaSchema,
  OffsetPageParamsSchema,
  OrderItemSchema,
  OrderSchema,
  ProductSchema,
  ReviewSchema,
  SizeSchema,
  StockSchema,
  UserSchema,
  WishlistSchema,
} from '../validations/index.js';

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type RoleType = `${Role}`;

export type OrderStatusType = `${OrderStatus}`;

export type PaymentStatusType = `${PaymentStatus}`;

export type PaymentMethodType = `${PaymentMethod}`;

export type DiscountType = `${DiscountEnum}`;

export type MarketingStateType = `${MarketingState}`;

export type OffsetPageParams = z.infer<typeof OffsetPageParamsSchema>;

export type SignProvider = 'google';

export type ProviderUser = Pick<User, 'email' | 'firstName' | 'lastName' | 'emailVerified'>;

export type User = z.infer<typeof UserSchema>;

export type Color = z.infer<typeof ColorSchema>;

export type Size = z.infer<typeof SizeSchema>;

export type Cart = z.infer<typeof CartSchema>;

export type Wishlist = z.infer<typeof WishlistSchema>;

export type OrderItem = z.infer<typeof OrderItemSchema>;

export type Review = z.infer<typeof ReviewSchema>;

export type Address = z.infer<typeof AddressSchema>;

export type Discount = z.infer<typeof DiscountSchema>;

export type Category = z.infer<typeof CategorySchema>;

export type Product = z.infer<typeof ProductSchema>;

export type Image = z.infer<typeof ImageSchema>;

export type Stock = z.infer<typeof StockSchema>;

export type Order = z.infer<typeof OrderSchema>;

export type Media = z.infer<typeof MediaSchema>;
