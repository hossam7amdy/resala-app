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

  private _productFields() {
    return {
      images: true,
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

  private _formatGroupedStocksByColor(groupedStocks: ProductStocksDto[], productImages: Image[]) {
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

    const { stocks, images, ...product } = await this.db.product.findUniqueOrThrow({
      include: this._productFields(),
      where: { id },
    });

    // group by color
    const groupedStocks = this._groupProductStocksByColor(stocks);
    const formatStocks = this._formatGroupedStocksByColor(groupedStocks, images);

    return {
      ...product,
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
      categoryId,
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
      products: products.map(({ stocks, images, ...product }) => ({
        ...product,
        stocks: this._formatGroupedStocksByColor(this._groupProductStocksByColor(stocks), images),
        avgRating: avgRatings.find(rating => rating.productId === product.id)?._avg.rating ?? 0,
      })),
    };
  }

  async create({
    categoryId,
    images,
    stocks,
    ...payload
  }: CreateProductRequestDto): Promise<CreateProductResponseDto> {
    await this.db.category.findUniqueOrThrow({ where: { id: categoryId } });

    return await this.db.product.create({
      data: {
        ...payload,
        categoryId,
        images: { create: images },
        stocks: { create: stocks },
      },
    });
  }

  async update(
    id: string,
    { images, stocks, ...product }: UpdateProductRequestDto
  ): Promise<UpdateProductResponseDto> {
    await this.db.category.findUniqueOrThrow({ where: { id: product.categoryId } });

    return await this.db.product.update({
      where: { id },
      data: {
        ...product,
        images: {
          deleteMany: { productId: id },
          create: images,
        },
        stocks: {
          deleteMany: { productId: id },
          create: stocks,
        },
      },
    });
  }

  async delete(id: string): Promise<DeleteProductResponseDto> {
    return await this.db.product.delete({ where: { id } });
  }
}
