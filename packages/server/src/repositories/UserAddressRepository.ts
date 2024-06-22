import type { PrismaClient } from '@prisma/client';
import type { Address } from '@resala/shared';

export default class UserAddressRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(userId: number, address: Omit<Address, 'id'>): Promise<Address> {
    return await this.prisma.$transaction(async prisma => {
      const newAddress = await prisma.address.create({ data: address });
      await prisma.userAddress.create({ data: { userId, addressId: newAddress.id } });
      return newAddress;
    });
  }

  async update(id: number, address: Partial<Address>): Promise<Address> {
    return await this.prisma.address.update({
      data: address,
      where: { id },
    });
  }

  async delete(id: number) {
    return await this.prisma.address.delete({
      where: { id },
    });
  }

  async list(userId: number): Promise<Address[]> {
    const addresses = await this.prisma.userAddress.findMany({
      select: { address: true },
      where: { userId },
      orderBy: { addressId: 'desc' },
    });

    return addresses.map(address => address.address);
  }

  async find(userId: number, addressId: number): Promise<Address | null> {
    const userAddr = await this.prisma.userAddress.findFirst({
      select: { address: true },
      where: { userId, addressId },
    });

    return userAddr?.address ?? null;
  }
}
