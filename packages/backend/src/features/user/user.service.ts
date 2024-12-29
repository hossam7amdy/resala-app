import type { DataStore } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import type { User } from '@resala/shared';

import type { GetUserResponseDto, ListUsersParamsDto, ListUsersResponseDto } from './user.dto';

export class UserService {
  constructor(private readonly db: DataStore) {}

  private _userFields = () => {
    return {
      addresses: {
        include: {
          address: true,
        },
        where: {
          isDefault: true,
        },
      },
      orders: {
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
      },
      _count: {
        select: {
          orders: true,
        },
      },
    } satisfies Prisma.UserInclude;
  };

  private _transformUser = ({
    addresses,
    orders,
    _count,
    ...user
  }: Prisma.UserGetPayload<{
    include: ReturnType<UserService['_userFields']>;
  }>): GetUserResponseDto => {
    return {
      ...user,
      ordersCount: _count.orders,
      latestOrders: orders,
      addresses: addresses.map(({ address, isDefault }) => ({ ...address, isDefault })),
    };
  };

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

  async find(id: string): Promise<GetUserResponseDto> {
    const user = await this.db.user.findUniqueOrThrow({
      where: { id },
      include: this._userFields(),
    });

    return this._transformUser(user);
  }

  async list({ page, limit, search }: ListUsersParamsDto): Promise<ListUsersResponseDto> {
    const isNotAnonymous = { isAnonymous: null };
    const searchFilter: Prisma.UserWhereInput = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { startsWith: search, mode: 'insensitive' } },
        { phoneNumber: { startsWith: search, mode: 'insensitive' } },
      ],
      ...isNotAnonymous,
    };

    const users = await this.db.user.findMany({
      where: search ? searchFilter : isNotAnonymous,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
      include: this._userFields(),
    });

    return users.map(this._transformUser);
  }

  async count(): Promise<number> {
    return await this.db.user.count({ where: { isAnonymous: null } });
  }
}
