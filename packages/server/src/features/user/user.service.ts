import type { Prisma } from '@prisma/client';
import type { ListUsersRequest, UpdateUserRequest } from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';

export class UserService {
  constructor(private readonly db: DataStore) {}

  async update(id: number, payload: UpdateUserRequest['body']) {
    return await this.db.user.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number) {
    return await this.db.user.delete({
      where: { id },
    });
  }

  async find(id: number) {
    return await this.db.user.findUniqueOrThrow({
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
