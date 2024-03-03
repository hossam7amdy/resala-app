import { QueryParamsSchema, UserSchema } from '@resala/shared';

const CreateUserSchema = UserSchema.omit({ id: true });

export const validateChangePasswordData = (payload: any) => {
  const { oldPassword, newPassword } = payload;
  if (!oldPassword || !newPassword) {
    return 'Old password and new password are required';
  }
};

export const validateForgotPasswordData = (payload: any) => {
  const { email } = payload;
  if (!email) {
    return 'Email is required';
  }

  const ForgotPasswordSchema = UserSchema.pick({ email: true });

  const validatedFields = ForgotPasswordSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateUpdateProfileData = (payload: any) => {
  const { phone, firstName, lastName } = payload;
  if (!phone || !firstName || !lastName) {
    return 'Phone, first name and last name are required';
  }

  const UpdateProfileSchema = UserSchema.pick({
    phone: true,
    firstName: true,
    lastName: true,
  });

  const validatedFields = UpdateProfileSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateQueryParams = (queryParams: any) => {
  const validatedFields = QueryParamsSchema.safeParse(queryParams);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateUserCreationData = (payload: any) => {
  const { email, password, firstName, lastName, role } = payload;
  if (!email || !password || !firstName || !lastName || !role) {
    return 'Email, password, first name, last name and role are required fields';
  }

  const validatedFields = CreateUserSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateUserUpdateData = (payload: any) => {
  const { phone, firstName, lastName, role } = payload;
  if (!phone || !firstName || !lastName || !role) {
    return 'Phone, first name, last name and role are required fields';
  }

  const UpdateUserSchema = UserSchema.pick({
    phone: true,
    firstName: true,
    lastName: true,
    role: true,
  });

  const validatedFields = UpdateUserSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};
