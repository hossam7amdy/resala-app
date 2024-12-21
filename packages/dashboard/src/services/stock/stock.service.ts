import { ConflictError } from '@/exceptions';
import type { DataStore } from '@/lib/db';
import type { Prisma } from '@prisma/client';

import type {
  GetStockResponseDto,
  ListStocksRequestDto,
  ListStocksResponseDto,
  UpdateStocksQuantityRequestDto,
} from './stock.dto';

export class StockService {
  constructor(private readonly db: DataStore) {}

  private _stockFields() {
    return {
      color: {
        include: {
          images: {
            where: { isPrimary: true },
          },
        },
      },
      size: true,
      product: true,
    } satisfies Prisma.StockInclude;
  }

  private _transformStock({
    size,
    product,
    color: { images, ...color },
    ...stock
  }: Prisma.StockGetPayload<{
    include: ReturnType<StockService['_stockFields']>;
  }>) {
    return {
      ...stock,
      image: images.at(0),
      size,
      product,
      color,
    };
  }

  async find(id: string): Promise<GetStockResponseDto> {
    const stock = await this.db.stock.findUniqueOrThrow({
      include: this._stockFields(),
      where: { id },
    });

    return this._transformStock(stock);
  }

  async list({
    page = 1,
    limit = 10,
    productId,
    search = '',
  }: ListStocksRequestDto): Promise<ListStocksResponseDto> {
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

    const stocks = await this.db.stock.findMany({
      include: this._stockFields(),
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return stocks.map(this._transformStock);
  }

  async delete(id: string) {
    const order = await this.db.orderItem.findFirst({
      where: { stockId: id },
    });
    if (order) {
      throw new ConflictError('Cannot delete stock that is associated with an order');
    }

    return await this.db.stock.delete({ where: { id } });
  }

  async count() {
    return await this.db.stock.count();
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

  async updateStocksQuantity(stocks: UpdateStocksQuantityRequestDto) {
    await this.db.$transaction(
      stocks.map(({ id, quantity }) =>
        this.db.stock.update({
          data: { quantity },
          where: { id },
        })
      )
    );
  }
}
