import type { PrismaClient } from '@prisma/client';

import CategoryRepository from './CategoryRepository.js';
import ColorRepository from './ColorRepository.js';
import ProductRepository from './ProductRepository.js';
import SizeRepository from './SizeRepository.js';
import StockRepository from './StockRepository.js';

export default class InventoryRepository {
  category: CategoryRepository;
  product: ProductRepository;
  stock: StockRepository;
  color: ColorRepository;
  size: SizeRepository;

  constructor(prisma: PrismaClient) {
    this.category = new CategoryRepository(prisma);
    this.product = new ProductRepository(prisma);
    this.stock = new StockRepository(prisma);
    this.color = new ColorRepository(prisma);
    this.size = new SizeRepository(prisma);
  }
}
