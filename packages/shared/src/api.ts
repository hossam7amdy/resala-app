/**
 * @file This file contains all the types for the API requests and responses.
 *
 * It is used by the API service to validate the request and response data.
 * It is also used by the API service to generate the API client.
 */
import type { z } from 'zod';

import type {
  Address,
  Cart,
  Category,
  Color,
  Image,
  Order,
  OrderItem,
  Pagination,
  Payment,
  Product,
  Review,
  Shipping,
  Size,
  Stock,
  User,
  Wishlist,
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
  CreateImageSchema,
  CreateOrderSchema,
  CreatePaymentSchema,
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
  DeleteImageSchema,
  DeleteProductSchema,
  DeleteReviewSchema,
  DeleteSizeSchema,
  DeleteStockSchema,
  DeleteWishlistSchema,
  ForgotPasswordSchema,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  GetProductSchema,
  GetReviewSchema,
  ListProductReviewsSchema,
  LoginSchema,
  PatchImageSchema,
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

export type ResendVerificationEmailRequest = undefined;
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
export type GetUserAddressRequest = undefined;
export type GetUserAddressResponse = DefaultResponseBody & {
  data: Address;
};

export type GetUserAddressListRequest = undefined;
export type GetUserAddressListResponse = DefaultResponseBody & {
  data: GetUserAddressResponse['data'][];
};

export type CreateAddressRequest = z.infer<typeof CreateAddressSchema>;
export type CreateAddressResponse = GetUserAddressResponse;

export type UpdateAddressRequest = z.infer<typeof UpdateAddressSchema>;
export type UpdateAddressResponse = GetUserAddressResponse;

export type DeleteAddressRequest = z.infer<typeof DeleteAddressSchema>;
export type DeleteAddressResponse = GetUserAddressResponse;

// Category types
export type GetCategoryRequest = z.infer<typeof GetCategorySchema>;
export type GetCategoryResponse = DefaultResponseBody & {
  data: Category;
};

export type GetCategoriesListRequest = DefaultRequestQuery;
export type GetCategoriesListResponse = DefaultResponseBody & {
  data: GetCategoryResponse['data'][];
};

export type CreateCategoryRequest = z.infer<typeof CreateCategorySchema>;
export type CreateCategoryResponse = GetCategoryResponse;

export type UpdateCategoryRequest = z.infer<typeof UpdateCategorySchema>;
export type UpdateCategoryResponse = GetCategoryResponse;

export type DeleteCategoryRequest = z.infer<typeof DeleteCategorySchema>;
export type DeleteCategoryResponse = GetCategoryResponse;

export type GetCategoryProductsRequest = z.infer<typeof GetCategorySchema>;
export type GetCategoryProductsResponse = DefaultResponseBody & {
  data: GetProductResponse['data'][];
};

// Product types
export type GetProductRequest = z.infer<typeof GetProductSchema>;
export type GetProductResponse = DefaultResponseBody & {
  data: Product & {
    category: Category;
  };
};

export type GetProductsListRequest = DefaultRequestQuery;
export type GetProductsListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    products: GetProductResponse['data'][];
  };
};

export type CreateProductRequest = z.infer<typeof CreateProductSchema>;
export type CreateProductResponse = DefaultResponseBody & {
  data: Product;
};

export type UpdateProductRequest = z.infer<typeof UpdateProductSchema>;
export type UpdateProductResponse = CreateProductResponse;

export type DeleteProductRequest = z.infer<typeof DeleteProductSchema>;
export type DeleteProductResponse = CreateProductResponse;

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
export type DeleteColorResponse = GetColorResponse;

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
export type DeleteSizeResponse = GetSizeResponse;

// Stock types
export type GetStockRequest = DeleteStockRequest;
export type GetStockResponse = DefaultResponseBody & {
  data: {
    id: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
    size: Size;
    color: Color;
    images: Omit<Image, 'colorId' | 'productId'>[];
  };
};

export type GetProductStocksRequest = z.infer<typeof GetProductSchema>;
export type GetProductStocksResponse = DefaultResponseBody & {
  data: Omit<GetStockResponse['data'], 'product'>[];
};

export type GetStocksListRequest = DefaultRequestQuery;
export type GetStocksListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    stocks: GetStockResponse['data'][];
  };
};

export type CreateStockRequest = z.infer<typeof CreateStockSchema>;
export type CreateStockResponse = DefaultResponseBody & {
  data: Stock;
};

export type UpdateStockRequest = z.infer<typeof UpdateStockSchema>;
export type UpdateStockResponse = CreateStockResponse;

export type DeleteStockRequest = z.infer<typeof DeleteStockSchema>;
export type DeleteStockResponse = CreateStockResponse;

// Image types
export type CreateImageRequest = z.infer<typeof CreateImageSchema>;
export type CreateImageResponse = DefaultResponseBody;

export type PatchImageRequest = z.infer<typeof PatchImageSchema>;
export type PatchImageResponse = DefaultResponseBody & {
  data: Image;
};

export type DeleteImageRequest = z.infer<typeof DeleteImageSchema>;
export type DeleteImageResponse = DefaultResponseBody & {
  data: Image;
};

// Shipping types
export type GetCartRequest = Record<string, never>;
export type GetCartResponse = DefaultResponseBody & {
  data: (Omit<Cart, 'stockId'> & {
    product: Product;
    images: Omit<Image, 'colorId' | 'productId'>[];
    stock: Omit<Stock, 'colorId' | 'sizeId' | 'productId'> & {
      color: Color;
      size: Size;
    };
  })[];
};

export type CreateCartRequest = z.infer<typeof CreateCartSchema>;
export type CreateCartResponse = GetCartResponse;

export type DeleteCartRequest = z.infer<typeof DeleteCartSchema>;
export type DeleteCartResponse = GetCartResponse;

export type GetWishlistRequest = undefined;
export type GetWishlistResponse = DefaultResponseBody & {
  data: (Omit<Wishlist, 'productId'> & {
    product: Product;
  })[];
};

export type CreateWishlistRequest = z.infer<typeof CreateWishlistSchema>;
export type CreateWishlistResponse = GetWishlistResponse;

export type DeleteWishlistRequest = z.infer<typeof DeleteWishlistSchema>;
export type DeleteWishlistResponse = GetWishlistResponse;

// Order types
export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;
export type CreateOrderResponse = DefaultResponseBody & {
  data?: {
    token: string;
    iframeUrl: string;
  };
};

export type GetOrderRequest = z.infer<typeof GetOrderSchema>;
export type GetOrderResponse = DefaultResponseBody & {
  data: Order & {
    user: User | null;
    orderItems: OrderItem[];
    paymentDetails: Payment | null;
    shippingDetails: (Omit<Shipping, 'addressId' | 'orderId'> & { address: Address }) | null;
  };
};

export type GetOrdersListRequest = DefaultRequestQuery;
export type GetOrdersListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    orders: GetOrderResponse['data'][];
  };
};

export type AdminGetOrdersListRequest = DefaultRequestQuery;
export type AdminGetOrdersListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    orders: GetOrderResponse['data'][];
  };
};

export type UpdateOrderRequest = z.infer<typeof UpdateOrderStatusSchema>;
export type UpdateOrderResponse = DefaultResponseBody;

export type DeleteOrderRequest = GetOrderRequest;
export type DeleteOrderResponse = DefaultResponseBody;

// Payment types
export type CreatePaymentRequest = {
  query: z.infer<typeof CreatePaymentSchema>['query'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: { [key: string]: any };
};
export type CreatePaymentResponse = DefaultResponseBody;

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

export type GetReviewsListRequest = DefaultRequestQuery;
export type GetReviewsListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    reviews: Omit<GetReviewResponse['data'], 'product'>[];
  };
};

export type GetProductReviewsListRequest = z.infer<typeof ListProductReviewsSchema>;
export type GetProductReviewsListResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    reviews: Omit<GetReviewResponse['data'], 'product'>[];
  };
};

export type CreateReviewRequest = z.infer<typeof CreateReviewSchema>;
export type CreateReviewResponse = DefaultResponseBody & {
  data: Review;
};

export type UpdateReviewRequest = z.infer<typeof UpdateReviewSchema>;
export type UpdateReviewResponse = CreateReviewResponse;

export type DeleteReviewRequest = z.infer<typeof DeleteReviewSchema>;
export type DeleteReviewResponse = CreateReviewResponse;

// Notification types
