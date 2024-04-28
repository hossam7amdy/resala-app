import zod from 'zod';
import { ROLE } from './enums.js';
import { validationPatterns } from './validation-patterns.js';
const UserSchema = zod.object({
    email: zod.string().min(5).max(128).email(),
    isVerified: zod.boolean().optional(),
    phone: zod.string().length(11).startsWith('01'),
    firstName: zod.string().min(2).max(50),
    lastName: zod.string().min(2).max(50),
    role: zod.enum([ROLE.ADMIN, ROLE.MODERATOR, ROLE.CUSTOMER]),
    password: zod
        .string()
        .min(8)
        .max(50)
        .regex(validationPatterns.passwordContainsLowerCaseCharacter.pattern, validationPatterns.passwordContainsLowerCaseCharacter.message)
        .regex(validationPatterns.passwordContainsNumericCharacters.pattern, validationPatterns.passwordContainsNumericCharacters.message)
        .regex(validationPatterns.passwordContainsUpperCaseCharacter.pattern, validationPatterns.passwordContainsUpperCaseCharacter.message),
});
// Pagination Schema
export const DefaultQuerySchema = zod.object({
    query: zod.object({
        page: zod.coerce
            .number()
            .positive()
            .max(100)
            .optional()
            .transform(val => val || 1),
        limit: zod.coerce
            .number()
            .positive()
            .max(100)
            .optional()
            .transform(val => val || 10),
        query: zod
            .string()
            .min(0)
            .max(50)
            .optional()
            .transform(val => val || ''),
        deleted: zod
            .enum(['true', 'false'])
            .optional()
            .transform(val => val === 'true'),
    }),
});
// Auth Schemas
export const LoginSchema = zod.object({
    body: zod.object({
        sign: zod.string(),
        password: zod.string(),
    }),
});
export const RegisterSchema = zod.object({
    body: zod.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
        email: UserSchema.shape.email,
        password: UserSchema.shape.password,
    }),
});
export const VerifyEmailSchema = zod.object({
    query: zod.object({
        email: UserSchema.shape.email,
        token: zod.string().min(80),
    }),
});
export const ResetPasswordSchema = zod.object({
    body: zod.object({
        email: UserSchema.shape.email,
        code: zod.string().length(6),
        password: UserSchema.shape.password,
    }),
});
export const ChangePasswordSchema = zod.object({
    body: zod.object({
        oldPassword: UserSchema.shape.password,
        newPassword: UserSchema.shape.password,
    }),
});
export const ForgotPasswordSchema = zod.object({
    body: zod.object({
        email: UserSchema.shape.email,
    }),
});
// User Schemas
export const UpdateProfileSchema = zod.object({
    body: zod.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
    }),
});
export const AdminGetUserSchema = zod.object({
    params: zod.object({
        userId: zod.coerce.number().positive(),
    }),
});
export const AdminUpdateUserSchema = zod.object({
    params: zod.object({
        userId: zod.coerce.number().positive(),
    }),
    body: UpdateProfileSchema.shape.body.extend({
        role: UserSchema.shape.role,
        isVerified: UserSchema.shape.isVerified,
        deletedAt: zod.date().optional(),
    }),
});
export const AdminDeleteUserSchema = zod.object({
    params: zod.object({
        userId: zod.coerce.number().positive(),
    }),
});
export const CreateAddressSchema = zod.object({
    body: zod.object({
        firstName: UserSchema.shape.firstName,
        lastName: UserSchema.shape.lastName,
        phone: UserSchema.shape.phone,
        state: zod.string().max(100),
        city: zod.string().max(100),
        street: zod.string().max(100),
        country: zod.string().max(100).optional(),
        building: zod.string().max(50).optional(),
        floor: zod.coerce.number().positive().optional(),
        address: zod.string().max(500).optional(),
    }),
});
export const UpdateAddressSchema = zod.object({
    params: zod.object({
        addressId: zod.coerce.number().positive(),
    }),
    body: CreateAddressSchema.shape.body,
});
export const DeleteAddressSchema = zod.object({
    params: UpdateAddressSchema.shape.params,
});
// Category Schemas
export const CreateCategorySchema = zod.object({
    body: zod.object({
        categoryId: zod.coerce.number().positive().optional(),
        arName: zod.string().min(2).max(100),
        enName: zod.string().min(2).max(100),
    }),
});
export const UpdateCategorySchema = zod.object({
    params: zod.object({
        categoryId: zod.coerce.number().positive(),
    }),
    body: CreateCategorySchema.shape.body.extend({
        deletedAt: zod.date().optional(),
    }),
});
export const GetCategorySchema = zod.object({
    params: UpdateCategorySchema.shape.params,
});
export const DeleteCategorySchema = zod.object({
    params: UpdateCategorySchema.shape.params,
});
// Product Schemas
export const CreateProductSchema = zod.object({
    body: zod.object({
        id: zod.coerce.number().positive().optional(),
        categoryId: zod.coerce.number().positive(),
        arName: zod.string().min(2).max(100),
        enName: zod.string().min(2).max(100),
        arDescription: zod.string().max(500),
        enDescription: zod.string().max(500),
        price: zod.coerce.number().positive(),
    }),
});
export const UpdateProductSchema = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
    }),
    body: CreateProductSchema.shape.body.extend({
        deletedAt: zod.date().optional(),
    }),
});
export const DeleteProductSchema = zod.object({
    params: UpdateProductSchema.shape.params,
});
export const GetProductImages = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
export const CreateProductImageSchema = zod.object({
    body: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
export const DeleteProductImageSchema = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
        imageId: zod.coerce.number().positive(),
    }),
});
// Stock Schemas
export const CreateStockSchema = zod.object({
    body: zod.object({
        productId: zod.coerce.number().positive(),
        colorId: zod.coerce.number().positive(),
        sizeId: zod.coerce.number().positive(),
        quantity: zod.coerce.number().nonnegative(),
    }),
});
export const UpdateStockSchema = zod.object({
    params: zod.object({
        stockId: zod.coerce.number().positive(),
    }),
    body: CreateStockSchema.shape.body,
});
export const DeleteStockSchema = zod.object({
    params: zod.object({
        stockId: zod.coerce.number().positive(),
    }),
});
// Color Schemas
export const CreateColorSchema = zod.object({
    body: zod.object({
        arName: zod.string().min(2).max(15),
        enName: zod.string().min(2).max(15),
        code: zod.string().startsWith('#').length(7),
    }),
});
export const UpdateColorSchema = zod.object({
    params: zod.object({
        colorId: zod.coerce.number().positive(),
    }),
    body: CreateColorSchema.shape.body,
});
export const DeleteColorSchema = zod.object({
    params: UpdateColorSchema.shape.params,
});
// Size Schemas
export const CreateSizeSchema = zod.object({
    body: zod.object({
        name: zod.string().min(1).max(15),
    }),
});
export const UpdateSizeSchema = zod.object({
    params: zod.object({
        sizeId: zod.coerce.number().positive(),
    }),
    body: CreateSizeSchema.shape.body,
});
export const DeleteSizeSchema = zod.object({
    params: UpdateSizeSchema.shape.params,
});
// Cart Schemas
export const CreateCartSchema = zod.object({
    body: zod.object({
        stockId: zod.coerce.number().positive(),
        quantity: zod.coerce.number().positive(),
    }),
});
export const DeleteCartSchema = zod.object({
    params: zod.object({
        stockId: zod.coerce.number().positive(),
    }),
});
export const CreateWishlistSchema = zod.object({
    body: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
export const DeleteWishlistSchema = zod.object({
    params: zod.object({
        productId: zod.coerce.number().positive(),
    }),
});
// Order Schemas
export const CreateOrderSchema = zod.object({
    body: zod.object({
        paymentMethod: zod.enum(['CARD', 'CASH']),
        note: zod.string().max(500).optional(),
        addressId: zod.coerce.number().positive(),
    }),
});
export const GetOrderSchema = zod.object({
    params: zod.object({
        orderId: zod.coerce.number().positive(),
    }),
});
// Payment Schemas
export const CreatePaymentSchema = zod.object({
    query: zod.object({
        hmac: zod.string(),
    }),
});
export const GetPaymentSchema = zod.object({
    params: zod.object({
        paymentId: zod.coerce.number().positive(),
    }),
});
