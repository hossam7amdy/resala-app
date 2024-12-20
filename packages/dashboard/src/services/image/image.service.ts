import type { DataStore } from '@/lib/db';
import type {
  CreateImageRequest,
  DeleteImageResponse,
  Image,
  ListImagesRequest,
} from '@resala/shared';

export class ImageService {
  constructor(private readonly db: DataStore) {}

  async find(id: string) {
    return await this.db.image.findUniqueOrThrow({ where: { id } });
  }

  async createMany({ productId, colorId, ...image }: CreateImageRequest['body']): Promise<void> {
    const productImages = await this.list({ productId, colorId });

    const colorHasPrimaryImage = productImages.some(
      img => img.colorId === colorId && img.isPrimary
    );

    await this.db.image.create({
      data: { ...image, colorId, productId, isPrimary: !colorHasPrimaryImage },
    });
  }

  async update(id: string, data: Partial<Image>): Promise<Image> {
    return await this.db.image.update({ where: { id }, data });
  }

  async updatePrimary(id: string, isPrimary: boolean = true): Promise<Image> {
    const image = await this.find(id);

    if (image.isPrimary) {
      return image;
    }

    const productImages = await this.list({ productId: image.productId, colorId: image.colorId });
    const ids = productImages.filter(img => img.id !== id).map(img => img.id);

    await this.db.$transaction([
      this.db.image.update({ where: { id }, data: { isPrimary: true } }),
      this.db.image.updateMany({ where: { id: { in: ids } }, data: { isPrimary: false } }),
    ]);

    return { ...image, isPrimary };
  }

  async delete(id: string): Promise<DeleteImageResponse['data']> {
    const image = await this.find(id);

    await this.db.image.delete({ where: { id } });

    if (image.isPrimary) {
      const [productImages] = await this.list({
        productId: image.productId,
        colorId: image.colorId,
      });

      if (productImages) {
        await this.update(productImages.id, { isPrimary: true });
      }
    }

    return image;
  }

  async list({ colorId, productId }: ListImagesRequest['query']): Promise<Image[]> {
    return await this.db.image.findMany({ where: { colorId, productId } });
  }
}
