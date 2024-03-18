import { RequestHandler } from 'express';

import { inventoryService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';

export const getCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    if (isNaN(categoryId)) {
      throw new BadRequestError('Category id must be a number');
    }

    const category = await inventoryService.findCategoryById(categoryId);

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    return next(error);
  }
};

export const listCategories: RequestHandler = async (req, res, next) => {
  const deleted = req.query.deleted;

  try {
    const categories = await inventoryService.listRootCategories(Boolean(deleted));

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const listSubCategories: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    if (isNaN(categoryId)) {
      throw new BadRequestError('Category id must be a number');
    }

    const subCategories = await inventoryService.listSubcategories(categoryId);

    return res.json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    next(error);
  }
};

export const listCategoryProducts: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    const products = await inventoryService.listCategoryProducts(categoryId);

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await inventoryService.createRootCategory({
      arName: req.body.arName,
      enName: req.body.enName,
    });

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubcategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);
  const { arName, enName } = req.body;

  try {
    if (isNaN(categoryId)) {
      throw new BadRequestError('Category id must be a number');
    }

    const subCategory = await inventoryService.createSubcategory(categoryId, {
      arName,
      enName,
    });

    return res.status(201).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    if (isNaN(categoryId)) {
      throw new BadRequestError('Category id must be a number');
    }

    const category = await inventoryService.updateCategory(categoryId, req.body);

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    await inventoryService.deleteCategory(categoryId);

    return res.json({
      success: true,
      data: 'Category deleted',
    });
  } catch (error) {
    return next(error);
  }
};
