import type { InventoryRepository } from '../../repositories/index.js';
import CategoryService from './CategoryService.js';
import ColorService from './ColorService.js';
import ProductService from './ProductService.js';
import SizeService from './SizeService.js';
import StockService from './StockService.js';

export default class InventoryService {
  readonly productService: ProductService;
  readonly colorService: ColorService;
  readonly sizeService: SizeService;
  readonly stockService: StockService;
  readonly categoryService: CategoryService;

  constructor(inventoryRepo: InventoryRepository) {
    this.categoryService = new CategoryService(inventoryRepo);
    this.productService = new ProductService(inventoryRepo, this.categoryService);
    this.colorService = new ColorService(inventoryRepo);
    this.sizeService = new SizeService(inventoryRepo);
    this.stockService = new StockService(
      inventoryRepo,
      this.productService,
      this.colorService,
      this.sizeService
    );
  }
}
