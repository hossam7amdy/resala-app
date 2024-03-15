import { AddressSchema } from '@resala/shared';

import { CreateAddress, UpdateAddress } from '.';
import { BadRequestError } from '../../utils/api-errors';

export const validateCreateAddress: CreateAddress = (req, res, next) => {
  const userId = res.locals.user.id;
  const { state, city, street } = req.body;
  if (!state || !city || !street) {
    return next(new BadRequestError('userId, state, city, and street are required fields'));
  }

  const CreateAddressSchema = AddressSchema.omit({ id: true });
  const validatedFields = CreateAddressSchema.safeParse({ ...req.body, userId });

  if (!validatedFields.success) {
    return next(new BadRequestError(validatedFields.error.issues[0].message));
  }

  next();
};

export const validateUpdateAddress: UpdateAddress = (req, _, next) => {
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
