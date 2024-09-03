/**
 * @file This file contains all the types for the API requests and responses.
 *
 * It is used by the API service to validate the request and response data.
 * It also considered as the contract between the client and the server.
 */
import type { z } from 'zod';
import type { Address, Cart, Category, Color, Image, Order, OrderItem, Pagination, Product, Review, Shipping, Size, Stock, User, Wishlist } from '../types/index.js';
import type * as Schemas from '../validations/index.js';
export type ListRequestQuery = {
    query: z.infer<typeof Schemas.OffsetPageParamsSchema>;
};
export type DefaultResponseBody = {
    success: boolean;
    message?: string;
};
export type LoginRequest = z.infer<typeof Schemas.LoginSchema>;
export type LoginResponse = DefaultResponseBody & {
    data: {
        accessToken: string;
        refreshToken: string;
        user: User;
    };
};
export type RegisterRequest = z.infer<typeof Schemas.RegisterSchema>;
export type RegisterResponse = DefaultResponseBody;
export type RefreshTokenRequest = z.infer<typeof Schemas.RefreshTokenSchema>;
export type RefreshTokenResponse = DefaultResponseBody & {
    data: {
        accessToken: string;
        refreshToken: string;
    };
};
export type VerifyEmailRequest = z.infer<typeof Schemas.VerifyEmailSchema>;
export type VerifyEmailResponse = DefaultResponseBody;
export type ResendVerificationEmailRequest = z.infer<typeof Schemas.ResendVerificationSchema>;
export type ResendVerificationEmailResponse = DefaultResponseBody;
export type ForgotPasswordRequest = z.infer<typeof Schemas.ForgotPasswordSchema>;
export type ForgotPasswordResponse = DefaultResponseBody;
export type ResetPasswordRequest = z.infer<typeof Schemas.ResetPasswordSchema>;
export type ResetPasswordResponse = DefaultResponseBody;
export type ChangePasswordRequest = z.infer<typeof Schemas.ChangePasswordSchema>;
export type ChangePasswordResponse = DefaultResponseBody;
export type GetUserRequest = z.infer<typeof Schemas.GetUserSchema>;
export type GetUserResponse = DefaultResponseBody & {
    data: User;
};
export type ListUsersRequest = z.infer<typeof Schemas.ListUsersSchema>;
export type ListUsersResponse = DefaultResponseBody & {
    data: {
        pagination: Pagination;
        users: User[];
    };
};
export type UpdateUserRequest = z.infer<typeof Schemas.UpdateUserSchema>;
export type UpdateUserResponse = DefaultResponseBody & {
    data: User;
};
export type DeleteUserRequest = z.infer<typeof Schemas.DeleteUserSchema>;
export type DeleteUserResponse = DefaultResponseBody;
export type GetAddressRequest = undefined;
export type GetAddressResponse = DefaultResponseBody & {
    data: Address;
};
export type ListAddressRequest = z.infer<typeof Schemas.ListAddressSchema>;
export type ListAddressResponse = DefaultResponseBody & {
    data: GetAddressResponse['data'][];
};
export type CreateAddressRequest = z.infer<typeof Schemas.CreateAddressSchema>;
export type CreateAddressResponse = GetAddressResponse;
export type UpdateAddressRequest = z.infer<typeof Schemas.UpdateAddressSchema>;
export type UpdateAddressResponse = GetAddressResponse;
export type DeleteAddressRequest = z.infer<typeof Schemas.DeleteAddressSchema>;
export type DeleteAddressResponse = GetAddressResponse;
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
export type GetProductRequest = z.infer<typeof Schemas.GetProductSchema>;
export type GetProductResponse = DefaultResponseBody & {
    data: Product & {
        category: Category;
    };
};
export type ListProductsRequest = z.infer<typeof Schemas.ListProductsSchema>;
export type ListProductsResponse = DefaultResponseBody & {
    data: {
        products: GetProductResponse['data'][];
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
export type GetStockRequest = DeleteStockRequest;
export type GetStockResponse = DefaultResponseBody & {
    data: {
        product: Product;
        color: Color;
        sizes: (Omit<Stock, 'id' | 'colorId' | 'productId'> & {
            stockId: number;
            size: string;
        })[];
        images: Omit<Image, 'colorId' | 'productId'>[];
    };
};
export type ListStocksRequest = z.infer<typeof Schemas.ListStocksSchema>;
export type ListStocksResponse = DefaultResponseBody & {
    data: {
        pagination: Pagination;
        stocks: GetStockResponse['data'][];
    };
};
export type CreateStockRequest = z.infer<typeof Schemas.CreateStockSchema>;
export type CreateStockResponse = DefaultResponseBody & {
    data: Stock;
};
export type UpdateStockRequest = z.infer<typeof Schemas.UpdateStockSchema>;
export type UpdateStockResponse = CreateStockResponse;
export type DeleteStockRequest = z.infer<typeof Schemas.DeleteStockSchema>;
export type DeleteStockResponse = CreateStockResponse;
export type CreateImageRequest = z.infer<typeof Schemas.CreateImageSchema>;
export type CreateImageResponse = DefaultResponseBody;
export type ListImagesRequest = z.infer<typeof Schemas.ListImagesSchema>;
export type ListImagesResponse = DefaultResponseBody & {
    data: Image[];
};
export type UpdateImageRequest = z.infer<typeof Schemas.UpdateImageSchema>;
export type UpdateImageResponse = DefaultResponseBody & {
    data: Image;
};
export type DeleteImageRequest = z.infer<typeof Schemas.DeleteImageSchema>;
export type DeleteImageResponse = DefaultResponseBody & {
    data: Image;
};
export type GetCartRequest = Record<string, undefined>;
export type GetCartResponse = DefaultResponseBody & {
    data: {
        totalQuantity: number;
        totalPrice: number;
        items: (Omit<Cart, 'stockId'> & {
            product: Product;
            images: Omit<Image, 'colorId' | 'productId'>[];
            stock: Omit<Stock, 'colorId' | 'sizeId' | 'productId'> & {
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
            color: string;
            size: string;
        })[];
        shippingDetails: (Omit<Shipping, 'addressId' | 'orderId'> & {
            address: Address;
        }) | null;
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
export type GetPaymentRequest = z.infer<typeof Schemas.GetPaymentSchema>;
export type GetPaymentResponse = DefaultResponseBody & {
    data: {
        id: number;
        pending: boolean;
        amount_cents: number;
        success: boolean;
        is_auth: boolean;
        is_capture: boolean;
        is_standalone_payment: boolean;
        is_voided: boolean;
        is_refunded: boolean;
        is_3d_secure: boolean;
        integration_id: number;
        profile_id: number;
        has_parent_transaction: boolean;
        created_at: string;
        [key: string]: any;
    };
};
export type VoidPaymentRequest = z.infer<typeof Schemas.VoidPaymentSchema>;
export type VoidPaymentResponse = DefaultResponseBody;
export type RefundPaymentRequest = z.infer<typeof Schemas.RefundPaymentSchema>;
export type RefundPaymentResponse = DefaultResponseBody;
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
    data: {
        unitsSold: number;
        product: Product;
    }[];
};
export type ListTopCustomersRequest = undefined;
export type ListTopCustomersResponse = DefaultResponseBody & {
    data: {
        totalPaid: number;
        totalOrders: number;
        user: User;
    }[];
};
