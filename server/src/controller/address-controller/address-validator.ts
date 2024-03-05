import {
  AddressSchema,
  CreateAddressRequest,
  CreateAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
} from '@resala/shared';

import { BadRequestError } from '../../lib/error';
import { ExpressHandler, ExpressHandlerWithParams } from '../../types';

export const validateCreateAddress: ExpressHandler<CreateAddressRequest, CreateAddressResponse> = (
  req,
  res,
  next
) => {
  const userId = res.locals.user.id as string;
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

export const validateUpdateAddress: ExpressHandlerWithParams<
  { addressId: string },
  UpdateAddressRequest,
  UpdateAddressResponse
> = (req, _, next) => {
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
