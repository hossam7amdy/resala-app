import type {
  CreateStockRequest,
  DefaultFilters,
  GetProductStocksResponse,
  GetStockResponse,
  GetStocksListResponse,
  UpdateStockRequest,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { ConflictError, NotFoundError } from '../../utils/ApiErrors.js';
import type { PromiseReturnType } from '../../utils/PromiseReturnType.js';
import type ColorService from './ColorService.js';
import type ProductService from './ProductService.js';
import type SizeService from './SizeService.js';

export default class StockService {
  constructor(
    private readonly inventoryRepo: InventoryRepository,
    private readonly product: ProductService,
    private readonly color: ColorService,
    private readonly size: SizeService
  ) {}

  async findById(stockId: number): Promise<GetStockResponse['data']> {
    const stock = await this.inventoryRepo.stock.findById(stockId);

    if (!stock) {
      throw new NotFoundError('Stock not found');
    }

    return this._formatStock(stock);
  }

  async list(filters: DefaultFilters): Promise<GetStocksListResponse['data']> {
    const { total, stocks } = await this.inventoryRepo.stock.list(filters);

    return {
      pagination: { page: filters.page, limit: filters.limit, total },
      stocks: this._groupByColor(stocks),
    };
  }

  async getByProduct(productId: number): Promise<GetProductStocksResponse['data']> {
    await this.product.findProductById(productId);

    const stocks = await this.inventoryRepo.stock.findByProduct(productId);

    return this._groupByColor(stocks);
  }

  async create(stock: CreateStockRequest['body']) {
    await Promise.all([
      this.product.findProductById(stock.productId),
      this.color.findColorById(stock.colorId),
      this.size.findSizeById(stock.sizeId),
    ]);

    try {
      return await this.inventoryRepo.stock.create({
        productId: stock.productId,
        colorId: stock.colorId,
        sizeId: stock.sizeId,
        quantity: stock.quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (e) {
      throw new ConflictError('Stock already exists');
    }
  }

  async update(stockId: number, stock: UpdateStockRequest['body']) {
    await Promise.all([
      this.product.findProductById(stock.productId),
      this.color.findColorById(stock.colorId),
      this.size.findSizeById(stock.sizeId),
      this.findById(stockId),
    ]);

    try {
      return await this.inventoryRepo.stock.update(stockId, {
        productId: stock.productId,
        colorId: stock.colorId,
        sizeId: stock.sizeId,
        quantity: stock.quantity,
        updatedAt: new Date(),
      });
    } catch (e) {
      throw new ConflictError('Stock already exists');
    }
  }

  async delete(stockId: number) {
    await this.findById(stockId);
    return await this.inventoryRepo.stock.delete(stockId);
  }

  _formatStock(stock: PromiseReturnType<typeof this.inventoryRepo.stock.list>['stocks'][0]) {
    const { color, ...stockData } = stock;
    const { images, ...colorData } = color;

    return {
      ...stockData,
      color: colorData,
      images,
    };
  }

  _groupByColor(
    stocks: PromiseReturnType<typeof this.inventoryRepo.stock.list>['stocks']
  ): GetStocksListResponse['data']['stocks'] {
    const stocksByColor: Record<number, GetStocksListResponse['data']['stocks'][0]> = {};

    stocks.forEach(stock => {
      if (!stocksByColor[stock.color.id]) {
        const { size, color: stockColor, ...rest } = stock;
        const { images, ...color } = stockColor;

        stocksByColor[stock.color.id] = {
          ...rest,
          color,
          images,
          sizes: [size],
        };
      } else {
        const { sizes } = stocksByColor[stock.color.id];
        const sizeExist = sizes.some(size => size.id === stock.size.id);

        if (!sizeExist) {
          stocksByColor[stock.color.id].sizes.push(stock.size);
        }
      }
    });

    return Object.values(stocksByColor);
  }
}
