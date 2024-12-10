import { BadRequestError } from '@/exceptions';
import type { DataStore } from '@/lib/db';

import type {
  Address,
  CreateAddressDto,
  DeleteAddressParamsDto,
  FindAddressParamsDto,
  UpdateAddressDto,
} from './address.dto';

export class AddressService {
  private readonly maxAddressCount = 3;

  constructor(private readonly db: DataStore) {}

  async list(userId: string) {
    const addresses = await this.db.userAddress.findMany({
      select: { address: true },
      where: { userId },
      orderBy: { addressId: 'desc' },
    });

    return addresses.map(address => address.address);
  }

  async create({ userId, ...payload }: CreateAddressDto): Promise<Address> {
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

  async find(addressId: string, { userId }: FindAddressParamsDto): Promise<Address> {
    const userAddr = await this.db.userAddress.findFirstOrThrow({
      select: { address: true },
      where: { userId, addressId },
    });

    return userAddr?.address ?? null;
  }

  async update(addressId: string, payload: UpdateAddressDto) {
    return await this.db.address.update({
      data: payload,
      where: { id: addressId },
    });
  }

  async delete(addressId: string, { userId }: DeleteAddressParamsDto): Promise<Address> {
    await this.find(addressId, { userId });

    return await this.db.address.delete({ where: { id: addressId } });
  }
}
