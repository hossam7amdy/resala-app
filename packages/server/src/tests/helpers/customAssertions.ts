import type { GetCategoryResponse, GetProfileResponse, ListAddressResponse } from '@resala/shared';
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
};

export const addressAssertions: ListAddressResponse['data'][0] = {
  id: expect.any(Number),
  state: expect.any(String),
  city: expect.any(String),
  street: expect.any(String),
  phone: expect.any(String),
  firstName: expect.any(String),
  lastName: expect.any(String),
  // @ts-expect-error custom matcher
  building: expect.toBeNullOrString(),
  // @ts-expect-error custom matcher
  floor: expect.toBeNullOrNumber(),
  // @ts-expect-error custom matcher
  address: expect.toBeNullOrString(),
  country: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

export const categoryAssertion: GetCategoryResponse['data'] = {
  id: expect.any(Number),
  arName: expect.any(String),
  enName: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
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
};
