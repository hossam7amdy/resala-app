import { ConflictError } from '@/exceptions';
import type { DataStore } from '@/lib/db';

import type {
  Address,
  CreateAddressDto,
  DeleteAddressParamsDto,
  FindAddressParamsDto,
  GetAddressResponseDto,
  ListAddressResponseDto,
  UpdateAddressDto,
} from './address.dto';

export class AddressService {
  private readonly _maxAddressCount = 5;

  constructor(private readonly db: DataStore) {}

  async list(userId: string): Promise<ListAddressResponseDto> {
    const addresses = await this.db.userAddress.findMany({
      select: {
        isDefault: true,
        address: true,
      },
      where: {
        userId,
      },
      orderBy: {
        address: {
          createdAt: 'desc',
        },
      },
      take: this._maxAddressCount,
    });

    addresses.sort(a => (a.isDefault ? -1 : 1)); // Move default address to the top
    return addresses.map(({ isDefault, address }) => ({ ...address, isDefault }));
  }

  async create({ userId, isDefault, ...payload }: CreateAddressDto): Promise<Address> {
    const userAddrCount = await this.db.userAddress.count({ where: { userId } });

    if (userAddrCount >= this._maxAddressCount) {
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

  async find(addressId: string, { userId }: FindAddressParamsDto): Promise<GetAddressResponseDto> {
    const { address, isDefault } = await this.db.userAddress.findFirstOrThrow({
      select: {
        isDefault: true,
        address: true,
      },
      where: {
        userId,
        addressId,
      },
    });

    return { ...address, isDefault };
  }

  async delete(addressId: string, { userId }: DeleteAddressParamsDto): Promise<Address> {
    await this.find(addressId, { userId });

    return await this.db.address.delete({ where: { id: addressId } });
  }
}
