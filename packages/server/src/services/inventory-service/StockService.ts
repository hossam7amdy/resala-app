import type {
  CreateStockRequest,
  DefaultFilters,
  GetProductStocksResponse,
  GetStockResponse,
  GetStocksListResponse,
  UpdateStockRequest,
} from '@resala/shared';

import type { InventoryRepository } from '../../repositories/index.js';
import { NotFoundError } from '../../utils/ApiErrors.js';
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

    return stock;
  }

  async list(filters: DefaultFilters): Promise<GetStocksListResponse['data']> {
    const { total, stocks } = await this.inventoryRepo.stock.list(filters);

    return {
      pagination: { page: filters.page, limit: filters.limit, total },
      stocks,
    };
  }

  async getByProduct(productId: number): Promise<GetProductStocksResponse['data']> {
    await this.product.findProductById(productId);

    return await this.inventoryRepo.stock.findByProduct(productId);
  }

  async create(stock: CreateStockRequest['body']) {
    await Promise.all([
      this.product.findProductById(stock.productId),
      this.color.findColorById(stock.colorId),
      this.size.findSizeById(stock.sizeId),
    ]);

    return await this.inventoryRepo.stock.create({
      productId: stock.productId,
      colorId: stock.colorId,
      sizeId: stock.sizeId,
      quantity: stock.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(stockId: number, stock: UpdateStockRequest['body']) {
    await Promise.all([
      this.product.findProductById(stock.productId),
      this.color.findColorById(stock.colorId),
      this.size.findSizeById(stock.sizeId),
      this.findById(stockId),
    ]);

    return await this.inventoryRepo.stock.update(stockId, {
      productId: stock.productId,
      colorId: stock.colorId,
      sizeId: stock.sizeId,
      quantity: stock.quantity,
      updatedAt: new Date(),
    });
  }

  async delete(stockId: number) {
    await this.findById(stockId);
    return await this.inventoryRepo.stock.delete(stockId);
  }
}
