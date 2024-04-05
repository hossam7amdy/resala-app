import { CategorySchema } from '@resala/shared';
import { RequestHandler } from 'express';

import { inventoryService } from '../../service';
import { schemaValidator } from '../../utils/schema-validator';

export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const params = await schemaValidator(CategorySchema.pick({ id: true }), {
      id: req.params.categoryId,
    });

    const category = await inventoryService.findCategoryById(params.id);

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const listCategories: RequestHandler = async (req, res, next) => {
  const deleted = Boolean(req.query.deleted);

  try {
    const categories = await inventoryService.listCategories(deleted);

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const listCategoryProducts: RequestHandler = async (req, res, next) => {
  try {
    const params = await schemaValidator(CategorySchema.pick({ id: true }), {
      id: req.params.categoryId,
    });

    const products = await inventoryService.listCategoryProducts(params.id);

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const payload = await schemaValidator(CategorySchema, req.body);

    const category = await inventoryService.createCategory(payload);

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const payload = await schemaValidator(CategorySchema, { ...req.body, ...req.params });

    const category = await inventoryService.updateCategory(payload.categoryId, payload);

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const params = await schemaValidator(CategorySchema.pick({ id: true }), {
      id: req.params.categoryId,
    });

    await inventoryService.deleteCategory(params.id);

    return res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
