import { UserSchema } from '@resala/shared';

export const validateRegistrationData = (payload: any) => {
  const { email, password, firstName, lastName } = payload;
  if (!email || !password || !firstName || !lastName) {
    return 'Email, password, first name and last name are required';
  }

  const RegisterSchema = UserSchema.pick({
    email: true,
    password: true,
    firstName: true,
    lastName: true,
  });

  const validatedFields = RegisterSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateLoginData = (payload: any) => {
  const { email, password } = payload;
  if (!email || !password) {
    return 'Email and password are required';
  }

  const LoginSchema = UserSchema.pick({
    email: true,
    password: true,
  });
  const validatedFields = LoginSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateChangePasswordData = (payload: any) => {
  const { email, oldPassword, newPassword } = payload;
  if (!email || !oldPassword || !newPassword) {
    return 'Email, old password and new password are required';
  }
};

export const validateForgotPasswordData = (payload: any) => {
  const { email } = payload;
  if (!email) {
    return 'Email is required';
  }

  const ForgotPasswordSchema = UserSchema.pick({
    email: true,
  });
  const validatedFields = ForgotPasswordSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};

export const validateResetPasswordData = (payload: any) => {
  const { code, email, password } = payload;
  if (!code || !email || !password) {
    return 'Code, email and password are required';
  }

  const ResetPasswordSchema = UserSchema.pick({
    email: true,
    password: true,
  });
  const validatedFields = ResetPasswordSchema.safeParse(payload);
  if (!validatedFields.success) {
    return validatedFields.error.issues[0].message;
  }
};
