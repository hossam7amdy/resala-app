import zod from 'zod';

import { ROLE } from './enums';
import { validationPatterns } from './validation-patterns';

export const QueryParamsSchema = zod.object({
  page: zod.number().positive().max(100).optional(),
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
  id: zod.coerce.number().positive(),
  categoryId: zod.number().positive().optional(),
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
  id: zod.coerce.number().positive(),
  categoryId: zod.number().positive(),
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
  price: zod.number().positive(),
});

export const StockSchema = zod.object({
  id: zod.coerce.number().positive(),
  productId: zod.number().positive(),
  colorId: zod.number().positive(),
  sizeId: zod.number().positive(),
  quantity: zod.number().nonnegative({
    message: 'Quantity must be a non-negative number',
  }),
});

export const ColorSchema = zod.object({
  id: zod.number().positive(),
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
  id: zod.coerce.number().positive(),
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
  quantity: zod.number().positive({
    message: 'Quantity must be a positive number',
  }),
});

export const WishlistSchema = zod.object({
  userId: zod.coerce.number().positive(),
  productId: zod.coerce.number().positive(),
});
