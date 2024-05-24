/**
 * @file This file contains all the types for the API requests and responses.
 *
 * It is used by the API service to validate the request and response data.
 * It is also used by the API service to generate the API client.
 */
import type * as zod from 'zod';

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
  DeleteSizeSchema,
  DeleteStockSchema,
  DeleteWishlistSchema,
  ForgotPasswordSchema,
  GetCategorySchema,
  GetOrderSchema,
  GetPaymentSchema,
  GetProductImages,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  UpdateAddressSchema,
  UpdateCategorySchema,
  UpdateColorSchema,
  UpdateOrderStatusSchema,
  UpdateProductSchema,
  UpdateProfileSchema,
  UpdateSizeSchema,
  UpdateStockSchema,
  VerifyEmailSchema,
} from './validation-schema.js';

export type DefaultRequestBody = {
  [key: string]: any;
};
export type DefaultRequestQuery = {
  query: Partial<zod.infer<typeof DefaultQuerySchema>['query']>;
};
export type DefaultResponseBody = {
  success: boolean;
  message?: string;
};
export type LoginRequest = zod.infer<typeof LoginSchema>;
export type LoginResponse = DefaultResponseBody & {
  data: {
    expiresAt: Date;
    accessToken: string;
    refreshToken: string;
    user: GetProfileResponse['data'];
  };
};
export type RegisterRequest = zod.infer<typeof RegisterSchema>;
export type RegisterResponse = DefaultResponseBody;
export type VerifyEmailRequest = zod.infer<typeof VerifyEmailSchema>;
export type VerifyEmailResponse = DefaultResponseBody;
export type ResendVerificationEmailRequest = undefined;
export type ResendVerificationEmailResponse = DefaultResponseBody;
export type ForgotPasswordRequest = zod.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordResponse = DefaultResponseBody & {
  data: {
    resetToken: string;
    expiresAt: Date;
  };
};
export type ResetPasswordRequest = zod.infer<typeof ResetPasswordSchema>;
export type ResetPasswordResponse = DefaultResponseBody;
export type ChangePasswordRequest = zod.infer<typeof ChangePasswordSchema>;
export type ChangePasswordResponse = DefaultResponseBody;
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
export type UpdateProfileRequest = zod.infer<typeof UpdateProfileSchema>;
export type UpdateProfileResponse = DefaultResponseBody & {
  data: GetProfileResponse['data'];
};
export type AdminGetUserRequest = zod.infer<typeof AdminGetUserSchema>;
export type AdminGetUserResponse = DefaultResponseBody & {
  data: GetProfileResponse['data'];
};
export type AdminGetUsersListRequest = zod.infer<typeof DefaultQuerySchema>;
export type AdminGetUsersListResponse = DefaultResponseBody & {
  data: {
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    users: GetProfileResponse['data'][];
  };
};
export type AdminUpdateUserRequest = zod.infer<typeof AdminUpdateUserSchema>;
export type AdminUpdateUserResponse = DefaultResponseBody & {
  data: GetProfileResponse['data'];
};
export type AdminDeleteUserRequest = zod.infer<typeof AdminDeleteUserSchema>;
export type AdminDeleteUserResponse = DefaultResponseBody;
export type CreateAddressRequest = zod.infer<typeof CreateAddressSchema>;
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
export type UpdateAddressRequest = zod.infer<typeof UpdateAddressSchema>;
export type UpdateAddressResponse = CreateAddressResponse;
export type GetUserAddressListRequest = undefined;
export type GetUserAddressListResponse = DefaultResponseBody & {
  data: CreateAddressResponse['data'][];
};
export type DeleteAddressRequest = zod.infer<typeof DeleteAddressSchema>;
export type DeleteAddressResponse = DefaultResponseBody & {
  data: CreateAddressResponse['data'];
};
export type CreateCategoryRequest = zod.infer<typeof CreateCategorySchema>;
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
export type UpdateCategoryRequest = zod.infer<typeof UpdateCategorySchema>;
export type UpdateCategoryResponse = CreateCategoryResponse;
export type DeleteCategoryRequest = zod.infer<typeof DeleteCategorySchema>;
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
export type GetCategoryProductsRequest = zod.infer<typeof GetCategorySchema>;
export type GetCategoryProductsResponse = DefaultResponseBody & {
  data: CreateProductResponse['data'][];
};
export type CreateProductRequest = zod.infer<typeof CreateProductSchema>;
export type CreateProductResponse = DefaultResponseBody & {
  data: {
    id: number;
    categoryId: number;
    arName: string;
    enName: string;
    arDescription: string;
    enDescription: string;
    price: any;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
};
export type UpdateProductRequest = zod.infer<typeof UpdateProductSchema>;
export type UpdateProductResponse = CreateProductResponse;
export type DeleteProductRequest = zod.infer<typeof DeleteProductSchema>;
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
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    products: GetProductResponse['data'][];
  };
};
export type CreateProductImageRequest = zod.infer<typeof CreateProductImageSchema> & {
  images: FormData;
};
export type CreateProductImageResponse = DefaultResponseBody;
export type DeleteProductImageRequest = zod.infer<typeof DeleteProductImageSchema>;
export type DeleteProductImageResponse = DefaultResponseBody;
export type GetProductImagesRequest = zod.infer<typeof GetProductImages>;
export type GetProductImagesResponse = DefaultResponseBody & {
  data: {
    id: number;
    productId: number;
    imageUrl: string;
    createdAt: Date;
  }[];
};
export type GetProductStocksRequest = zod.infer<typeof GetProductImages>;
export type GetProductStocksResponse = DefaultResponseBody & {
  data: Pick<
    GetStockResponse['data'],
    'id' | 'quantity' | 'createdAt' | 'updatedAt' | 'color' | 'size'
  >[];
};
export type CreateColorRequest = zod.infer<typeof CreateColorSchema>;
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
export type UpdateColorRequest = zod.infer<typeof UpdateColorSchema>;
export type UpdateColorResponse = CreateColorResponse;
export type DeleteColorRequest = zod.infer<typeof DeleteColorSchema>;
export type DeleteColorResponse = CreateColorResponse;
export type GetColorRequest = DeleteColorRequest;
export type GetColorResponse = DeleteColorResponse;
export type GetColorsListRequest = DefaultRequestQuery;
export type GetColorsListResponse = DefaultResponseBody & {
  data: CreateColorResponse['data'][];
};
export type CreateSizeRequest = zod.infer<typeof CreateSizeSchema>;
export type CreateSizeResponse = DefaultResponseBody & {
  data: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
export type UpdateSizeRequest = zod.infer<typeof UpdateSizeSchema>;
export type UpdateSizeResponse = CreateSizeResponse;
export type DeleteSizeRequest = zod.infer<typeof DeleteSizeSchema>;
export type DeleteSizeResponse = CreateSizeResponse;
export type GetSizeRequest = DeleteSizeRequest;
export type GetSizeResponse = DeleteSizeResponse;
export type GetSizesListRequest = DefaultRequestQuery;
export type GetSizesListResponse = DefaultResponseBody & {
  data: CreateSizeResponse['data'][];
};
export type CreateStockRequest = zod.infer<typeof CreateStockSchema>;
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
export type UpdateStockRequest = zod.infer<typeof UpdateStockSchema>;
export type UpdateStockResponse = CreateStockResponse;
export type DeleteStockRequest = zod.infer<typeof DeleteStockSchema>;
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
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    stocks: GetStockResponse['data'][];
  };
};
export type CreateCartRequest = zod.infer<typeof CreateCartSchema>;
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
export type DeleteCartRequest = zod.infer<typeof DeleteCartSchema>;
export type DeleteCartResponse = CreateCartResponse;
export type CreateWishlistRequest = zod.infer<typeof CreateWishlistSchema>;
export type CreateWishlistResponse = DefaultResponseBody & {
  data: CreateProductResponse['data'][];
};
export type GetWishlistRequest = Record<string, never>;
export type GetWishlistResponse = CreateWishlistResponse;
export type DeleteWishlistRequest = zod.infer<typeof DeleteWishlistSchema>;
export type DeleteWishlistResponse = CreateWishlistResponse;
export type CreateOrderRequest = zod.infer<typeof CreateOrderSchema>;
export type CreateOrderResponse = DefaultResponseBody & {
  data: {
    order: {
      id: number;
      userId: number | null;
      subtotal: any;
      discount: any;
      total: any;
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
export type GetOrderRequest = zod.infer<typeof GetOrderSchema>;
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
      price: any;
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
      amountCents: any;
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
      cost: any;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  };
};
export type GetOrdersListRequest = DefaultRequestQuery;
export type GetOrdersListResponse = DefaultResponseBody & {
  data: {
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    orders: CreateOrderResponse['data']['order'][];
  };
};
export type AdminGetOrdersListRequest = DefaultRequestQuery;
export type AdminGetOrdersListResponse = DefaultResponseBody & {
  data: {
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    orders: Omit<GetOrderResponse['data'], 'orderItems' | 'paymentDetails' | 'shippingDetails'>[];
  };
};
export type UpdateOrderRequest = zod.infer<typeof UpdateOrderStatusSchema>;
export type UpdateOrderResponse = DefaultResponseBody & {
  data: CreateOrderResponse['data']['order'];
};
export type DeleteOrderRequest = GetOrderRequest;
export type DeleteOrderResponse = DefaultResponseBody & {
  data: CreateOrderResponse['data']['order'];
};
export type CreatePaymentRequest = {
  query: zod.infer<typeof CreatePaymentSchema>['query'];
  body: {
    [key: string]: any;
  };
};
export type CreatePaymentResponse = Record<string, never>;
export type GetPaymentRequest = zod.infer<typeof GetPaymentSchema>;
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
    amountCents: any;
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
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    payments: GetPaymentResponse['data'][];
  };
};
