import { AddressSchema } from '@resala/shared';

const NoIdAddressSchema = AddressSchema.omit({ id: true });

export const validateCreateAddress = (address: any) => {
  const { userId, state, city, street } = address;
  if (!userId || !state || !city || !street) {
    return 'userId, state, city, and street are required fields';
  }

  const validatedFields = NoIdAddressSchema.safeParse(address);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateUpdateAddress = (address: any) => {
  const { id, userId, state, city, street } = address;
  if (!id || !userId || !state || !city || !street) {
    return 'id, userId, state, city, and street are required fields';
  }

  const validatedFields = AddressSchema.safeParse(address);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};
