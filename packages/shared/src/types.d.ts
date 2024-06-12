import type { z } from 'zod';
import type { OrderStatus, PaymentMethod, PaymentStatus, Role } from './enums.js';
import type { DefaultQuerySchema } from './validation-schema.js';
export type RoleType = keyof typeof Role;
export type OrderStatusType = keyof typeof OrderStatus;
export type PaymentStatusType = keyof typeof PaymentStatus;
export type PaymentMethodType = keyof typeof PaymentMethod;
export type DefaultFilters = z.infer<typeof DefaultQuerySchema>['query'];
export type Pagination = {
    page: number;
    limit: number;
    total: number;
};
export type User = {
    id: number;
    email: string;
    isVerified: boolean;
    phone: string;
    firstName: string;
    lastName: string;
    role: RoleType;
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
    price: number | any;
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
    subtotal: number | any;
    discount: number | any;
    total: number | any;
    orderStatus: OrderStatusType;
    paymentMethod: PaymentMethodType;
    paymentStatus: PaymentStatusType;
    note: null | string;
    createdAt: Date;
    updatedAt: Date;
};
export type OrderItem = {
    id: number;
    name: string;
    color: string;
    size: string;
    price: number | any;
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
    transactionId: string | number;
    transactionOrderId: number;
    pending: boolean;
    success: boolean;
    isAuth: boolean;
    isCapture: boolean;
    amountCents: number | any;
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
    floor: null | number;
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
