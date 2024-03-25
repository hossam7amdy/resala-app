import { AddressSchema, UserSchema } from '@resala/shared';
import { ZodError } from 'zod';

import { AdminUpdateUser, CreateUserAddress, UpdateProfile, UpdateUserAddress } from '../../types';
import { BadRequestError } from '../../utils/api-errors';
import { formatZodError } from '../../utils/zod-errors';

export const validateUpdateProfile: UpdateProfile = (req, _, next) => {
  try {
    const UpdateProfileSchema = UserSchema.pick({
      phone: true,
      firstName: true,
      lastName: true,
    });

    req.body = UpdateProfileSchema.parse(req.body);

    next();
  } catch (err) {
    next(new BadRequestError(formatZodError(err as ZodError)));
  }
};

export const validateAdminUpdateUser: AdminUpdateUser = (req, _, next) => {
  const userId = Number(req.params.userId);

  try {
    if (isNaN(userId)) {
      throw new BadRequestError('userId is required');
    }

    const UpdateUserSchema = UserSchema.pick({
      phone: true,
      firstName: true,
      lastName: true,
      role: true,
    });

    req.body = UpdateUserSchema.parse(req.body);

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      next(new BadRequestError(formatZodError(err)));
    }
    next(err);
  }
};

export const validateCreateAddress: CreateUserAddress = (req, _, next) => {
  try {
    req.body = validateAddress(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateAddress: UpdateUserAddress = (req, _, next) => {
  const addressId = Number(req.params.addressId);

  try {
    if (isNaN(addressId)) {
      throw new BadRequestError('addressId is required');
    }

    req.body = validateAddress(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

const validateAddress = (address: any) => {
  try {
    return AddressSchema.parse(address);
  } catch (error) {
    throw new BadRequestError(formatZodError(error as ZodError));
  }
};
