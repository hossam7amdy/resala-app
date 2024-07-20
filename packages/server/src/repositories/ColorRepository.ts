import type { PrismaClient } from '@prisma/client';
import type { Color } from '@resala/shared';

export default class ColorRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Omit<Color, 'id'>) {
    return await this.prisma.color.create({ data });
  }

  async list() {
    return await this.prisma.color.findMany();
  }

  async find(data: Partial<Color>) {
    return await this.prisma.color.findFirst({ where: data });
  }

  async findById(id: number) {
    return await this.prisma.color.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Color>) {
    return await this.prisma.color.update({ where: { id }, data });
  }

  async delete(id: number) {
    return await this.prisma.color.delete({ where: { id } });
  }
}
