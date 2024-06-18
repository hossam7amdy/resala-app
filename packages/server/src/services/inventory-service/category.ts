import type { Prisma } from '@prisma/client';

import prisma from '../../lib/prisma/index.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';

export const createCategory = async (category: Prisma.CategoryUncheckedCreateInput) => {
  const exist = await prisma.category.findFirst({
    where: {
      OR: [{ arName: category.arName }, { enName: category.enName }],
    },
  });
  if (exist) {
    throw new ConflictError('Category already exists');
  }

  if (category.categoryId) {
    return await createSubCategory(category);
  }

  const { id } = await prisma.category.create({
    data: {
      enName: category.enName,
      arName: category.arName,
    },
  });

  return await findCategoryById(id);
};

export const updateCategory = async (id: number, category: Prisma.CategoryUncheckedCreateInput) => {
  const oldCategory = await findCategoryById(id, true);
  if (!oldCategory) {
    throw new NotFoundError('Category not oldCategory');
  }

  const exist = await prisma.category.findFirst({
    where: {
      OR: [{ arName: category.arName }, { enName: category.enName }],
      AND: { NOT: { id } },
    },
  });
  if (exist) {
    throw new ConflictError('Category already exists');
  }

  if (category.categoryId) {
    if (oldCategory.subCategories.length) {
      throw new ConflictError(`Category has subcategories`);
    }
    const parentExist = await findCategoryById(category.categoryId);
    if (!parentExist) {
      throw new NotFoundError('Parent category not oldCategory');
    }
  }

  if (id === category.categoryId) {
    throw new ConflictError('Category cannot be its own parent');
  }

  const updatedCategory = await prisma.category.update({
    data: {
      enName: category.enName,
      arName: category.arName,
      categoryId: category.categoryId || null,
      deletedAt: category.deletedAt ? new Date() : null,
    },
    where: { id },
  });

  return { ...oldCategory, ...updatedCategory };
};

export const deleteCategory = async (id: number) => {
  const oldCategory = await prisma.category.findUnique({
    select: {
      subCategories: {
        take: 1,
      },
      products: {
        take: 1,
      },
    },
    where: {
      id,
    },
  });

  if (!oldCategory) {
    throw new NotFoundError('Category not oldCategory');
  }
  if (oldCategory.subCategories.length) {
    throw new ConflictError(`Category has subcategories`);
  }
  if (oldCategory.products.length) {
    throw new ConflictError(`Category has products`);
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const findCategoryById = async (id: number, deleted: boolean = false) => {
  const category = await prisma.category.findUnique({
    include: {
      mainCategory: true,
      subCategories: true,
    },
    where: {
      id,
      deletedAt: deleted ? undefined : null,
    },
  });
  if (!category) {
    throw new NotFoundError('Category not oldCategory');
  }

  return category;
};

export const listCategories = async (deleted: boolean = false) => {
  return await prisma.category.findMany({
    include: {
      mainCategory: true,
      subCategories: true,
    },
    where: {
      categoryId: null,
      deletedAt: deleted ? undefined : null,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const listCategoryProducts = async (categoryId: number, deleted: boolean = false) => {
  await findCategoryById(categoryId, deleted);

  return await prisma.product.findMany({
    include: {
      category: true,
      images: true,
    },
    where: {
      categoryId,
      category: {
        deletedAt: deleted ? undefined : null,
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

const createSubCategory = async (category: Prisma.CategoryUncheckedCreateInput) => {
  const parentExist = await prisma.category.findUnique({
    where: {
      id: category.categoryId!,
      categoryId: null,
    },
  });
  if (!parentExist) {
    throw new NotFoundError('Parent category not oldCategory');
  }

  const { id } = await prisma.category.create({
    data: {
      enName: category.enName,
      arName: category.arName,
      categoryId: category.categoryId,
    },
  });

  return await findCategoryById(id);
};
