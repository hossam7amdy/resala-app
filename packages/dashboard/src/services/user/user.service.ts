import type { DataStore } from '@/lib/db';
import type { Prisma, User } from '@prisma/client';

import type { ListUsersParamsDto } from './user.dto';

export class UserService {
  constructor(private readonly db: DataStore) {}

  async update(id: number, payload: Partial<User>): Promise<User> {
    return await this.db.user.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: number): Promise<User> {
    return await this.db.user.delete({
      where: { id },
    });
  }

  async find(id: number): Promise<User> {
    return await this.db.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async list({ page, limit, search }: ListUsersParamsDto): Promise<User[]> {
    const filters: Prisma.UserWhereInput = {
      OR: [
        { email: { startsWith: search, mode: 'insensitive' } },
        { phone: { startsWith: search, mode: 'insensitive' } },
      ],
      isAnonymous: false,
    };

    return this.db.user.findMany({
      where: search ? filters : undefined,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async count(): Promise<number> {
    return await this.db.user.count();
  }
}
