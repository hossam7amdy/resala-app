import type { CreateAddressRequest, UpdateAddressRequest } from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { BadRequestError } from '../../errors/api.errors.js';

export class AddressService {
  private readonly maxAddressCount = 3;

  constructor(private readonly db: DataStore) {}

  async list(userId: number) {
    const addresses = await this.db.userAddress.findMany({
      select: { address: true },
      where: { userId },
      orderBy: { addressId: 'desc' },
    });

    return addresses.map(address => address.address);
  }

  async create({ userId, ...payload }: CreateAddressRequest['body']) {
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

  async find(userId: number, addressId: number) {
    const userAddr = await this.db.userAddress.findFirstOrThrow({
      select: { address: true },
      where: { userId, addressId },
    });

    return userAddr?.address ?? null;
  }

  async update(addressId: number, { userId: _, ...payload }: UpdateAddressRequest['body']) {
    return await this.db.address.update({
      data: payload,
      where: { id: addressId },
    });
  }

  async delete(addressId: number, userId: number) {
    await this.find(userId, addressId);

    return await this.db.address.delete({ where: { id: addressId } });
  }
}
