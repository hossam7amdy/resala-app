import { z } from 'zod';

const AddressSchema = z.object({
  id: z.string().cuid(),
  country: z.string().max(100).default('Egypt'),
  state: z.string().max(100),
  city: z.string().max(100),
  street: z.string().max(255),
  building: z.string().max(255).optional().nullable(),
  floor: z.number().int().max(1000).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  phone: z.string().max(15),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  company: z.string().max(100).optional().nullable(),
  countryCode: z.string().max(5).default('EG').optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isCoordinatesValidated: z.boolean().default(false),
  zip: z.string().max(50).optional().nullable(),
  address2: z.string().max(255).optional().nullable(),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

const CreateAddressSchema = z.object({
  body: AddressSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).extend({
    isDefault: z.boolean().default(false).optional(),
  }),
});

const UpdateAddressSchema = z.object({
  params: AddressSchema.pick({ id: true }),
  body: CreateAddressSchema.shape.body.partial(),
});

const DeleteAddressSchema = z.object({
  params: AddressSchema.pick({ id: true }),
});

export { AddressSchema, CreateAddressSchema, UpdateAddressSchema, DeleteAddressSchema };
