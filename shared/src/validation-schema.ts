import zod from 'zod';

import { ROLE } from './enums';
import { validationPatterns } from './validation-patterns';

export const QueryParamsSchema = zod.object({
  page: zod.coerce
    .number({
      invalid_type_error: 'Page number must be a number',
    })
    .positive({
      message: 'Page number must be a positive number',
    })
    .max(100)
    .optional(),
  limit: zod.coerce
    .number({
      invalid_type_error: 'Limit must be a number',
    })
    .positive({
      message: 'Limit must be a positive number',
    })
    .max(100)
    .optional(),
  query: zod
    .string()
    .min(0, {
      message: 'Query must be at least 0 characters long',
    })
    .max(50, {
      message: 'Query must be at most 50 characters long',
    })
    .optional(),
});

export const UserSchema = zod.object({
  email: zod
    .string()
    .min(5, {
      message: 'Email must be at least 5 characters long',
    })
    .max(128, {
      message: 'Email must be at most 128 characters long',
    })
    .email(),
  firstName: zod
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters long',
    })
    .max(50, {
      message: 'First name must be at most 50 characters long',
    }),
  lastName: zod
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters long',
    })
    .max(50, {
      message: 'Last name must be at most 50 characters long',
    }),
  role: zod.enum([ROLE.ADMIN, ROLE.MODERATOR, ROLE.CUSTOMER]),
  phone: zod
    .string()
    .length(11, {
      message: 'Phone number must be 11 characters long',
    })
    .startsWith('01')
    .optional(),
  isVerified: zod.boolean().optional(),
  password: zod
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(50, {
      message: 'Password must be at most 50 characters long',
    })
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

export const ResetPasswordSchema = zod.object({
  code: zod.string().length(6, {
    message: 'Code must be 6 characters long',
  }),
  email: zod.string().email(),
  password: UserSchema.shape.password,
});

export const ChangePasswordSchema = zod.object({
  oldPassword: UserSchema.shape.password,
  newPassword: UserSchema.shape.password,
});

export const AddressSchema = zod.object({
  state: zod.string().max(100, {
    message: 'State must be at most 100 characters long',
  }),
  city: zod.string().max(100, {
    message: 'City must be at most 100 characters long',
  }),
  street: zod.string().max(100, {
    message: 'Street must be at most 100 characters long',
  }),
  country: zod
    .string()
    .max(100, {
      message: 'Country must be at most 100 characters long',
    })
    .optional(),
  building: zod
    .string()
    .max(50, {
      message: 'Building must be at most 50 characters long',
    })
    .optional(),
  floor: zod.number().positive().optional(),
  note: zod
    .string()
    .max(500, {
      message: 'Note must be at most 500 characters long',
    })
    .optional(),
});

export const CategorySchema = zod.object({
  categoryId: zod.coerce
    .number({
      invalid_type_error: 'Category ID must be a number',
    })
    .positive({
      message: 'Category ID must be a positive number',
    })
    .optional(),
  arName: zod
    .string()
    .min(2, {
      message: 'Arabic name must be at least 2 characters long',
    })
    .max(100, {
      message: 'Arabic name must be at most 100 characters long',
    }),
  enName: zod
    .string()
    .min(2, {
      message: 'English name must be at least 2 characters long',
    })
    .max(100, {
      message: 'English name must be at most 100 characters long',
    }),
});

export const ProductSchema = zod.object({
  id: zod.coerce
    .number({
      invalid_type_error: 'Product ID must be a number',
    })
    .positive({
      message: 'Product ID must be a positive number',
    })
    .optional(),
  categoryId: zod.coerce
    .number({
      invalid_type_error: 'Category ID must be a number',
    })
    .positive({
      message: 'Category ID must be a positive number',
    }),
  arName: zod
    .string({
      invalid_type_error: 'arName is required',
    })
    .min(2, {
      message: 'Arabic name must be at least 2 characters long',
    })
    .max(100, {
      message: 'Arabic name must be at most 100 characters long',
    }),
  enName: zod
    .string({
      invalid_type_error: 'enName is required',
    })
    .min(2, {
      message: 'English name must be at least 2 characters long',
    })
    .max(100, {
      message: 'English name must be at most 100 characters long',
    }),
  arDescription: zod
    .string({
      invalid_type_error: 'arDescription is required',
    })
    .max(500, {
      message: 'Arabic description must be at most 500 characters long',
    }),
  enDescription: zod
    .string({
      invalid_type_error: 'enDescription is required',
    })
    .max(500, {
      message: 'English description must be at most 500 characters long',
    }),
  price: zod.coerce
    .number({
      invalid_type_error: 'Price must be a number',
    })
    .positive(),
});

export const StockSchema = zod.object({
  productId: zod.coerce
    .number({
      invalid_type_error: 'Product ID must be a number',
    })
    .positive(),
  colorId: zod.coerce
    .number({
      invalid_type_error: 'Color ID must be a number',
    })
    .positive(),
  sizeId: zod.coerce
    .number({
      invalid_type_error: 'Size ID must be a number',
    })
    .positive(),
  quantity: zod.coerce
    .number({
      invalid_type_error: 'Quantity must be a number',
    })
    .nonnegative({
      message: 'Quantity must be a non-negative number',
    }),
});

export const ColorSchema = zod.object({
  arName: zod
    .string()
    .min(2, {
      message: 'Color name must be at least 2 characters long',
    })
    .max(15, {
      message: 'Color name must be at most 15 characters long',
    }),
  enName: zod
    .string()
    .min(2, {
      message: 'Color name must be at least 2 characters long',
    })
    .max(15, {
      message: 'Color name must be at most 15 characters long',
    }),
  code: zod
    .string()
    .startsWith('#', {
      message: 'Color code must start with #',
    })
    .length(7, {
      message: 'Color code must be 7 characters long',
    }),
});

export const SizeSchema = zod.object({
  name: zod
    .string()
    .min(1, {
      message: 'Size name must be at least 1 character long (e.g. S, M, L)',
    })
    .max(15, {
      message: 'Size name must be at most 15 characters long',
    }),
});

export const CartSchema = zod.object({
  userId: zod.coerce
    .number({
      invalid_type_error: 'User ID must be a number',
    })
    .positive(),
  stockId: zod.coerce
    .number({
      invalid_type_error: 'Stock ID must be a number',
    })
    .positive(),
  quantity: zod.number().positive({
    message: 'Quantity must be a positive number',
  }),
});

export const WishlistSchema = zod.object({
  userId: zod.coerce
    .number({
      invalid_type_error: 'User ID must be a number',
    })
    .positive(),
  productId: zod.coerce
    .number({
      invalid_type_error: 'Product ID must be a number',
    })
    .positive(),
});
