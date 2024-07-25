import type { PrismaClient } from '@prisma/client';
import type { Image } from '@resala/shared';

export default class ImageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createMany(images: Omit<Image, 'id'>[]) {
    return await this.prisma.image.createMany({ data: images });
  }

  async update(id: number, image: Partial<Image>) {
    return await this.prisma.image.update({
      where: { id },
      data: image,
    });
  }

  async updateMany(ids: number[], image: Partial<Image>) {
    return await this.prisma.image.updateMany({
      where: { id: { in: ids } },
      data: image,
    });
  }

  async delete(id: number): Promise<Image> {
    return await this.prisma.image.delete({ where: { id } });
  }

  async findById(id: number): Promise<Image | null> {
    return await this.prisma.image.findUnique({
      where: { id },
    });
  }

  async listByProduct(productId: number): Promise<Image[]> {
    return await this.prisma.image.findMany({
      where: { productId },
    });
  }

  async listByProductAndColor(productId: number, colorId: number): Promise<Image[]> {
    return await this.prisma.image.findMany({
      where: { productId, colorId },
    });
  }
}
