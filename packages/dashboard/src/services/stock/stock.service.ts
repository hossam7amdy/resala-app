import type { DataStore } from '@/lib/db';
import type { Prisma, Product } from '@prisma/client';
import type {
  Color,
  CreateStockRequest,
  GetStockResponse,
  Image,
  ListStocksRequest,
  ListStocksResponse,
  Size,
  Stock,
  UpdateStockRequest,
} from '@resala/shared';

type StockReturnType = Stock & {
  product: Product;
  size: Size;
  color: Color & {
    images: Image[];
  };
};

export class StockService {
  constructor(private readonly db: DataStore) {}

  async find(id: string): Promise<GetStockResponse['data']> {
    const stock = await this.db.stock.findUniqueOrThrow({
      include: {
        product: true,
        size: true,
        color: {
          include: {
            images: true,
          },
        },
      },
      where: { id },
    });

    stock.color.images = stock.color.images.filter(image => image.productId === stock.productId);
    return this.formatStock(stock);
  }

  async list({
    page = 1,
    limit = 10,
    productId,
    search = '',
  }: ListStocksRequest['query']): Promise<ListStocksResponse['data']> {
    const filters: Prisma.StockWhereInput = {
      OR: [
        { product: { arName: { contains: search, mode: 'insensitive' } } },
        { product: { enName: { contains: search, mode: 'insensitive' } } },
        { color: { arName: { contains: search, mode: 'insensitive' } } },
        { color: { enName: { contains: search, mode: 'insensitive' } } },
        { size: { name: { contains: search, mode: 'insensitive' } } },
      ],
      productId,
    };

    const [total, stocks] = await this.db.$transaction([
      this.db.stock.count({ where: filters }),
      this.db.stock.findMany({
        include: {
          product: true,
          size: true,
          color: {
            include: {
              images: true,
            },
          },
        },
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    stocks.forEach(stock => {
      stock.color.images = stock.color.images.filter(image => image.productId === stock.productId);
    });

    return {
      pagination: { page, limit, total },
      stocks: this.groupByColor(stocks),
    };
  }

  async create(stock: CreateStockRequest['body']) {
    return await this.db.stock.create({
      data: {
        productId: stock.productId,
        colorId: stock.colorId,
        sizeId: stock.sizeId,
        quantity: stock.quantity,
      },
    });
  }

  async update(id: string, stock: UpdateStockRequest['body']) {
    return await this.db.stock.update({
      where: { id },
      data: {
        productId: stock.productId,
        colorId: stock.colorId,
        sizeId: stock.sizeId,
        quantity: stock.quantity,
      },
    });
  }

  async delete(id: string) {
    return await this.db.stock.delete({ where: { id } });
  }

  private formatStock(stock: StockReturnType): GetStockResponse['data'] {
    const { color, product, size, ...stockData } = stock;
    const { images, ...colorData } = color;

    return {
      product: {
        ...product,
        price: product.price.toNumber(),
      },
      color: colorData,
      images: images.map(({ colorId: _colorId, productId: _productId, ...rest }) => ({ ...rest })),
      sizes: [
        {
          stockId: stockData.id,
          quantity: stockData.quantity,
          createdAt: stockData.createdAt,
          updatedAt: stockData.updatedAt,
          sizeId: size.id,
          size: size.name,
        },
      ],
    };
  }

  private groupByColor(stocksList: StockReturnType[]): GetStockResponse['data'][] {
    const stocks = stocksList.reduce(
      (acc, stock) => {
        const stockDataFormatted = this.formatStock(stock);

        const key = `${stockDataFormatted.product.id}-${stockDataFormatted.color.id}`;
        if (acc[key]) {
          acc[key].sizes.push(stockDataFormatted.sizes[0]);
        } else {
          acc[key] = stockDataFormatted;
        }

        return acc;
      },
      {} as Record<string, GetStockResponse['data']>
    );

    return Object.values(stocks).sort(
      (a, b) => new Date(b.sizes[0].updatedAt).getTime() - new Date(a.sizes[0].updatedAt).getTime()
    );
  }

  async decreaseQuantity(items: { stockId: string; quantity: number }[]) {
    await this.db.$transaction(
      items.map(item =>
        this.db.stock.update({
          data: {
            quantity: { decrement: item.quantity },
          },
          where: {
            id: item.stockId,
          },
        })
      )
    );
  }

  async increaseQuantity(items: { stockId: string; quantity: number }[]) {
    await this.db.$transaction(
      items.map(item =>
        this.db.stock.update({
          data: {
            quantity: { increment: item.quantity },
          },
          where: {
            id: item.stockId,
          },
        })
      )
    );
  }
}
