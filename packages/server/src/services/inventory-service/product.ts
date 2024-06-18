import type { Prisma } from '@prisma/client';
import type { Product } from '@resala/shared';

import type { Filters } from '../../DTOs/review.js';
import prisma from '../../lib/prisma/index.js';
import { ConflictError, NotFoundError } from '../../utils/api-errors.js';

export const findProductById = async (id: number, deleted: boolean = false) => {
  const product = await prisma.product.findUnique({
    include: {
      category: true,
      images: true,
    },
    where: {
      id,
      deletedAt: deleted ? undefined : null,
    },
  });

  if (!product) {
    throw new NotFoundError('Product not found');
  }

  return product;
};

export const listProductsPaginated = async (filters: Filters, deleted: boolean = false) => {
  const { page, limit, query } = filters;

  const _filters: Prisma.ProductWhereInput = {
    OR: [
      {
        enName: { startsWith: query, mode: 'insensitive' },
      },
      {
        arName: { startsWith: query, mode: 'insensitive' },
      },
    ],
    deletedAt: deleted ? undefined : null,
  };

  const [total, products] = await prisma.$transaction([
    prisma.product.count({
      where: _filters,
    }),
    prisma.product.findMany({
      include: {
        category: true,
        images: {
          take: 1,
          orderBy: { createdAt: 'asc' },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      where: _filters,
      orderBy: { updatedAt: 'desc' },
    }),
  ]);

  return { products, total };
};

export const createProduct = async (
  product: Pick<
    Product,
    'arName' | 'enName' | 'arDescription' | 'enDescription' | 'categoryId' | 'price'
  >
) => {
  const category = await prisma.category.findUnique({
    where: { id: product.categoryId },
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }

  const exist = await findProductByName(product.enName, product.arName);
  if (exist) {
    throw new ConflictError('Product already exists');
  }

  const { id } = await prisma.product.create({
    data: {
      categoryId: product.categoryId,
      arName: product.arName,
      enName: product.enName,
      arDescription: product.arDescription,
      enDescription: product.enDescription,
      price: product.price,
    },
  });

  return await findProductById(id);
};

export const updateProduct = async (
  id: number,
  product: Partial<
    Pick<
      Product,
      'arName' | 'enName' | 'arDescription' | 'enDescription' | 'categoryId' | 'price' | 'deletedAt'
    >
  >
) => {
  const oldProduct = await findProductById(id, true); // Check if product exists

  const category = await prisma.category.findUnique({
    where: { id: product.categoryId },
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }

  const exist = await findProductByName(product.enName || '', product.arName || '');
  if (exist && exist.id !== id) {
    throw new ConflictError('Product already exists');
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      categoryId: product.categoryId,
      arName: product.arName,
      enName: product.enName,
      arDescription: product.arDescription,
      enDescription: product.enDescription,
      price: product.price,
      deletedAt: product.deletedAt ? new Date() : null,
    },
  });

  return { ...oldProduct, ...updatedProduct };
};

export const deleteProduct = async (id: number) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    throw new NotFoundError('Product not found');
  }
};

export const addProductImages = async (
  productId: number,
  imagesInfo: { url: string; key: string }[]
) => {
  try {
    await prisma.productImage.createMany({
      data: imagesInfo.map(image => ({
        productId,
        imageKey: image.key,
        imageUrl: image.url,
      })),
    });

    return await listProductImages(productId);
  } catch (error) {
    throw new NotFoundError('Product not found');
  }
};

export const listProductImages = async (productId: number) => {
  return await findProductById(productId);
};

export const deleteProductImage = async (imageId: number, productId: number) => {
  try {
    await prisma.productImage.delete({
      where: { id_productId: { id: imageId, productId } },
    });
  } catch (error) {
    throw new NotFoundError('Image not found');
  }
};

const findProductByName = async (enName: string, arName: string) => {
  return await prisma.product.findFirst({
    where: {
      OR: [{ enName }, { arName }],
    },
  });
};
