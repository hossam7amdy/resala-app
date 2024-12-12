import { z } from 'zod';

import { AddressSchema } from './address.schema.js';
import { OffsetPageParamsSchema } from './common.schema.js';
import { OrderSchema } from './order.schema.js';

const UserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  emailMarketingState: z
    .enum(['subscribed', 'unsubscribed', 'not_subscribed'])
    .default('not_subscribed'),
  phoneNumber: z.string().optional().nullable(),
  phoneNumberVerified: z.boolean().default(false),
  smsMarketingState: z
    .enum(['subscribed', 'unsubscribed', 'not_subscribed'])
    .default('not_subscribed'),
  name: z.string().default(''),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['admin', 'staff', 'user']).default('user'),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.date().or(z.string().datetime()).optional().nullable(),
  isAnonymous: z.boolean().optional().nullable(),
  image: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  locale: z.string().default('en_US').optional().nullable(),
  birthDate: z.date().or(z.string().datetime()).optional().nullable(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const UpdateUserSchema = z.object({
  body: UserSchema.omit({
    id: true,
    emailVerified: true,
    phoneNumberVerified: true,
    isAnonymous: true,
    createdAt: true,
    updatedAt: true,
  }).partial(),
});

const GetUserSchema = z.object({
  params: UserSchema.pick({ id: true }),
});
const GetUserResponseSchema = UserSchema.extend({
  ordersCount: z.number().default(0),
  latestOrders: z.array(OrderSchema),
  addresses: z.array(AddressSchema.extend({ isDefault: z.boolean() })),
});

const ListUsersSchema = z.object({
  query: OffsetPageParamsSchema.extend({
    search: z.string().optional(),
  }),
});
const ListUsersResponseSchema = z.array(GetUserResponseSchema);

const DeleteUserSchema = z.object({
  params: UserSchema.pick({ id: true }),
});

export {
  UserSchema,
  GetUserSchema,
  ListUsersSchema,
  UpdateUserSchema,
  DeleteUserSchema,
  GetUserResponseSchema,
  ListUsersResponseSchema,
};
