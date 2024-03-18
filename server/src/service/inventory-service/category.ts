import { Prisma } from '@prisma/client';

import { prisma } from '../../model';
import { ConflictError, NotFoundError } from '../../utils/api-errors';

export const findCategoryById = async (id: number, deleted: boolean = true) => {
  const category = await prisma.category.findUnique({
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

export const listRootCategories = async (deleted: boolean = false) => {
  const categories = await prisma.category.findMany({
    where: {
      categoryId: null,
      deletedAt: deleted ? undefined : null,
    },
  });

  return categories;
};

export const listCategoryProducts = async (id: number) => {
  const category = await prisma.category.findUnique({
    include: {
      subCategories: {
        include: {
          products: true,
        },
      },
      products: true,
    },
    where: {
      id,
    },
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }

  return [...category.products, ...category.subCategories.flatMap(c => c.products)];
};

export const listSubcategories = async (parentId: number, deleted: boolean = false) => {
  const subcategory = await prisma.category.findMany({
    where: {
      categoryId: parentId,
      deletedAt: deleted ? undefined : null,
    },
  });

  if (!subcategory) {
    throw new NotFoundError('category not found');
  }

  return subcategory;
};

export const createRootCategory = async (category: Prisma.CategoryCreateInput) => {
  const exist = await findCategoryByName(category.enName, category.arName);
  if (exist) {
    throw new ConflictError('Category already exists');
  }

  const newCategory = await prisma.category.create({
    data: category,
  });

  return newCategory;
};

export const createSubcategory = async (
  parentId: number,
  subcategory: Prisma.CategoryCreateInput
) => {
  const parent = await prisma.category.findUnique({
    where: {
      id: parentId,
      categoryId: null, // only parent categories can have subcategories
    },
  });
  if (!parent) {
    throw new NotFoundError('parent category not found');
  }

  const exist = await findCategoryByName(subcategory.enName, subcategory.arName);
  if (exist) {
    throw new ConflictError('category already exists');
  }

  const newSubcategory = await prisma.category.create({
    data: {
      categoryId: parentId,
      arName: subcategory.arName,
      enName: subcategory.enName,
    },
  });

  return newSubcategory;
};

export const updateCategory = async (id: number, category: Prisma.CategoryUpdateInput) => {
  const found = await prisma.category.findUnique({
    select: { id: true },
    where: {
      id,
    },
  });
  if (!found) {
    throw new NotFoundError('Category not found');
  }

  const exist = await findCategoryByName(String(category.enName), String(category.arName));
  if (exist && exist.id !== id) {
    throw new ConflictError('Category already exists');
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id,
    },
    data: {
      arName: category.arName,
      enName: category.enName,
      deletedAt: category.deletedAt,
    },
  });

  return updatedCategory;
};

export const deleteCategory = async (id: number) => {
  const found = await prisma.category.findUnique({
    select: {
      id: true,
      _count: {
        select: {
          subCategories: true,
          products: true,
        },
      },
    },
    where: {
      id,
    },
  });

  if (!found) {
    throw new NotFoundError('Category not found');
  }

  const { subCategories, products } = found._count;
  if (subCategories) {
    throw new ConflictError(`Category has ${subCategories} subcategories`);
  }
  if (products) {
    throw new ConflictError(`Category has ${products} products`);
  }

  await prisma.category.delete({
    where: {
      id,
    },
  });

  return true;
};

const findCategoryByName = async (enName: string, arName: string) => {
  const category = await prisma.category.findFirst({
    where: {
      OR: [{ arName }, { enName }],
    },
  });

  return category;
};
