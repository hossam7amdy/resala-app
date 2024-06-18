/**
 * @file This file contains all the types for the API requests and responses.
 *
 * It is used by the API service to validate the request and response data.
 * It is also used by the API service to generate the API client.
 */
import type { z } from 'zod';

import type {
  Address,
  Category,
  Color,
  Order,
  OrderItem,
  Pagination,
  Payment,
  Product,
  ProductImage,
  Review,
  Size,
  User,
} from './types.js';
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
  GetProductSchema,
  GetReviewSchema,
  ListProductReviewsSchema,
  LoginSchema,
  RefreshTokenSchema,
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

export type RefreshTokenRequest = z.infer<typeof RefreshTokenSchema>;
export type RefreshTokenResponse = DefaultResponseBody & {
  data: {
    expiresAt: Date;
    accessToken: string;
    refreshToken: string;
  };
};

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
  data: User;
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
  data: Address;
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
export type GetCategoryRequest = z.infer<typeof GetCategorySchema>;
export type GetCategoryResponse = DefaultResponseBody & {
  data: Category & {
    mainCategory: Category | null;
    subCategories: Category[];
  };
};

export type GetCategoriesListRequest = DefaultRequestQuery;
export type GetCategoriesListResponse = DefaultResponseBody & {
  data: GetCategoryResponse['data'][];
};

export type CreateCategoryRequest = z.infer<typeof CreateCategorySchema>;
export type CreateCategoryResponse = DefaultResponseBody & {
  data: GetCategoryResponse['data'];
};

export type UpdateCategoryRequest = z.infer<typeof UpdateCategorySchema>;
export type UpdateCategoryResponse = GetCategoryResponse;

export type DeleteCategoryRequest = z.infer<typeof DeleteCategorySchema>;
export type DeleteCategoryResponse = DefaultResponseBody;

export type GetCategoryProductsRequest = z.infer<typeof GetCategorySchema>;
export type GetCategoryProductsResponse = DefaultResponseBody & {
  data: GetProductResponse['data'];
};

// Product types
export type GetProductRequest = z.infer<typeof GetProductSchema>;
export type GetProductResponse = DefaultResponseBody & {
  data: Product & {
    category: Category;
    images: ProductImage[];
  };
};

export type GetProductsListRequest = DefaultRequestQuery;
export type GetProductsListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    products: GetProductResponse['data'][];
  };
};

export type GetProductStocksRequest = z.infer<typeof GetProductImages>;
export type GetProductStocksResponse = DefaultResponseBody & {
  data: GetStockResponse['data'][];
};

export type CreateProductRequest = z.infer<typeof CreateProductSchema>;
export type CreateProductResponse = GetProductResponse;

export type UpdateProductRequest = z.infer<typeof UpdateProductSchema>;
export type UpdateProductResponse = GetProductResponse;

export type DeleteProductRequest = z.infer<typeof DeleteProductSchema>;
export type DeleteProductResponse = DefaultResponseBody;

// Product images types
export type CreateProductImageRequest = z.infer<typeof CreateProductImageSchema> & {
  images: FormData;
};
export type CreateProductImageResponse = DefaultResponseBody;

export type DeleteProductImageRequest = z.infer<typeof DeleteProductImageSchema>;
export type DeleteProductImageResponse = DefaultResponseBody;

// TODO: Deprecate this endpoint
export type GetProductImagesRequest = z.infer<typeof GetProductImages>;
export type GetProductImagesResponse = DefaultResponseBody & {
  data: {
    id: number;
    productId: number;
    imageUrl: string;
    createdAt: Date;
  }[];
};

// Colors types
export type GetColorRequest = DeleteColorRequest;
export type GetColorResponse = DefaultResponseBody & {
  data: Color;
};

export type GetColorsListRequest = DefaultRequestQuery;
export type GetColorsListResponse = DefaultResponseBody & {
  data: GetColorResponse['data'][];
};

export type CreateColorRequest = z.infer<typeof CreateColorSchema>;
export type CreateColorResponse = GetColorResponse;

export type UpdateColorRequest = z.infer<typeof UpdateColorSchema>;
export type UpdateColorResponse = GetColorResponse;

export type DeleteColorRequest = z.infer<typeof DeleteColorSchema>;
export type DeleteColorResponse = DefaultResponseBody;

// Sizes types
export type GetSizeRequest = DeleteSizeRequest;
export type GetSizeResponse = DefaultResponseBody & {
  data: Size;
};

export type GetSizesListRequest = DefaultRequestQuery;
export type GetSizesListResponse = DefaultResponseBody & {
  data: GetSizeResponse['data'][];
};

export type CreateSizeRequest = z.infer<typeof CreateSizeSchema>;
export type CreateSizeResponse = GetSizeResponse;

export type UpdateSizeRequest = z.infer<typeof UpdateSizeSchema>;
export type UpdateSizeResponse = GetSizeResponse;

export type DeleteSizeRequest = z.infer<typeof DeleteSizeSchema>;
export type DeleteSizeResponse = DefaultResponseBody;

// Stock types
export type GetStockRequest = DeleteStockRequest;
export type GetStockResponse = DefaultResponseBody & {
  data: {
    id: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
    color: Color;
    size: Size;
  };
};

export type GetStocksListRequest = DefaultRequestQuery;
export type GetStocksListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    stocks: GetStockResponse['data'][];
  };
};

export type CreateStockRequest = z.infer<typeof CreateStockSchema>;
export type CreateStockResponse = GetStockResponse;

export type UpdateStockRequest = z.infer<typeof UpdateStockSchema>;
export type UpdateStockResponse = GetStockResponse;

export type DeleteStockRequest = z.infer<typeof DeleteStockSchema>;
export type DeleteStockResponse = DefaultResponseBody;

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
      product: GetProductResponse['data'];
      color: GetColorResponse['data'];
      size: GetSizeResponse['data'];
    };
  }[];
};

export type GetCartRequest = Record<string, never>;
export type GetCartResponse = CreateCartResponse;

export type DeleteCartRequest = z.infer<typeof DeleteCartSchema>;
export type DeleteCartResponse = CreateCartResponse;

export type GetWishlistRequest = Record<string, never>;
export type GetWishlistResponse = DefaultResponseBody & {
  data: CreateProductResponse['data'][];
};

export type CreateWishlistRequest = z.infer<typeof CreateWishlistSchema>;
export type CreateWishlistResponse = GetWishlistResponse;

export type DeleteWishlistRequest = z.infer<typeof DeleteWishlistSchema>;
export type DeleteWishlistResponse = GetWishlistResponse;

// Order types
export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;
export type CreateOrderResponse = DefaultResponseBody & {
  data: {
    order: Order;
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
    orderItems: OrderItem[];
    paymentDetails: Payment | null;
    shippingDetails: {
      id: number;
      address: Address;
      cost: number | unknown; // Decimal;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: { [key: string]: any };
};
export type CreatePaymentResponse = Record<string, never>;

export type GetPaymentRequest = z.infer<typeof GetPaymentSchema>;
export type GetPaymentResponse = DefaultResponseBody & {
  data: Payment;
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
