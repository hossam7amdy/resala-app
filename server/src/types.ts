import { User } from '@prisma/client';

export interface LocalUser {
  user: Pick<
    User,
    | 'id'
    | 'email'
    | 'firstName'
    | 'lastName'
    | 'isVerified'
    | 'phone'
    | 'role'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
  >;
}
