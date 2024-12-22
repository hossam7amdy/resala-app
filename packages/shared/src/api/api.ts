/**
 * @file This file contains all the types for the API requests and responses.
 *
 * It is used by the API service to validate the request and response data.
 * It also considered as the contract between the client and the server.
 */
import type { Decimal } from 'decimal.js';
import type { z } from 'zod';

import type {
  Address,
  Cart,
  Category,
  Color,
  Discount,
  Image,
  Media,
  Order,
  OrderItem,
  Pagination,
  Product,
  Review,
  Size,
  Stock,
  User,
  Wishlist,
} from '../types/index.js';
import type * as Schemas from '../validations/index.js';

export type ListRequestQuery = {
  query: z.infer<typeof Schemas.OffsetPageParamsSchema>;
};

export type DefaultResponseBody = {
  success?: boolean;
  message?: string;
  error?: string;
};

// Auth types
export type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
  callbackURL?: string;
};
export type LoginResponse = {
  user: User;
  redirect: boolean;
};

export type LoginWithPhoneRequest = Omit<LoginRequest, 'email'> & {
  phoneNumber: string;
};
export type LoginWithPhoneResponse = LoginResponse;

export type LoginAnonymousRequest = never;
export type LoginAnonymousResponse = LoginResponse;

export type ProviderLoginRequest = {
  provider: 'google';
  callbackURL?: string;
  errorCallbackURL?: string;
};
export type ProviderLoginResponse = LoginResponse & {
  url: string;
  redirect: boolean;
};

export type RegisterRequest = Pick<
  User,
  'email' | 'phoneNumber' | 'birthDate' | 'firstName' | 'lastName' | 'name' | 'locale'
> & {
  callbackURL?: string;
};
export type RegisterResponse = DefaultResponseBody;

export type ForgotPasswordRequest = {
  email: string;
  redirectTo?: string;
};
export type ForgotPasswordResponse = DefaultResponseBody;

export type ResetPasswordRequest = {
  newPassword: string;
  token: string;
};
export type ResetPasswordResponse = DefaultResponseBody;

export type SendVerificationEmailRequest = {
  email: string;
  callbackURL?: string;
};
export type SendVerificationEmailResponse = DefaultResponseBody;

export type ChangePasswordRequest = {
  newPassword: string;
  currentPassword: string;
  revokeOtherSessions?: boolean;
};
export type ChangePasswordResponse = DefaultResponseBody;

export type SendPhoneNumberOTPRequest = {
  phoneNumber: string;
};
export type SendPhoneNumberOTPResponse = DefaultResponseBody;

export type VerifyPhoneNumberOTPRequest = {
  phoneNumber: string;
  code: string;
  disableSession?: boolean;
  updatePhoneNumber?: boolean;
};
export type VerifyPhoneNumberOTPResponse = {
  user: User;
};

export type GetSessionRequest = never;
export type GetSessionResponse = {
  user: User;
} | null;

export type LogoutRequest = never;
export type LogoutResponse = DefaultResponseBody;

// User types
export type GetUserRequest = z.infer<typeof Schemas.GetUserSchema>;
export type GetUserResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.GetUserResponseSchema>;
};

export type ListUsersRequest = z.infer<typeof Schemas.ListUsersSchema>;
export type ListUsersResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.ListUsersResponseSchema>;
};

export type UpdateUserRequest = z.infer<typeof Schemas.UpdateUserSchema>;
export type UpdateUserResponse = DefaultResponseBody & {
  data: User;
};

export type DeleteUserRequest = z.infer<typeof Schemas.DeleteUserSchema>;
export type DeleteUserResponse = DefaultResponseBody;

// Address types
export type GetAddressRequest = undefined;
export type GetAddressResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.GetAddressResponseSchema>;
};

export type ListAddressRequest = never;
export type ListAddressResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.ListAddressResponseSchema>;
};

export type CreateAddressRequest = z.infer<typeof Schemas.CreateAddressSchema>;
export type CreateAddressResponse = GetAddressResponse;

export type UpdateAddressRequest = z.infer<typeof Schemas.UpdateAddressSchema>;
export type UpdateAddressResponse = GetAddressResponse;

export type DeleteAddressRequest = z.infer<typeof Schemas.DeleteAddressSchema>;
export type DeleteAddressResponse = GetAddressResponse;

// Category types
export type GetCategoryRequest = z.infer<typeof Schemas.GetCategorySchema>;
export type GetCategoryResponse = DefaultResponseBody & {
  data: Category;
};

export type ListCategoriesRequest = ListRequestQuery;
export type ListCategoriesResponse = DefaultResponseBody & {
  data: GetCategoryResponse['data'][];
};

export type CreateCategoryRequest = z.infer<typeof Schemas.CreateCategorySchema>;
export type CreateCategoryResponse = GetCategoryResponse;

export type UpdateCategoryRequest = z.infer<typeof Schemas.UpdateCategorySchema>;
export type UpdateCategoryResponse = GetCategoryResponse;

export type DeleteCategoryRequest = z.infer<typeof Schemas.DeleteCategorySchema>;
export type DeleteCategoryResponse = GetCategoryResponse;

// Product types
export type GetProductRequest = z.infer<typeof Schemas.GetProductSchema>;
export type GetProductResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.GetProductResponseSchema>;
};

export type ListProductsRequest = z.infer<typeof Schemas.ListProductsSchema>;
export type ListProductsResponse = DefaultResponseBody & {
  data: {
    products: z.infer<typeof Schemas.ListProductsResponseSchema>;
    pagination: Pagination;
  };
};

export type CreateProductRequest = z.infer<typeof Schemas.CreateProductSchema>;
export type CreateProductResponse = DefaultResponseBody & {
  data: Product;
};

export type UpdateProductRequest = z.infer<typeof Schemas.UpdateProductSchema>;
export type UpdateProductResponse = CreateProductResponse;

export type DeleteProductRequest = z.infer<typeof Schemas.DeleteProductSchema>;
export type DeleteProductResponse = CreateProductResponse;

// Colors types
export type GetColorRequest = DeleteColorRequest;
export type GetColorResponse = DefaultResponseBody & {
  data: Color;
};

export type ListColorsRequest = ListRequestQuery;
export type ListColorsResponse = DefaultResponseBody & {
  data: GetColorResponse['data'][];
};

export type CreateColorRequest = z.infer<typeof Schemas.CreateColorSchema>;
export type CreateColorResponse = GetColorResponse;

export type UpdateColorRequest = z.infer<typeof Schemas.UpdateColorSchema>;
export type UpdateColorResponse = GetColorResponse;

export type DeleteColorRequest = z.infer<typeof Schemas.DeleteColorSchema>;
export type DeleteColorResponse = GetColorResponse;

// Sizes types
export type GetSizeRequest = DeleteSizeRequest;
export type GetSizeResponse = DefaultResponseBody & {
  data: Size;
};

export type ListSizesRequest = ListRequestQuery;
export type ListSizesResponse = DefaultResponseBody & {
  data: GetSizeResponse['data'][];
};

export type CreateSizeRequest = z.infer<typeof Schemas.CreateSizeSchema>;
export type CreateSizeResponse = GetSizeResponse;

export type UpdateSizeRequest = z.infer<typeof Schemas.UpdateSizeSchema>;
export type UpdateSizeResponse = GetSizeResponse;

export type DeleteSizeRequest = z.infer<typeof Schemas.DeleteSizeSchema>;
export type DeleteSizeResponse = GetSizeResponse;

// Stock types
export type GetStockRequest = DeleteStockRequest;
export type GetStockResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.GetStockResponseSchema>;
};

export type UpdateStocksQuantityRequest = z.infer<typeof Schemas.UpdateStocksQuantitySchema>;
export type UpdateStocksQuantityResponse = DefaultResponseBody;

export type ListStocksRequest = z.infer<typeof Schemas.ListStocksSchema>;
export type ListStocksResponse = DefaultResponseBody & {
  data: z.infer<typeof Schemas.ListStocksResponseSchema>;
};

export type DeleteStockRequest = z.infer<typeof Schemas.DeleteStockSchema>;
export type DeleteStockResponse = DefaultResponseBody & {
  data: Stock;
};

// Image types
export type CreateImageRequest = z.infer<typeof Schemas.CreateImageSchema>;
export type CreateImageResponse = DefaultResponseBody;

export type ListImagesRequest = z.infer<typeof Schemas.ListImagesSchema>;
export type ListImagesResponse = DefaultResponseBody & {
  data: Image[];
};

export type DeleteImageRequest = z.infer<typeof Schemas.DeleteImageSchema>;
export type DeleteImageResponse = DefaultResponseBody & {
  data: Image;
};

// Shipping types
export type GetCartRequest = Record<string, undefined>;
export type GetCartResponse = DefaultResponseBody & {
  data: {
    totalQuantity: number;
    totalPrice: number;
    totalDiscount?: number;
    items: (Cart & {
      discountedPrice?: number;
      appliedDiscount?: Discount;
      product: Product;
      images: Image[];
      stock: Stock & {
        color: Color;
        size: Size;
      };
    })[];
  };
};

export type CreateCartRequest = z.infer<typeof Schemas.CreateCartSchema>;
export type CreateCartResponse = GetCartResponse;

export type DeleteCartRequest = z.infer<typeof Schemas.DeleteCartSchema>;
export type DeleteCartResponse = GetCartResponse;

export type GetWishlistRequest = undefined;
export type GetWishlistResponse = DefaultResponseBody & {
  data: (Omit<Wishlist, 'productId'> & {
    product: Product;
  })[];
};

export type CreateWishlistRequest = z.infer<typeof Schemas.CreateWishlistSchema>;
export type CreateWishlistResponse = GetWishlistResponse;

export type DeleteWishlistRequest = z.infer<typeof Schemas.DeleteWishlistSchema>;
export type DeleteWishlistResponse = GetWishlistResponse;

// Order types
export type CreateOrderRequest = z.infer<typeof Schemas.CreateOrderSchema>;
export type CreateOrderResponse = DefaultResponseBody & {
  data?: {
    paymentUrl: string;
  };
};

export type GetOrderRequest = z.infer<typeof Schemas.GetOrderSchema>;
export type GetOrderResponse = DefaultResponseBody & {
  data: Order & {
    user: User;
    orderItems: (OrderItem & {
      product: Product;
      images: Image[];
      image: Image;
      color: string;
      size: string;
    })[];
    shippingDetails: {
      cost?: number | Decimal;
      address: Address;
    } | null;
  };
};

export type ListOrdersRequest = z.infer<typeof Schemas.ListOrdersSchema>;
export type ListOrdersResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    orders: GetOrderResponse['data'][];
  };
};

export type UpdateOrderRequest = z.infer<typeof Schemas.UpdateOrderStatusSchema>;
export type UpdateOrderResponse = DefaultResponseBody & {
  data: Order;
};

export type DeleteOrderRequest = z.infer<typeof Schemas.DeleteOrderSchema>;
export type DeleteOrderResponse = DefaultResponseBody & {
  data: Order;
};

// Payment types
export type GetPaymentRequest = z.infer<typeof Schemas.GetPaymentSchema>;
export type GetPaymentResponse = DefaultResponseBody & {
  data: {
    id: string;
    pending: boolean;
    amount: number;
    success: boolean;
    isCapture: boolean;
    isStandalonePayment: boolean;
    isVoided: boolean;
    isRefunded: boolean;
    is3dSecure: boolean;
    createdAt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
};

export type VoidPaymentRequest = z.infer<typeof Schemas.VoidPaymentSchema>;
export type VoidPaymentResponse = DefaultResponseBody;

export type RefundPaymentRequest = z.infer<typeof Schemas.RefundPaymentSchema>;
export type RefundPaymentResponse = DefaultResponseBody;

// Review types
export type GetReviewRequest = z.infer<typeof Schemas.GetReviewSchema>;
export type GetReviewResponse = DefaultResponseBody & {
  data: Review & {
    user: User;
  };
};

export type ListReviewsRequest = z.infer<typeof Schemas.ListReviewsSchema>;
export type ListReviewsResponse = DefaultResponseBody & {
  data: {
    pagination: Pagination;
    reviews: GetReviewResponse['data'][];
  };
};

export type CreateReviewRequest = z.infer<typeof Schemas.CreateReviewSchema>;
export type CreateReviewResponse = DefaultResponseBody & {
  data: Review;
};

export type UpdateReviewRequest = z.infer<typeof Schemas.UpdateReviewSchema>;
export type UpdateReviewResponse = CreateReviewResponse;

export type DeleteReviewRequest = z.infer<typeof Schemas.DeleteReviewSchema>;
export type DeleteReviewResponse = CreateReviewResponse;

// Dashboard types
export type GetDashboardOverviewRequest = undefined;
export type GetDashboardOverviewResponse = DefaultResponseBody & {
  data: {
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    totalSales: number;
    totalRefund: number;
    totalRevenue: number;
  };
};

export type GetSalesTrendsRequest = undefined;
export type GetSalesTrendsResponse = DefaultResponseBody & {
  data: {
    trends: {
      date: string;
      sales: number;
    }[];
  };
};

export type GetOrdersStatusRequest = undefined;
export type GetOrdersStatusResponse = DefaultResponseBody & {
  data: {
    pending: number;
    shipped: number;
    delivered: number;
    canceled: number;
    fulfilled: number;
  };
};

export type GetInventoryStatusRequest = undefined;
export type GetInventoryStatusResponse = DefaultResponseBody & {
  data: {
    lowStock: {
      stockRemaining: number;
      product: Product;
      color: Color;
      size: Size;
    }[];
    outOfStock: {
      product: Product;
      color: Color;
      size: Size;
    }[];
  };
};

export type ListCustomersFeedbackRequest = undefined;
export type ListCustomersFeedbackResponse = DefaultResponseBody & {
  data: {
    averageRating: number;
    recentFeedback: (Review & {
      user: User;
      product: Product;
    })[];
  };
};

export type ListTopProductsRequest = undefined;
export type ListTopProductsResponse = DefaultResponseBody & {
  data: { unitsSold: number; product: Product }[];
};

export type ListTopCustomersRequest = undefined;
export type ListTopCustomersResponse = DefaultResponseBody & {
  data: {
    totalPaid: number;
    totalOrders: number;
    user: User;
  }[];
};

// Discount types
export type GetDiscountRequest = z.infer<typeof Schemas.GetDiscountSchema>;
export type GetDiscountResponse = DefaultResponseBody & {
  data: Discount & {
    pagination: Pagination;
    products: Product[];
  };
};

export type ListDiscountsRequest = z.infer<typeof Schemas.ListDiscountsSchema>;
export type ListDiscountsResponse = DefaultResponseBody & {
  data: {
    discounts: (Discount & { productsCount: number })[];
    pagination: Pagination;
  };
};

export type CreateDiscountRequest = z.infer<typeof Schemas.CreateDiscountSchema>;
export type CreateDiscountResponse = DefaultResponseBody & {
  data: Discount;
};

export type UpdateDiscountRequest = z.infer<typeof Schemas.UpdateDiscountSchema>;
export type UpdateDiscountResponse = CreateDiscountResponse;

export type DeleteDiscountRequest = z.infer<typeof Schemas.DeleteDiscountSchema>;
export type DeleteDiscountResponse = CreateDiscountResponse;

export type AddProductsToDiscountRequest = z.infer<typeof Schemas.AddProductsToDiscountSchema>;
export type AddProductsToDiscountResponse = DefaultResponseBody;

export type RemoveProductsFromDiscountRequest = z.infer<
  typeof Schemas.RemoveProductsFromDiscountSchema
>;
export type RemoveProductsFromDiscountResponse = DefaultResponseBody;

export type SetMediaMetadataRequest = z.infer<typeof Schemas.SetMediaMetadataSchema>;
export type SetMediaMetadataResponse = DefaultResponseBody & {
  data: Media;
};

export type ListMediaRequest = z.infer<typeof Schemas.ListMediaSchema>;
export type ListMediaResponse = DefaultResponseBody & {
  data: Array<Media>;
};
