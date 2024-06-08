import { Role } from '@resala/shared';

export const checkIsAdmin = (role: string) => [Role.ADMIN, Role.MODERATOR].includes(role as Role);
