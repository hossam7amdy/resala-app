import { AddressSchema, UserSchema } from '@resala/shared';

import { AdminUpdateUser, CreateUserAddress, UpdateProfile, UpdateUserAddress } from '../../types';
import { BadRequestError } from '../../utils/api-errors';

export const validateUpdateProfile: UpdateProfile = (req, _, next) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return next(new BadRequestError('Phone, first name and last name are required'));
  }

  const UpdateProfileSchema = UserSchema.pick({
    phone: true,
    firstName: true,
    lastName: true,
  });

  const validatedFields = UpdateProfileSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateAdminUpdateUser: AdminUpdateUser = (req, _, next) => {
  const { firstName, lastName, role } = req.body;
  if (!firstName || !lastName || !role) {
    return next(new BadRequestError('First name, last name and role are required fields'));
  }

  const UpdateUserSchema = UserSchema.pick({
    id: true,
    phone: true,
    firstName: true,
    lastName: true,
    role: true,
  });

  const validatedFields = UpdateUserSchema.safeParse({ ...req.body, id: req.params.userId });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateCreateAddress: CreateUserAddress = (req, _, next) => {
  const { state, city, street } = req.body;
  if (!state || !city || !street) {
    return next(new BadRequestError('userId, state, city, and street are required fields'));
  }

  const validatedFields = AddressSchema.safeParse({ ...req.body });

  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateUpdateAddress: UpdateUserAddress = (req, _, next) => {
  const id = req.params.addressId;
  const { state, city, street } = req.body;
  if (!state || !city || !street) {
    return next(new BadRequestError('state, city, and street are required fields'));
  }

  const validatedFields = AddressSchema.safeParse({ ...req.body, id });
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};
