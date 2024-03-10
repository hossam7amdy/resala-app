import zod from 'zod';

import { ROLE } from './enums';
import { validationPatterns } from './validation-patterns';

export const QueryParamsSchema = zod.object({
  page: zod.coerce.number().positive().max(100).optional(),
  query: zod.string().min(0).max(50).optional(),
});

export const UserSchema = zod.object({
  id: zod.coerce.number().positive(),
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
  isVerified: zod.coerce.boolean().optional(),
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

export const AddressSchema = zod.object({
  id: zod.coerce.number().positive(),
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
  id: zod.string().uuid(),
  categoryId: zod.string().uuid().optional(),
  arName: zod.string().min(2).max(100),
  enName: zod.string().min(2).max(100),
});

export const ProductSchema = zod.object({
  id: zod.string().uuid(),
  categoryId: zod.string().uuid(),
  arName: zod.string().min(2).max(100),
  enName: zod.string().min(2).max(100),
  arDescription: zod.string().max(500),
  enDescription: zod.string().max(500),
  price: zod.coerce.number().positive(),
});

export const StockSchema = zod.object({
  id: zod.coerce.number().positive(),
  productId: zod.string().uuid(),
  colorId: zod.coerce.number().positive(),
  sizeId: zod.coerce.number().positive(),
  quantity: zod.coerce.number().nonnegative(),
});

export const ColorSchema = zod.object({
  id: zod.coerce.number().positive(),
  arName: zod.string().min(2).max(15),
  enName: zod.string().min(2).max(15),
  code: zod.string().startsWith('#').length(7),
});

export const SizeSchema = zod.object({
  id: zod.coerce.number().positive(),
  name: zod.string().min(1).max(15),
});

export const CartSchema = zod.object({
  userId: zod.string().uuid(),
  stockId: zod.coerce.number().positive(),
  quantity: zod.coerce.number().positive(),
});

export const WishlistSchema = zod.object({
  userId: zod.string().uuid(),
  productId: zod.string().uuid(),
});
