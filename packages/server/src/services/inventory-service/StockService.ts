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

type StockReturnType = PromiseReturnType<InventoryRepository['stock']['list']>['stocks'][0];

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { category, ...product } = await this.product.findProductById(productId);

    const stocks = await this.inventoryRepo.stock.findByProduct(productId);

    return this._groupByColor(stocks.map(stock => ({ ...stock, product })));
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

  private _formatStock(stock: StockReturnType): GetStockResponse['data'] {
    const { color, product, size, ...stockData } = stock;
    const { images, ...colorData } = color;

    return {
      product,
      color: colorData,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      images: images.map(({ colorId, productId, ...rest }) => ({ ...rest })),
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

  private _groupByColor(stocksList: StockReturnType[]): GetStockResponse['data'][] {
    const stocks = stocksList.reduce(
      (acc, stock) => {
        const stockDataFormatted = this._formatStock(stock);

        if (acc[stock.productId]) {
          acc[stock.productId].sizes.push(stockDataFormatted.sizes[0]);
        } else {
          acc[stock.productId] = stockDataFormatted;
        }

        return acc;
      },
      {} as Record<number, GetStockResponse['data']>
    );

    return Object.values(stocks);
  }
}
