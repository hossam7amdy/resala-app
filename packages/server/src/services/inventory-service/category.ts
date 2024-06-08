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

  return await prisma.category.create({
    data: {
      enName: category.enName,
      arName: category.arName,
    },
  });
};

export const updateCategory = async (id: number, category: Prisma.CategoryUncheckedCreateInput) => {
  const found = await findCategoryById(id, true);
  if (!found) {
    throw new NotFoundError('Category not found');
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
    if (found.subCategories.length) {
      throw new ConflictError(`Category has subcategories`);
    }
    const parentExist = await findCategoryById(category.categoryId);
    if (!parentExist) {
      throw new NotFoundError('Parent category not found');
    }
  }

  if (id === category.categoryId) {
    throw new ConflictError('Category cannot be its own parent');
  }

  return await prisma.category.update({
    data: {
      enName: category.enName,
      arName: category.arName,
      categoryId: category.categoryId || null,
      deletedAt: category.deletedAt ? new Date() : null,
    },
    where: { id },
  });
};

export const deleteCategory = async (id: number) => {
  const found = await prisma.category.findUnique({
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

  if (!found) {
    throw new NotFoundError('Category not found');
  }
  if (found.subCategories.length) {
    throw new ConflictError(`Category has subcategories`);
  }
  if (found.products.length) {
    throw new ConflictError(`Category has products`);
  }

  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const findCategoryById = async (id: number, deleted: boolean = false) => {
  const category = await prisma.category.findUnique({
    include: {
      subCategories: true,
    },
    where: {
      id,
      deletedAt: deleted ? undefined : null,
    },
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }

  return category;
};

export const listCategories = async (deleted: boolean = false) => {
  return await prisma.category.findMany({
    include: {
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

export const listCategoryProducts = async (id: number) => {
  const category = await prisma.category.findUnique({
    include: {
      subCategories: {
        include: {
          products: {
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      },
      products: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
    },
    where: { id },
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }

  return [...category.products, ...category.subCategories.flatMap(c => c.products)];
};

const createSubCategory = async (category: Prisma.CategoryUncheckedCreateInput) => {
  const parentExist = await prisma.category.findUnique({
    where: {
      id: category.categoryId!,
      categoryId: null,
    },
  });
  if (!parentExist) {
    throw new NotFoundError('Parent category not found');
  }

  return await prisma.category.create({
    data: {
      enName: category.enName,
      arName: category.arName,
      categoryId: category.categoryId,
    },
  });
};
