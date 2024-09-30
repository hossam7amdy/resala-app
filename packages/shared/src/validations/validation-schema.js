import { z } from 'zod';

import { validationPatterns } from '../patterns/index.js';

const UserSchema = z.object({
  email: z.string().min(5).max(128).email(),
  isVerified: z.boolean().optional(),
  phone: z.string().length(11).startsWith('01'),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  role: z.enum(['ADMIN', 'MODERATOR', 'CUSTOMER']),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(
      validationPatterns.passwordContainsLowerCaseCharacter.pattern,
      validationPatterns.passwordContainsLowerCaseCharacter.message
    )
    .regex(
      validationPatterns.passwordContainsNumericCharacters.pattern,
      validationPatterns.passwordContainsNumericCharacters.message
    )
    .regex(
      validationPatterns.passwordContainsUpperCaseCharacter.pattern,
      validationPatterns.passwordContainsUpperCaseCharacter.message
    ),
});
// Offset page schema
export const OffsetPageParamsSchema = z.object({
  page: z.coerce.number().positive().default(1).optional(),
  limit: z.coerce.number().positive().max(100).default(10).optional(),
});
// Auth Schemas
export const LoginSchema = z.object({
  body: z.object({
    sign: z.string().min(3),
    password: z.string(),
  }),
});
export const GoogleLoginSchema = z.object({
  query: z.object({
    redirectUrl: z.string().url().max(200).optional(),
  }),
});
export const RegisterSchema = z.object({
  body: z.object({
    firstName: UserSchema.shape.firstName,
    lastName: UserSchema.shape.lastName,
    phone: UserSchema.shape.phone,
    email: UserSchema.shape.email,
    password: UserSchema.shape.password,
  }),
});
export const ResendVerificationSchema = z.object({
  body: z.object({
    email: UserSchema.shape.email,
  }),
});
export const RefreshTokenSchema = z.object({
  body: z.object({
    token: z.string().min(80),
  }),
});
export const VerifyEmailSchema = z.object({
  body: z.object({}),
});
export const ResetPasswordSchema = z.object({
  body: z.object({
    newPassword: UserSchema.shape.password,
    confirmNewPassword: UserSchema.shape.password,
  }),
});
export const ChangePasswordSchema = z.object({
  body: z.object({
    oldPassword: UserSchema.shape.password,
    newPassword: UserSchema.shape.password,
  }),
});
export const ForgotPasswordSchema = z.object({
  body: z.object({
    email: UserSchema.shape.email,
    redirectUrl: z.string().url().max(100).optional(),
  }),
});
// User Schemas
export const GetUserSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const ListUsersSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().max(100).default('').optional(),
  }),
});
export const UpdateUserSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: z.object({
    firstName: UserSchema.shape.firstName,
    lastName: UserSchema.shape.lastName,
    phone: UserSchema.shape.phone,
    role: UserSchema.shape.role.optional(),
    isVerified: UserSchema.shape.isVerified.optional(),
  }),
});
export const DeleteUserSchema = z.object({
  params: z.object({
    userId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const CreateAddressSchema = z.object({
  body: z.object({
    userId: z.coerce.number().positive(),
    firstName: UserSchema.shape.firstName,
    lastName: UserSchema.shape.lastName,
    phone: UserSchema.shape.phone,
    state: z.string().max(100),
    city: z.string().max(100),
    street: z.string().max(100),
    country: z.string().max(100).optional(),
    building: z.string().max(50).optional(),
    floor: z.coerce.number().positive().optional(),
    address: z.string().max(500).optional(),
  }),
});
export const ListAddressSchema = z.object({
  query: z.object({
    userId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const UpdateAddressSchema = z.object({
  params: z.object({
    addressId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateAddressSchema.shape.body,
});
export const DeleteAddressSchema = z.object({
  params: UpdateAddressSchema.shape.params,
  query: ListAddressSchema.shape.query,
});
// Category Schemas
export const CreateCategorySchema = z.object({
  body: z.object({
    arName: z.string().min(2).max(100),
    enName: z.string().min(2).max(100),
  }),
});
export const UpdateCategorySchema = z.object({
  params: z.object({
    categoryId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateCategorySchema.shape.body,
});
export const GetCategorySchema = z.object({
  params: UpdateCategorySchema.shape.params,
});
export const DeleteCategorySchema = z.object({
  params: UpdateCategorySchema.shape.params,
});
// Product Schemas
export const CreateProductSchema = z.object({
  body: z.object({
    categoryId: z.coerce.number().positive(),
    arName: z.string().min(2).max(100),
    enName: z.string().min(2).max(100),
    arDescription: z.string().max(500),
    enDescription: z.string().max(500),
    price: z.coerce.number().positive(),
  }),
});
export const UpdateProductSchema = z.object({
  params: z.object({
    productId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateProductSchema.shape.body,
});
export const GetProductSchema = z.object({
  params: UpdateProductSchema.shape.params,
});
export const ListProductsSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().max(100).optional(),
    categoryId: z.coerce.number().positive().optional(),
  }),
});
export const DeleteProductSchema = z.object({
  params: UpdateProductSchema.shape.params,
});
// Stock Schemas
export const CreateStockSchema = z.object({
  body: z.object({
    productId: z.coerce.number().positive(),
    colorId: z.coerce.number().positive(),
    sizeId: z.coerce.number().positive(),
    quantity: z.coerce.number().nonnegative(),
  }),
});
export const UpdateStockSchema = z.object({
  params: z.object({
    stockId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateStockSchema.shape.body,
});
export const DeleteStockSchema = z.object({
  params: z.object({
    stockId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const ListStocksSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().max(100).optional(),
    productId: z.coerce.number().positive().optional(),
  }),
});
// Color Schemas
export const CreateColorSchema = z.object({
  body: z.object({
    arName: z.string().min(2).max(15),
    enName: z.string().min(2).max(15),
    code: z.string().startsWith('#').length(7),
  }),
});
export const UpdateColorSchema = z.object({
  params: z.object({
    colorId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateColorSchema.shape.body,
});
export const DeleteColorSchema = z.object({
  params: UpdateColorSchema.shape.params,
});
// Size Schemas
export const CreateSizeSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(5),
  }),
});
export const UpdateSizeSchema = z.object({
  params: z.object({
    sizeId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateSizeSchema.shape.body,
});
export const DeleteSizeSchema = z.object({
  params: UpdateSizeSchema.shape.params,
});
// Image Schemas
export const ListImagesSchema = z.object({
  query: z.object({
    productId: z.coerce.number().positive().optional(),
    colorId: z.coerce.number().positive().optional(),
  }),
});
export const CreateImageSchema = z.object({
  body: z.object({
    productId: z.coerce.number().positive(),
    colorId: z.coerce.number().positive(),
  }),
});
export const UpdateImageSchema = z.object({
  params: z.object({
    imageId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: z.object({
    isPrimary: z.coerce.boolean().optional(),
  }),
});
export const DeleteImageSchema = z.object({
  params: z.object({
    imageId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Cart Schemas
export const CreateCartSchema = z.object({
  body: z.object({
    stockId: z.coerce.number().positive(),
    quantity: z.coerce.number().positive(),
  }),
});
export const DeleteCartSchema = z.object({
  params: z.object({
    stockId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const CreateWishlistSchema = z.object({
  body: z.object({
    productId: z.coerce.number().positive(),
  }),
});
export const DeleteWishlistSchema = z.object({
  params: z.object({
    productId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Order Schemas
export const CreateOrderSchema = z.object({
  body: z.object({
    paymentMethod: z.enum(['CARD', 'CASH']),
    note: z.string().max(500).optional(),
    addressId: z.coerce.number().positive(),
  }),
});
export const GetOrderSchema = z.object({
  params: z.object({
    orderId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const ListOrdersSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    userId: z.coerce.number().positive().optional(),
    search: z.string().max(100).optional(),
  }),
});
export const UpdateOrderStatusSchema = z.object({
  params: z.object({
    orderId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: z.object({
    orderStatus: z.enum(['PENDING', 'FULFILLED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
    paymentStatus: z.enum(['UNPAID', 'PAID', 'FAILED', 'VOIDED', 'REFUNDED']),
  }),
});
export const DeleteOrderSchema = z.object({
  params: GetOrderSchema.shape.params,
  query: z.object({
    userId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Payment Schemas
export const GetPaymentSchema = z.object({
  params: z.object({
    transactionId: z.string(),
  }),
});
export const VoidPaymentSchema = z.object({
  body: z.object({
    transactionId: z.string(),
  }),
});
export const RefundPaymentSchema = z.object({
  body: z.object({
    transactionId: z.string(),
    amount: z.coerce.number().positive(),
  }),
});
// Review Schemas
export const CreateReviewSchema = z.object({
  body: z.object({
    userId: z.coerce.number().positive(),
    productId: z.coerce.number().positive(),
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().max(500).optional(),
  }),
});
export const GetReviewSchema = z.object({
  params: z.object({
    reviewId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
export const ListReviewsSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    productId: z.coerce.number().positive().optional(),
  }),
});
export const UpdateReviewSchema = z.object({
  params: GetReviewSchema.shape.params,
  body: CreateReviewSchema.shape.body,
});
export const DeleteReviewSchema = z.object({
  params: GetReviewSchema.shape.params,
  query: z.object({
    userId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
});
// Discount Schemas
export const CreateDiscountSchema = z.object({
  body: z
    .object({
      type: z.enum(['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']),
      amount: z.coerce.number().positive().min(0.1),
      description: z.string().max(250).optional(),
      minQty: z.coerce.number().positive().optional(),
      isActive: z.boolean().optional(),
      isStoreWide: z.boolean().optional(),
      startDate: z.coerce
        .date()
        .optional()
        .transform(val => val?.toISOString()),
      endDate: z.coerce
        .date()
        .optional()
        .transform(val => val?.toISOString()),
      productIds: z.array(z.coerce.number().positive()).min(1).max(50).optional(),
    })
    .refine(
      ({ type, productIds }) => {
        return ['FIXED', 'BULK'].includes(type) && productIds === undefined;
      },
      {
        message: 'You cannot provide products for order-level discounts. (e.g. FIXED, BULK)',
        path: ['productIds'],
      }
    )
    .refine(
      ({ isStoreWide, productIds }) => {
        return isStoreWide ? !productIds : !!productIds;
      },
      {
        message: 'Please choose either store-wide or select specific products, but not both.',
        path: ['productIds'],
      }
    )
    .refine(
      ({ startDate, endDate }) => {
        // if both startDate and endDate are provided, endDate must be greater than startDate
        if (startDate && endDate) {
          const start = new Date(startDate).getTime();
          const end = new Date(endDate).getTime();
          return end >= start;
        }
        // if endDate is provided, startDate must be provided
        return endDate ? !!startDate : true;
      },
      {
        message:
          'Start date must not be in the past and end date must be greater than the start date.',
        path: ['startDate'],
      }
    )
    .refine(
      data => {
        if (data.type === 'BULK') return data.minQty;
        return true;
      },
      {
        message: 'Minimum quantity is required for BULK discount type.',
        path: ['minQty'],
      }
    )
    .refine(
      data => {
        if (data.type === 'BOGO') {
          return data.minQty && data.amount === Math.trunc(data.amount);
        }
        return true;
      },
      {
        message: 'Amount must be an integer for BOGO discount type.',
        path: ['amount'],
      }
    ),
});
export const UpdateDiscountSchema = z.object({
  params: z.object({
    discountId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  body: CreateDiscountSchema.shape.body,
});
export const DeleteDiscountSchema = z.object({
  params: UpdateDiscountSchema.shape.params,
});
export const ListDiscountsSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    type: z.enum(['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']).optional(),
    isActive: z.boolean().optional(),
    isStoreWide: z.boolean().optional(),
    startDate: z.coerce
      .date()
      .optional()
      .transform(val => val?.toISOString()),
    endDate: z.coerce
      .date()
      .optional()
      .transform(val => val?.toISOString()),
  }).refine(
    data => {
      if (!data.startDate || !data.endDate) return true;
      const startDate = new Date(data.startDate).getTime();
      const endDate = new Date(data.endDate).getTime();
      const now = new Date(new Date().toDateString()).getTime();
      return startDate >= now && endDate >= startDate;
    },
    {
      message:
        'Start date must not be in the past and end date must be greater than the start date.',
      path: ['startDate'],
    }
  ),
});
export const GetDiscountSchema = z.object({
  params: z.object({
    discountId: z.coerce
      .number()
      .positive()
      .transform(val => val.toString()),
  }),
  query: OffsetPageParamsSchema,
});
