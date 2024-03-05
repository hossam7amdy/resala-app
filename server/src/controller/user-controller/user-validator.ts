import {
  AdminCreateUserRequest,
  AdminCreateUserResponse,
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
  UpdateSelfRequest,
  UpdateSelfResponse,
  UserSchema,
} from '@resala/shared';

import { BadRequestError } from '../../lib/error';
import { ExpressHandler, ExpressHandlerWithParams } from '../../types';

export const validateUpdateProfile: ExpressHandler<UpdateSelfRequest, UpdateSelfResponse> = (
  req,
  _,
  next
) => {
  const { phone, firstName, lastName } = req.body;
  if (!phone || !firstName || !lastName) {
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

export const validateAdminCreateUser: ExpressHandler<
  AdminCreateUserRequest,
  AdminCreateUserResponse
> = (req, _, next) => {
  const { email, password, firstName, lastName, role } = req.body;
  if (!email || !password || !firstName || !lastName || !role) {
    return next(
      new BadRequestError('Email, password, first name, last name and role are required fields')
    );
  }

  const CreateUserSchema = UserSchema.omit({ id: true });
  const validatedFields = CreateUserSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateAdminUpdateUser: ExpressHandlerWithParams<
  { userId: string },
  AdminUpdateUserRequest,
  AdminUpdateUserResponse
> = (req, _, next) => {
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
