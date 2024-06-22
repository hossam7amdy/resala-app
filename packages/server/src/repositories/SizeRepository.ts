import type { PrismaClient } from '@prisma/client';
import type { Size } from '@resala/shared';

export default class SizeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<Size, 'id'>) {
    return await this.prisma.size.create({ data });
  }

  async list() {
    return await this.prisma.size.findMany();
  }

  async find(name: string) {
    return await this.prisma.size.findFirst({ where: { name } });
  }

  async findById(id: number) {
    return await this.prisma.size.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Size>) {
    return await this.prisma.size.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.size.delete({ where: { id } });
  }
}
