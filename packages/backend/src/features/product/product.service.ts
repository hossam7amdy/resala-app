import { ConflictError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import type { Image } from '@resala/shared';

import type {
  CreateProductRequestDto,
  CreateProductResponseDto,
  DeleteProductResponseDto,
  GetProductResponseDto,
  ListProductsRequestDto,
  ListProductsResponseDto,
  ProductStocksDto,
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from './product.dto';

export class ProductService {
  constructor(private readonly db: DataStore) {}

  private _productFields(id?: string) {
    const now = new Date();
    return {
      images: {
        where: {
          productId: id,
        },
      },
      categories: {
        take: 1,
      },
      discounts: {
        where: {
          isActive: true,
          OR: [
            { startDate: null },
            { endDate: null },
            { startDate: { lte: now } },
            { endDate: { gte: now } },
          ],
        },
      },
      stocks: {
        include: {
          color: true,
          size: true,
        },
      },
    } satisfies Prisma.ProductInclude;
  }

  private _groupProductStocksByColor(stocks: ProductStocksDto) {
    const groupedStocks = stocks.reduce(
      (acc, stock) => {
        const colorId = stock.color.id;
        if (!acc[colorId]) {
          acc[colorId] = [];
        }
        acc[colorId].push(stock);
        return acc;
      },
      {} as Record<string, typeof stocks>
    );

    return Object.values(groupedStocks);
  }

  private _formatGroupedStocksByColor(
    groupedStocks: ProductStocksDto[],
    productImages: (Image & { imageUrl: string })[]
  ) {
    return groupedStocks.map(stocks => ({
      color: stocks[0].color,
      images: productImages.filter(image => image.colorId === stocks[0].color.id),
      sizes: stocks.map(stock => ({
        id: stock.id,
        size: stock.size.name,
        quantity: stock.quantity,
        createdAt: stock.createdAt,
        updatedAt: stock.updatedAt,
        stockId: stock.id,
        sizeId: stock.size.id,
      })),
    }));
  }

  async get(id: string): Promise<GetProductResponseDto> {
    const avgRating = await this.db.review.aggregate({
      where: { productId: id },
      _avg: { rating: true },
    });

    const { stocks, categories, images, ...product } = await this.db.product.findUniqueOrThrow({
      include: this._productFields(id),
      where: { id },
    });

    // group by color
    const groupedStocks = this._groupProductStocksByColor(stocks);
    const formatStocks = this._formatGroupedStocksByColor(groupedStocks, images);

    return {
      ...product,
      category: categories[0],
      avgRating: avgRating._avg.rating ?? 0,
      stocks: formatStocks,
    };
  }

  async list({
    search = '',
    page,
    limit,
    categoryId,
  }: ListProductsRequestDto): Promise<ListProductsResponseDto> {
    const filters: Prisma.ProductWhereInput = {
      OR: [
        { enName: { contains: search, mode: 'insensitive' } },
        { arName: { contains: search, mode: 'insensitive' } },
      ],
      categories: {
        some: { id: categoryId },
      },
    };

    const [total, products] = await this.db.$transaction([
      this.db.product.count({ where: filters }),
      this.db.product.findMany({
        include: this._productFields(),
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
      products: products.map(({ stocks, images, categories, ...product }) => ({
        ...product,
        category: categories[0],
        stocks: this._formatGroupedStocksByColor(this._groupProductStocksByColor(stocks), images),
        avgRating: avgRatings.find(rating => rating.productId === product.id)?._avg.rating ?? 0,
      })),
    };
  }

  async create({
    categoryIds,
    images,
    stocks,
    ...payload
  }: CreateProductRequestDto): Promise<CreateProductResponseDto> {
    return await this.db.product.create({
      data: {
        ...payload,
        images: { create: images },
        stocks: { create: stocks },
        categories: { connect: categoryIds.map(id => ({ id })) },
      },
    });
  }

  async update(
    id: string,
    { images, stocks, categoryIds, ...product }: UpdateProductRequestDto
  ): Promise<UpdateProductResponseDto> {
    return await this.db.product.update({
      where: { id },
      data: {
        ...product,
        categories: { set: categoryIds?.map(id => ({ id })) },
        images: {
          upsert: images?.map(image => ({
            where: {
              productId_colorId_mediaId: {
                productId: id,
                colorId: image.colorId,
                mediaId: image.mediaId,
              },
            },
            create: image,
            update: image,
          })),
        },
        stocks: {
          upsert: stocks?.map(stock => ({
            where: {
              stock_unique_constraint: {
                productId: id,
                colorId: stock.colorId,
                sizeId: stock.sizeId,
              },
            },
            create: stock,
            update: stock,
          })),
        },
      },
    });
  }

  async delete(id: string): Promise<DeleteProductResponseDto> {
    const order = await this.db.orderItem.findFirst({
      where: { productId: id },
    });
    if (order) {
      throw new ConflictError('Cannot delete product that is associated with an order');
    }

    return await this.db.product.delete({ where: { id } });
  }
}
