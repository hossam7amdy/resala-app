import { RequestHandler } from 'express';

import { prisma } from '../../model';
import { BadRequestError, NotFoundError } from '../../utils/api-errors';

export const getCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);
  const deleted = req.query.deleted;

  const category = await prisma.category.findUnique({
    select: {
      id: true,
      arName: true,
      enName: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      subCategories: {
        select: {
          id: true,
          arName: true,
          enName: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      },
    },
    where: {
      id: categoryId,
      deletedAt: deleted ? undefined : null,
    },
  });

  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  return res.json({
    success: true,
    data: category,
  });
};

export const getCategoryList: RequestHandler = async (req, res) => {
  const deleted = req.query.deleted;

  const categories = await prisma.category.findMany({
    include: {
      subCategories: true,
    },
    where: {
      categoryId: null,
      deletedAt: deleted ? undefined : null,
    },
  });

  return res.json({
    success: true,
    data: categories,
  });
};

export const getCategoryProducts: RequestHandler = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const deleted = req.query.deleted;

  const products = await prisma.product.findMany({
    where: {
      categoryId,
      deletedAt: deleted ? undefined : null,
    },
  });

  return res.json({
    success: true,
    data: products,
  });
};

export const getSubCategories: RequestHandler = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const deleted = req.query.deleted;

  const subCategories = await prisma.category.findMany({
    where: {
      categoryId,
      deletedAt: deleted ? undefined : null,
    },
  });

  return res.json({
    success: true,
    data: subCategories,
  });
};

export const createCategory: RequestHandler = async (req, res, next) => {
  const { arName, enName, categoryId } = req.body;

  if (categoryId) {
    const parentCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!parentCategory) {
      return next(new NotFoundError('Main Category not found'));
    }
  }

  const exist = await prisma.category.findFirst({
    where: {
      OR: [{ arName }, { enName }],
    },
  });
  if (exist) {
    return next(new BadRequestError('Category already exists'));
  }

  const category = await prisma.category.create({
    data: {
      arName,
      enName,
      categoryId,
    },
  });

  return res.json({
    success: true,
    data: category,
  });
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);
  const { arName, enName } = req.body;

  const found = await prisma.category.findUnique({
    select: { id: true },
    where: {
      id: categoryId,
    },
  });
  if (!found) {
    return next(new NotFoundError('Category not found'));
  }

  const exist = await prisma.category.findFirst({
    select: { id: true },
    where: {
      OR: [{ arName }, { enName }],
    },
  });
  if (exist) {
    return next(new BadRequestError('Category already exists'));
  }

  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      arName,
      enName,
    },
  });

  return res.json({
    success: true,
    data: category,
  });
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    await prisma.category.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    return next(new NotFoundError('Category not found'));
  }

  return res.json({
    success: true,
    data: 'Category deleted',
  });
};

export const restoreCategory: RequestHandler = async (req, res, next) => {
  const categoryId = req.body.categoryId;

  try {
    await prisma.category.update({
      data: {
        deletedAt: null,
      },
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    return next(new NotFoundError('Category not found'));
  }

  return res.json({
    success: true,
    data: 'Category restored',
  });
};
