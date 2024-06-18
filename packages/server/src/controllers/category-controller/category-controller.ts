import { inventoryService } from '../../services/index.js';
import { checkIsAdmin } from '../../utils/isAdmin.js';
import type {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  GetCategoryProducts,
  ListCategories,
  UpdateCategory,
} from './category-controller.interface.js';

export const getCategory: GetCategory = async (req, res, next) => {
  try {
    const isAdmin = checkIsAdmin(res.locals.user);
    const category = await inventoryService.findCategoryById(req.params.categoryId, isAdmin);

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const listCategories: ListCategories = async (_req, res, next) => {
  try {
    const isAdmin = checkIsAdmin(res.locals.user);
    const categories = await inventoryService.listCategories(isAdmin);

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const listCategoryProducts: GetCategoryProducts = async (req, res, next) => {
  try {
    const isAdmin = checkIsAdmin(res.locals.user);
    const products = await inventoryService.listCategoryProducts(req.params.categoryId, isAdmin);

    return res.json({
      success: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: products as any,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory: CreateCategory = async (req, res, next) => {
  try {
    const category = await inventoryService.createCategory(req.body);

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory: UpdateCategory = async (req, res, next) => {
  try {
    const category = await inventoryService.updateCategory(req.params.categoryId, req.body);

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: DeleteCategory = async (req, res, next) => {
  try {
    await inventoryService.deleteCategory(req.params.categoryId);

    return res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
