import type { DataStore } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import type { User } from '@resala/shared';

import type { ListUsersParamsDto } from './user.dto';

export class UserService {
  constructor(private readonly db: DataStore) {}

  async update(id: string, payload: Partial<User>): Promise<User> {
    return await this.db.user.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<User> {
    return await this.db.user.delete({
      where: { id },
    });
  }

  async find(id: string): Promise<User> {
    return await this.db.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async list({ page, limit, search }: ListUsersParamsDto): Promise<User[]> {
    const isNotAnonymous = { isAnonymous: null };
    const searchFilter: Prisma.UserWhereInput = {
      OR: [
        { email: { startsWith: search, mode: 'insensitive' } },
        { phoneNumber: { startsWith: search, mode: 'insensitive' } },
      ],
      ...isNotAnonymous,
    };

    return this.db.user.findMany({
      where: search ? searchFilter : isNotAnonymous,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async count(): Promise<number> {
    return await this.db.user.count();
  }
}
