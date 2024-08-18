import type { Prisma } from '@prisma/client';
import type {
  CreateAddressRequest,
  DefaultFilters,
  UpdateAddressRequest,
  UpdateUserRequest,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';

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
  private readonly maxAddressCount = 3;

  constructor(private readonly db: DataStore) {}

  async update(id: number, payload: Partial<UpdateUserRequest['body']>) {
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

  async list({ page, limit, query }: DefaultFilters) {
    const first = query?.split(' ')[0];
    let last = query?.split(' ')[1];
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

  async listAddress(userId: number) {
    const addresses = await this.db.userAddress.findMany({
      select: { address: true },
      where: { userId },
      orderBy: { addressId: 'desc' },
    });

    return addresses.map(address => address.address);
  }

  async createAddress({ userId, ...payload }: CreateAddressRequest['body']) {
    const userAddrCount = await this.db.userAddress.count({ where: { userId } });

    if (userAddrCount >= this.maxAddressCount) {
      throw new BadRequestError('You have reached the maximum number of addresses allowed');
    }

    return await this.db.$transaction(async trx => {
      const newAddress = await trx.address.create({ data: payload });

      await trx.userAddress.create({ data: { userId, addressId: newAddress.id } });

      return newAddress;
    });
  }

  async findAddress(userId: number, addressId: number) {
    const userAddr = await this.db.userAddress.findFirstOrThrow({
      select: { address: true },
      where: { userId, addressId },
    });

    return userAddr?.address ?? null;
  }

  async updateAddress(addressId: number, { userId: _, ...payload }: UpdateAddressRequest['body']) {
    return await this.db.address.update({
      data: payload,
      where: { id: addressId },
    });
  }

  async deleteAddress(addressId: number) {
    return await this.db.address.delete({ where: { id: addressId } });
  }
}
