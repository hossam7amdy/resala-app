import type {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  ICategoryController,
  ListCategories,
  UpdateCategory,
} from './category.controller.interface.js';
import type { CategoryService } from './category.service.js';

export class CategoryController implements ICategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getCategory: GetCategory = async (req, res, next) => {
    try {
      const category = await this.categoryService.findCategoryById(req.params.categoryId);

      return res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  listCategories: ListCategories = async (_req, res, next) => {
    try {
      const categories = await this.categoryService.listCategories();

      return res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  };

  createCategory: CreateCategory = async (req, res, next) => {
    try {
      const category = await this.categoryService.createCategory(req.body);

      return res.status(201).json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  updateCategory: UpdateCategory = async (req, res, next) => {
    try {
      const category = await this.categoryService.updateCategory(req.params.categoryId, req.body);

      return res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };

  deleteCategory: DeleteCategory = async (req, res, next) => {
    try {
      const category = await this.categoryService.deleteCategory(req.params.categoryId);

      return res.json({ success: true, data: category });
    } catch (error) {
      next(error);
    }
  };
}
