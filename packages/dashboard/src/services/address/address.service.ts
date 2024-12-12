import { ConflictError } from '@/exceptions';
import type { DataStore } from '@/lib/db';

import type {
  Address,
  CreateAddressDto,
  DeleteAddressParamsDto,
  FindAddressParamsDto,
  UpdateAddressDto,
} from './address.dto';

export class AddressService {
  private readonly maxAddressCount = 5;

  constructor(private readonly db: DataStore) {}

  async list(userId: string) {
    const addresses = await this.db.userAddress.findMany({
      select: {
        address: true,
      },
      where: {
        userId,
        isDefault: true,
      },
      orderBy: {
        address: {
          createdAt: 'desc',
        },
      },
      take: this.maxAddressCount,
    });

    return addresses.map(address => address.address);
  }

  async create({ userId, isDefault, ...payload }: CreateAddressDto): Promise<Address> {
    const userAddrCount = await this.db.userAddress.count({ where: { userId } });

    if (userAddrCount >= this.maxAddressCount) {
      throw new ConflictError('You have reached the maximum number of addresses allowed');
    }

    isDefault = userAddrCount === 0 || isDefault;
    return await this.db.address.create({
      data: {
        ...payload,
        userAddress: {
          create: { userId, isDefault },
        },
      },
    });
  }

  async update(addressId: string, { userId, isDefault, ...payload }: UpdateAddressDto) {
    return await this.db.address.update({
      data: {
        ...payload,
        userAddress: {
          update: {
            where: { userId },
            data: { isDefault },
          },
        },
      },
      where: { id: addressId },
    });
  }

  async find(addressId: string, { userId }: FindAddressParamsDto): Promise<Address> {
    const userAddr = await this.db.userAddress.findFirstOrThrow({
      select: { address: true },
      where: { userId, addressId },
    });

    return userAddr?.address ?? null;
  }

  async delete(addressId: string, { userId }: DeleteAddressParamsDto): Promise<Address> {
    await this.find(addressId, { userId });

    return await this.db.address.delete({ where: { id: addressId } });
  }
}
