/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @file This file contains all the types for the API requests and responses.
 *
 * It is used by the API service to validate the request and response data.
 * It is also used by the API service to generate the API client.
 */
import type { z } from 'zod';

import type { Pagination, Product, Review, User } from './types.js';
import type {
  AdminDeleteUserSchema,
  AdminGetUserSchema,
  AdminUpdateUserSchema,
  ChangePasswordSchema,
  CreateAddressSchema,
  CreateCartSchema,
  CreateCategorySchema,
  CreateColorSchema,
  CreateOrderSchema,
  CreatePaymentSchema,
  CreateProductImageSchema,
  CreateProductSchema,
  CreateReviewSchema,
  CreateSizeSchema,
  CreateStockSchema,
  CreateWishlistSchema,
  DefaultQuerySchema,
  DeleteAddressSchema,
  DeleteCartSchema,
  DeleteCategorySchema,
  DeleteColorSchema,
  DeleteProductImageSchema,
  DeleteProductSchema,
  DeleteReviewSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  DeleteWishlistSchema,
  ForgotPasswordSchema,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  GetProductImages,
  GetReviewSchema,
  ListProductReviewsSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  UpdateAddressSchema,
  UpdateCategorySchema,
  UpdateColorSchema,
  UpdateOrderStatusSchema,
  UpdateProductSchema,
  UpdateProfileSchema,
  UpdateReviewSchema,
  UpdateSizeSchema,
  UpdateStockSchema,
  VerifyEmailSchema,
} from './validation-schema.js';

export type DefaultRequestBody = { [key: string]: any };
export type DefaultRequestQuery = {
  query: Partial<z.infer<typeof DefaultQuerySchema>['query']>;
};

export type DefaultResponseBody = {
  success: boolean;
  message?: string;
};

// Auth types
export type LoginRequest = z.infer<typeof LoginSchema>;
export type LoginResponse = DefaultResponseBody & {
  data: {
    expiresAt: Date;
    accessToken: string;
    refreshToken: string;
    user: User;
  };
};

export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type RegisterResponse = DefaultResponseBody;

export type VerifyEmailRequest = z.infer<typeof VerifyEmailSchema>;
export type VerifyEmailResponse = DefaultResponseBody;

export type ResendVerificationEmailRequest = undefined; // No data needed
export type ResendVerificationEmailResponse = DefaultResponseBody;

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordResponse = DefaultResponseBody & {
  data: {
    resetToken: string;
    expiresAt: Date;
  };
};

export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordResponse = DefaultResponseBody;

export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>;
export type ChangePasswordResponse = DefaultResponseBody;

// User types
export type GetProfileRequest = undefined;
export type GetProfileResponse = DefaultResponseBody & {
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    isVerified: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
};

export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;
export type UpdateProfileResponse = DefaultResponseBody & {
  data: GetProfileResponse['data'];
};

export type AdminGetUserRequest = z.infer<typeof AdminGetUserSchema>;
export type AdminGetUserResponse = DefaultResponseBody & {
  data: GetProfileResponse['data'];
};

export type AdminGetUsersListRequest = z.infer<typeof DefaultQuerySchema>;
export type AdminGetUsersListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    users: GetProfileResponse['data'][];
  };
};

export type AdminUpdateUserRequest = z.infer<typeof AdminUpdateUserSchema>;
export type AdminUpdateUserResponse = DefaultResponseBody & {
  data: GetProfileResponse['data'];
};

export type AdminDeleteUserRequest = z.infer<typeof AdminDeleteUserSchema>;
export type AdminDeleteUserResponse = DefaultResponseBody;

// Address types
export type CreateAddressRequest = z.infer<typeof CreateAddressSchema>;
export type CreateAddressResponse = DefaultResponseBody & {
  data: {
    id: number;
    country: string;
    state: string;
    city: string;
    street: string;
    building: string | null;
    floor: number | null;
    address: string | null;
    phone: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateAddressRequest = z.infer<typeof UpdateAddressSchema>;
export type UpdateAddressResponse = CreateAddressResponse;

export type GetUserAddressListRequest = undefined; // No data needed
export type GetUserAddressListResponse = DefaultResponseBody & {
  data: CreateAddressResponse['data'][];
};

export type DeleteAddressRequest = z.infer<typeof DeleteAddressSchema>;
export type DeleteAddressResponse = DefaultResponseBody & {
  data: CreateAddressResponse['data'];
};

// Category types
export type CreateCategoryRequest = z.infer<typeof CreateCategorySchema>;
export type CreateCategoryResponse = DefaultResponseBody & {
  data: {
    id: number;
    categoryId: number | null;
    arName: string;
    enName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
};

export type UpdateCategoryRequest = z.infer<typeof UpdateCategorySchema>;
export type UpdateCategoryResponse = CreateCategoryResponse;

export type DeleteCategoryRequest = z.infer<typeof DeleteCategorySchema>;
export type DeleteCategoryResponse = CreateCategoryResponse;

export type GetCategoryRequest = DefaultRequestQuery & DeleteCategoryRequest;
export type GetCategoryResponse = DefaultResponseBody & {
  data: CreateCategoryResponse['data'] & {
    subCategories: CreateCategoryResponse['data'][];
  };
};

export type GetCategoriesListRequest = DefaultRequestQuery;
export type GetCategoriesListResponse = DefaultResponseBody & {
  data: GetCategoryResponse['data'][];
};

export type GetCategoryProductsRequest = z.infer<typeof GetCategorySchema>;
export type GetCategoryProductsResponse = DefaultResponseBody & {
  data: CreateProductResponse['data'][];
};

// Product types
export type CreateProductRequest = z.infer<typeof CreateProductSchema>;
export type CreateProductResponse = DefaultResponseBody & {
  data: {
    id: number;
    categoryId: number;
    arName: string;
    enName: string;
    arDescription: string;
    enDescription: string;
    price: any; // Decimal;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
};

export type UpdateProductRequest = z.infer<typeof UpdateProductSchema>;
export type UpdateProductResponse = CreateProductResponse;

export type DeleteProductRequest = z.infer<typeof DeleteProductSchema>;
export type DeleteProductResponse = CreateProductResponse;

export type GetProductRequest = DefaultRequestQuery & DeleteProductRequest;
export type GetProductResponse = DefaultResponseBody & {
  data: CreateProductResponse['data'] & {
    images: GetProductImagesResponse['data'];
    category: CreateCategoryResponse['data'];
  };
};

export type GetProductsListRequest = DefaultRequestQuery;
export type GetProductsListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    products: GetProductResponse['data'][];
  };
};

// Product images types
export type CreateProductImageRequest = z.infer<typeof CreateProductImageSchema> & {
  images: FormData;
};
export type CreateProductImageResponse = DefaultResponseBody;

export type DeleteProductImageRequest = z.infer<typeof DeleteProductImageSchema>;
export type DeleteProductImageResponse = DefaultResponseBody;

export type GetProductImagesRequest = z.infer<typeof GetProductImages>;
export type GetProductImagesResponse = DefaultResponseBody & {
  data: {
    id: number;
    productId: number;
    imageUrl: string;
    createdAt: Date;
  }[];
};

export type GetProductStocksRequest = z.infer<typeof GetProductImages>;
export type GetProductStocksResponse = DefaultResponseBody & {
  data: Pick<
    GetStockResponse['data'],
    'id' | 'quantity' | 'createdAt' | 'updatedAt' | 'color' | 'size'
  >[];
};

// Colors types
export type CreateColorRequest = z.infer<typeof CreateColorSchema>;
export type CreateColorResponse = DefaultResponseBody & {
  data: {
    id: number;
    code: string;
    arName: string;
    enName: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateColorRequest = z.infer<typeof UpdateColorSchema>;
export type UpdateColorResponse = CreateColorResponse;

export type DeleteColorRequest = z.infer<typeof DeleteColorSchema>;
export type DeleteColorResponse = CreateColorResponse;

export type GetColorRequest = DeleteColorRequest;
export type GetColorResponse = DeleteColorResponse;

export type GetColorsListRequest = DefaultRequestQuery;
export type GetColorsListResponse = DefaultResponseBody & {
  data: CreateColorResponse['data'][];
};

// Sizes types
export type CreateSizeRequest = z.infer<typeof CreateSizeSchema>;
export type CreateSizeResponse = DefaultResponseBody & {
  data: { id: number; name: string; createdAt: Date; updatedAt: Date };
};

export type UpdateSizeRequest = z.infer<typeof UpdateSizeSchema>;
export type UpdateSizeResponse = CreateSizeResponse;

export type DeleteSizeRequest = z.infer<typeof DeleteSizeSchema>;
export type DeleteSizeResponse = CreateSizeResponse;

export type GetSizeRequest = DeleteSizeRequest;
export type GetSizeResponse = DeleteSizeResponse;

export type GetSizesListRequest = DefaultRequestQuery;
export type GetSizesListResponse = DefaultResponseBody & {
  data: CreateSizeResponse['data'][];
};

// Stock types
export type CreateStockRequest = z.infer<typeof CreateStockSchema>;
export type CreateStockResponse = DefaultResponseBody & {
  data: CreateStockRequest['body'] & {
    id: number;
    productId: number;
    colorId: number;
    sizeId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateStockRequest = z.infer<typeof UpdateStockSchema>;
export type UpdateStockResponse = CreateStockResponse;

export type DeleteStockRequest = z.infer<typeof DeleteStockSchema>;
export type DeleteStockResponse = CreateStockResponse;

export type GetStockRequest = DeleteStockRequest;
export type GetStockResponse = DefaultResponseBody & {
  data: {
    id: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    product: CreateProductResponse['data'];
    color: CreateColorResponse['data'];
    size: CreateSizeResponse['data'];
  };
};

export type GetStocksListRequest = DefaultRequestQuery;
export type GetStocksListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    stocks: GetStockResponse['data'][];
  };
};

// Shipping types
export type CreateCartRequest = z.infer<typeof CreateCartSchema>;
export type CreateCartResponse = DefaultResponseBody & {
  data: {
    userId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    stock: {
      id: number;
      quantity: number;
      product: CreateProductResponse['data'];
      color: CreateColorResponse['data'];
      size: CreateSizeResponse['data'];
    };
  }[];
};

export type GetCartRequest = Record<string, never>;
export type GetCartResponse = CreateCartResponse;

export type DeleteCartRequest = z.infer<typeof DeleteCartSchema>;
export type DeleteCartResponse = CreateCartResponse;

export type CreateWishlistRequest = z.infer<typeof CreateWishlistSchema>;
export type CreateWishlistResponse = DefaultResponseBody & {
  data: CreateProductResponse['data'][];
};

export type GetWishlistRequest = Record<string, never>;
export type GetWishlistResponse = CreateWishlistResponse;

export type DeleteWishlistRequest = z.infer<typeof DeleteWishlistSchema>;
export type DeleteWishlistResponse = CreateWishlistResponse;

// Order types
export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;
export type CreateOrderResponse = DefaultResponseBody & {
  data: {
    order: {
      id: number;
      userId: number | null;
      subtotal: any; // Decimal;
      discount: any; // Decimal;
      total: any; // Decimal;
      orderStatus: 'PENDING' | 'FULFILLED' | 'CANCELLED';
      paymentMethod: string;
      paymentStatus: 'UNPAID' | 'PAID' | 'FAILED' | 'VOIDED' | 'REFUNDED';
      note: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    payment: {
      token: string;
      iframeUrl: string;
    } | null;
  };
};

export type GetOrderRequest = z.infer<typeof GetOrderSchema>;
export type GetOrderResponse = DefaultResponseBody & {
  data: CreateOrderResponse['data']['order'] & {
    user: GetProfileResponse['data'] | null;
    orderItems: {
      id: number;
      orderId: number;
      name: string;
      color: string;
      size: string;
      quantity: number;
      price: any; // Decimal;
      createdAt: Date;
      updatedAt: Date;
    }[];
    paymentDetails: {
      id: number;
      orderId: number;
      transactionId: number;
      transactionOrderId: number;
      pending: boolean;
      success: boolean;
      isAuth: boolean;
      isCapture: boolean;
      amountCents: any; // Decimal;
      isVoided: boolean;
      isRefunded: boolean;
      is3DSecure: boolean;
      integrationId: number;
      deliveryNeeded: boolean;
      currency: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    shippingDetails: {
      id: number;
      address: CreateAddressResponse['data'];
      cost: any; // Decimal;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  };
};

export type GetOrdersListRequest = DefaultRequestQuery;
export type GetOrdersListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    orders: CreateOrderResponse['data']['order'][];
  };
};

export type AdminGetOrdersListRequest = DefaultRequestQuery;
export type AdminGetOrdersListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    orders: Omit<GetOrderResponse['data'], 'orderItems' | 'paymentDetails' | 'shippingDetails'>[];
  };
};

export type UpdateOrderRequest = z.infer<typeof UpdateOrderStatusSchema>;
export type UpdateOrderResponse = DefaultResponseBody & {
  data: CreateOrderResponse['data']['order'];
};

export type DeleteOrderRequest = GetOrderRequest;
export type DeleteOrderResponse = DefaultResponseBody & {
  data: CreateOrderResponse['data']['order'];
};

// Payment types
export type CreatePaymentRequest = {
  query: z.infer<typeof CreatePaymentSchema>['query'];
  body: { [key: string]: any };
};
export type CreatePaymentResponse = Record<string, never>;

export type GetPaymentRequest = z.infer<typeof GetPaymentSchema>;
export type GetPaymentResponse = DefaultResponseBody & {
  data: {
    id: number;
    orderId: number;
    transactionId: number;
    transactionOrderId: number;
    pending: boolean;
    success: boolean;
    isAuth: boolean;
    isCapture: boolean;
    amountCents: any; // Decimal;
    isVoided: boolean;
    isRefunded: boolean;
    is3DSecure: boolean;
    integrationId: number;
    deliveryNeeded: boolean;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type GetPaymentsListRequest = DefaultRequestQuery;
export type GetPaymentsListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    payments: GetPaymentResponse['data'][];
  };
};

// Review types
export type GetReviewRequest = z.infer<typeof GetReviewSchema>;
export type GetReviewResponse = DefaultResponseBody & {
  data: Pick<Review, 'id' | 'rating' | 'comment' | 'createdAt' | 'updatedAt'> & {
    user: User | null;
    product: Product;
  };
};

export type ListReviewsRequest = DefaultRequestQuery;
export type ListReviewsResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    reviews: Omit<GetReviewResponse['data'], 'product'>[];
  };
};

export type ListProductReviewsRequest = z.infer<typeof ListProductReviewsSchema>;
export type ListProductReviewsResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    reviews: Omit<GetReviewResponse['data'], 'product'>[];
  };
};

export type CreateReviewRequest = z.infer<typeof CreateReviewSchema>;
export type CreateReviewResponse = GetReviewResponse;

export type UpdateReviewRequest = z.infer<typeof UpdateReviewSchema>;
export type UpdateReviewResponse = GetReviewResponse;

export type DeleteReviewRequest = z.infer<typeof DeleteReviewSchema>;
export type DeleteReviewResponse = DefaultResponseBody;

// Notification types
