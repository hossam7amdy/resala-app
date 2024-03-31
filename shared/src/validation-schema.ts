import zod from 'zod';

import { ROLE } from './enums';
import { validationPatterns } from './validation-patterns';

export const PaginationSchema = zod.object({
  page: zod.coerce.number().positive().max(100).optional(),
  limit: zod.coerce.number().positive().max(100).optional(),
  query: zod.string().min(0).max(50).optional(),
});

export const UserSchema = zod.object({
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

export const RegisterSchema = zod.object({
  firstName: UserSchema.shape.firstName,
  lastName: UserSchema.shape.lastName,
  phone: UserSchema.shape.phone,
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
});

export const ResetPasswordSchema = zod.object({
  code: zod.string().length(6),
  email: UserSchema.shape.email,
  password: UserSchema.shape.password,
});

export const ChangePasswordSchema = zod.object({
  oldPassword: UserSchema.shape.password,
  newPassword: UserSchema.shape.password,
});

export const AddressSchema = zod.object({
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
});

export const CategorySchema = zod.object({
  id: zod.coerce.number().positive().optional(),
  categoryId: zod.coerce.number().positive().optional(),
  arName: zod.string().min(2).max(100),
  enName: zod.string().min(2).max(100),
});

export const ProductSchema = zod.object({
  id: zod.coerce
    .number()
    .positive({
      message: 'Product ID must be a positive number',
    })
    .optional(),
  categoryId: zod.coerce.number().positive({
    message: 'Category ID must be a positive number',
  }),
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
  arDescription: zod.string().max(500, {
    message: 'Arabic description must be at most 500 characters long',
  }),
  enDescription: zod.string().max(500, {
    message: 'English description must be at most 500 characters long',
  }),
  price: zod.coerce.number().positive(),
});

export const StockSchema = zod.object({
  productId: zod.coerce.number().positive(),
  colorId: zod.coerce.number().positive(),
  sizeId: zod.coerce.number().positive(),
  quantity: zod.coerce.number().nonnegative({
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
  userId: zod.coerce.number().positive(),
  stockId: zod.coerce.number().positive(),
  quantity: zod.coerce.number().positive({
    message: 'Quantity must be a positive number',
  }),
});

export const WishlistSchema = zod.object({
  userId: zod.coerce.number().positive(),
  productId: zod.coerce.number().positive(),
});
