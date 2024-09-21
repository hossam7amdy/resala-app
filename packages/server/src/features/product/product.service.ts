import type { Prisma } from '@prisma/client';
import type {
  CreateProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  Product,
  UpdateProductRequest,
} from '@resala/shared';

import type { DataStore } from '../../datastore/index.js';
import { ConflictError } from '../../errors/api.errors.js';
import type { FileService } from '../filestorage/file.service.js';

export class ProductService {
  constructor(
    private readonly db: DataStore,
    private readonly fileService: FileService
  ) {}

  async get(id: number): Promise<GetProductResponse['data']> {
    const avgRating = await this.db.review.aggregate({
      where: { productId: id },
      _avg: { rating: true },
    });

    const product = await this.db.product.findUniqueOrThrow({
      include: { category: true },
      where: { id },
    });

    return { ...product, avgRating: avgRating._avg.rating ?? 0 };
  }

  async list({
    search = '',
    page = 1,
    limit = 10,
    categoryId,
  }: ListProductsRequest['query']): Promise<ListProductsResponse['data']> {
    const filters: Prisma.ProductWhereInput = {
      OR: [
        { enName: { contains: search, mode: 'insensitive' } },
        { arName: { contains: search, mode: 'insensitive' } },
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
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const avgRatings = await this.db.review.groupBy({
      by: ['productId'],
      _avg: { rating: true },
      where: { productId: { in: products.map(product => product.id) } },
    });

    return {
      pagination: { page, limit, total },
      products: products.map(product => ({
        ...product,
        avgRating: avgRatings.find(rating => rating.productId === product.id)?._avg.rating ?? 0,
      })),
    };
  }

  async create({
    categoryId,
    enName,
    arName,
    file,
    ...payload
  }: CreateProductRequest['body'] & { file: Express.Multer.File }) {
    await this.db.category.findUniqueOrThrow({ where: { id: categoryId } });

    const product = await this.db.product.findFirst({
      where: {
        OR: [{ enName }, { arName }],
      },
    });

    if (product) {
      throw new ConflictError('Product already exists');
    }

    await this.db.category.findUniqueOrThrow({ where: { id: categoryId } });

    const { key, url } = await this.fileService.uploadFile(file);

    return await this.db.product.create({
      data: { ...payload, categoryId, enName, arName, imageKey: key, imageUrl: url },
    });
  }

  async update(
    id: number,
    { file, ...product }: UpdateProductRequest['body'] & { file?: Express.Multer.File }
  ) {
    await this.db.category.findUniqueOrThrow({ where: { id: product.categoryId } });

    const { imageKey } = await this.get(id);

    if (file) {
      await this.fileService.deleteFile(imageKey);

      const { key, url } = await this.fileService.uploadFile(file);

      product = { ...product, imageKey: key, imageUrl: url } as Product;
    }

    return await this.db.product.update({ where: { id }, data: product });
  }

  async delete(id: number) {
    const { imageKey } = await this.get(id);

    const product = await this.db.product.delete({ where: { id } });

    await this.fileService.deleteFile(imageKey);

    return product;
  }
}
