import type { InventoryService } from '../../services/index.js';
import type {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  GetCategoryProducts,
  ListCategories,
  UpdateCategory,
} from './ICategoryController.js';
import type ICategoryController from './ICategoryController.js';

export default class CategoryController implements ICategoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  getCategory: GetCategory = async (req, res, next) => {
    try {
      const category = await this.inventoryService.category.findCategoryById(req.params.categoryId);

      return res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  listCategories: ListCategories = async (_req, res, next) => {
    try {
      const categories = await this.inventoryService.category.listCategories();

      return res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  };

  listCategoryProducts: GetCategoryProducts = async (req, res, next) => {
    try {
      const products = await this.inventoryService.category.listCategoryProducts(
        req.params.categoryId
      );

      return res.json({ success: true, data: products });
    } catch (error) {
      next(error);
    }
  };

  createCategory: CreateCategory = async (req, res, next) => {
    try {
      const category = await this.inventoryService.category.createCategory(req.body);

      return res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  updateCategory: UpdateCategory = async (req, res, next) => {
    try {
      const category = await this.inventoryService.category.updateCategory(
        req.params.categoryId,
        req.body
      );

      return res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  deleteCategory: DeleteCategory = async (req, res, next) => {
    try {
      const category = await this.inventoryService.category.deleteCategory(req.params.categoryId);

      return res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };
}
