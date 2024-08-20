import type { Prisma } from '@prisma/client';
import type { ListUsersRequest, UpdateUserRequest } from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';

const USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  isVerified: true,
  phone: true,
  role: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
};

export class UserService {
  constructor(private readonly db: DataStore) {}

  async update(id: number, payload: UpdateUserRequest['body']) {
    const user = await this.find(id);

    // Prevent updating the role if the user is not an admin
    if (payload.role && user.role !== 'ADMIN') {
      delete payload.role;
    }

    return await this.db.user.update({
      where: { id },
      data: payload,
      select: USER_SELECT,
    });
  }

  async delete(id: number) {
    return await this.db.user.delete({
      select: USER_SELECT,
      where: { id },
    });
  }

  async find(id: number) {
    return await this.db.user.findUniqueOrThrow({
      select: USER_SELECT,
      where: { id },
    });
  }

  async list({ page, limit, query }: ListUsersRequest['query']) {
    const first = query.split(' ')[0];
    let last = query.split(' ')[1];
    if (!last) last = first;

    const filters: Prisma.UserWhereInput = {
      OR: [
        { firstName: { startsWith: first, mode: 'insensitive' } },
        { lastName: { startsWith: last, mode: 'insensitive' } },
        { email: { startsWith: first, mode: 'insensitive' } },
        { phone: { startsWith: first, mode: 'insensitive' } },
      ],
    };

    const [total, users] = await this.db.$transaction([
      this.db.user.count({ where: filters }),

      this.db.user.findMany({
        select: USER_SELECT,
        where: filters,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return {
      users,
      pagination: { page, limit, total },
    };
  }
}
