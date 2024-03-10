import { Prisma } from '@prisma/client';
import { RequestHandler } from 'express';

import { BadRequestError, NotFoundError } from '../../lib/error';
import { logger } from '../../lib/logger';
import { prisma } from '../../model';

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

  let category;
  try {
    category = await prisma.category.create({
      data: {
        arName,
        enName,
        categoryId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.warn(error);
      return next(new BadRequestError('Category creation failed'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    data: category,
  });
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  const categoryId = parseInt(req.params.categoryId);
  const { arName, enName } = req.body;

  let category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  try {
    category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        arName,
        enName,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      next(new BadRequestError('Category update failed'));
    }
    return next(error);
  }

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
