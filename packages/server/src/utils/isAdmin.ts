import { Role, type User } from '@resala/shared';

export const checkIsAdmin = (user?: User) =>
  [Role.ADMIN, Role.MODERATOR].includes(user?.role as Role);
