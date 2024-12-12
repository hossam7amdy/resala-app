import { ConflictError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { FileStorage } from '@/services/storage';
import type { Prisma } from '@prisma/client';
import type {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from '@resala/shared';

export class ProductService {
  constructor(
    private readonly db: DataStore,
    private readonly fileService: FileStorage
  ) {}

  async get(id: string): Promise<GetProductResponse['data']> {
    const avgRating = await this.db.review.aggregate({
      where: { productId: id },
      _avg: { rating: true },
    });

    const { discounts, ...product } = await this.db.product.findUniqueOrThrow({
      include: {
        category: true,
        discounts: {
          where: {
            isActive: true,
            OR: [
              { startDate: null },
              { endDate: null },
              { startDate: { lte: new Date() } },
              { endDate: { gte: new Date(new Date().toDateString()) } },
            ],
          },
        },
      },
      where: { id },
    });

    return {
      ...product,
      price: product.price.toNumber() ?? 0,
      avgRating: avgRating._avg.rating ?? 0,
      discounts: discounts.map(discount => ({
        ...discount,
        amount: discount.amount.toNumber() ?? 0,
      })),
    };
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
        include: {
          category: true,
          discounts: {
            where: {
              isActive: true,
              OR: [
                { startDate: null },
                { endDate: null },
                { startDate: { lte: new Date() } },
                { endDate: { gte: new Date(new Date().toDateString()) } },
              ],
            },
          },
        },
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
      products: products.map(({ discounts, ...product }) => ({
        ...product,
        price: product.price.toNumber() ?? 0,
        discounts: discounts.map(discount => ({
          ...discount,
          amount: discount.amount.toNumber() ?? 0,
        })),
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
  }: CreateProductRequest['body'] & { file: File }): Promise<CreateProductResponse['data']> {
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

    const newProduct = await this.db.product.create({
      data: { ...payload, categoryId, enName, arName, imageKey: key, imageUrl: url },
    });

    return {
      ...newProduct,
      price: newProduct.price.toNumber() ?? 0,
    };
  }

  async update(
    id: string,
    { file, ...product }: UpdateProductRequest['body'] & { file?: File }
  ): Promise<UpdateProductResponse['data']> {
    await this.db.category.findUniqueOrThrow({ where: { id: product.categoryId } });

    const { imageKey, imageUrl } = await this.get(id);

    let fileData = { key: imageKey, url: imageUrl };
    if (file) {
      await this.fileService.deleteFile(imageKey);

      fileData = await this.fileService.uploadFile(file);
    }

    const updatedProduct = await this.db.product.update({
      where: { id },
      data: {
        ...product,
        imageKey: fileData.key,
        imageUrl: fileData.url,
      },
    });

    return {
      ...updatedProduct,
      price: updatedProduct.price.toNumber() ?? 0,
    };
  }

  async delete(id: string): Promise<DeleteProductResponse['data']> {
    const { imageKey } = await this.get(id);

    const product = await this.db.product.delete({ where: { id } });

    await this.fileService.deleteFile(imageKey);

    return {
      ...product,
      price: product.price.toNumber() ?? 0,
    };
  }
}
