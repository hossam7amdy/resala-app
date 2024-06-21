import type { InventoryRepository } from '../../repositories/index.js';
import CategoryService from './CategoryService.js';
import ColorService from './ColorService.js';
import ProductService from './ProductService.js';
import SizeService from './SizeService.js';
import StockService from './StockService.js';

export default class InventoryService {
  readonly category: CategoryService;
  readonly product: ProductService;
  readonly color: ColorService;
  readonly size: SizeService;
  readonly stock: StockService;

  constructor(inventoryRepo: InventoryRepository) {
    this.category = new CategoryService(inventoryRepo);
    this.product = new ProductService(inventoryRepo, this.category);
    this.color = new ColorService(inventoryRepo);
    this.size = new SizeService(inventoryRepo);
    this.stock = new StockService(inventoryRepo, this.product, this.color, this.size);
  }
}
