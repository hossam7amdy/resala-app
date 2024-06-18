import type {
  GetCategoryResponse,
  GetProfileResponse,
  GetUserAddressListResponse,
} from '@resala/shared';
import { expect } from 'vitest';

export const userAssertions: GetProfileResponse['data'] = {
  id: expect.any(Number),
  email: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  phone: expect.any(String),
  role: expect.any(String),
  isVerified: expect.any(Boolean),
  // @ts-expect-error custom matcher
  lastLogin: expect.toBeNullOrString(),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  // @ts-expect-error custom matcher
  deletedAt: expect.toBeNullOrString(),
};

export const addressAssertions: GetUserAddressListResponse['data'][0] = {
  id: expect.any(Number),
  state: expect.any(String),
  city: expect.any(String),
  street: expect.any(String),
  phone: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  building: expect.any(String),
  floor: expect.any(Number),
  address: expect.any(String),
  country: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const categoryAssertion: GetCategoryResponse['data'] = {
  id: expect.any(Number),
  // @ts-expect-error - custom matcher
  categoryId: expect.toBeNullOrNumber(),
  arName: expect.any(String),
  enName: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  // @ts-expect-error - custom matcher
  deletedAt: expect.toBeNullOrString(),
  mainCategory: expect.any(Object), // Add the mainCategory property
  subCategories: expect.any(Array),
};

export const imageAssertion = {
  id: expect.any(Number),
  productId: expect.any(Number),
  imageKey: expect.any(String),
  imageUrl: expect.any(String),
  createdAt: expect.any(String),
};

export const productAssertion = {
  id: expect.any(Number),
  categoryId: expect.any(Number),
  arName: expect.any(String),
  enName: expect.any(String),
  arDescription: expect.any(String),
  enDescription: expect.any(String),
  // @ts-expect-error - custom matcher
  price: expect.toBeStringWithNumber(),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  // @ts-expect-error - custom matcher
  deletedAt: expect.toBeNullOrString(),
  // @ts-expect-error - custom matcher
  images: expect.toBeArrayOfImageObjectMatching(imageAssertion),
};
