import type { Prisma } from '@prisma/client';
import type {
  CreateProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductRequest,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import type { FileService } from '../filestorage/file.service.js';

export class ProductService {
  constructor(
    private readonly db: DataStore,
    private readonly fileService: FileService
  ) {}

  async get(id: number): Promise<GetProductResponse['data']> {
    return await this.db.product.findUniqueOrThrow({
      include: { category: true },
      where: { id },
    });
  }

  async list({
    query,
    page,
    limit,
    categoryId,
  }: ListProductsRequest['query']): Promise<ListProductsResponse['data']> {
    const filters: Prisma.ProductWhereInput = {
      OR: [
        { enName: { startsWith: query, mode: 'insensitive' } },
        { arName: { startsWith: query, mode: 'insensitive' } },
      ],
      categoryId,
    };

    const [total, products] = await this.db.$transaction([
      this.db.product.count({ where: filters }),
      this.db.product.findMany({
        include: { category: true },
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    return {
      products,
      pagination: { page, limit, total },
    };
  }

  async create(payload: CreateProductRequest['body'] & { file: Express.Multer.File }) {
    const product = {
      categoryId: payload.categoryId,
      arName: payload.arName,
      enName: payload.enName,
      arDescription: payload.arDescription,
      enDescription: payload.enDescription,
      price: payload.price,
      imageKey: '',
      imageUrl: '',
    };
    const { id } = await this.db.product.create({ data: product });

    const { key, url } = await this.fileService.uploadFile(payload.file);

    return await this.update(id, { imageKey: key, imageUrl: url } as any);
  }

  async update(
    id: number,
    { file, ...product }: UpdateProductRequest['body'] & { file?: Express.Multer.File }
  ) {
    const { imageKey } = await this.get(id);

    if (file) {
      await this.fileService.deleteFile(imageKey);

      const { key, url } = await this.fileService.uploadFile(file);

      product = { ...product, imageKey: key, imageUrl: url } as any;
    }

    return await this.db.product.update({ where: { id }, data: product });
  }

  async delete(id: number) {
    const { imageKey } = await this.get(id);

    const [product] = await Promise.all([
      this.db.product.delete({ where: { id } }),
      this.fileService.deleteFile(imageKey),
    ]);

    return product;
  }
}
