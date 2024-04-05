import { Product } from '@prisma/client';

import prisma from '../../lib/prisma';
import { Pagination } from '../../types';
import { ConflictError, NotFoundError } from '../../utils/api-errors';

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

export const listProductsPaginated = async (pagination: Pagination, deleted: boolean = false) => {
  const filters = [
    { enName: { startsWith: pagination.query } },
    { arName: { startsWith: pagination.query } },
  ];

  const [total, products] = await prisma.$transaction([
    prisma.product.count({
      where: {
        OR: filters,
        deletedAt: deleted ? undefined : null,
      },
    }),
    prisma.product.findMany({
      include: {
        category: true,
        images: {
          take: 1,
          orderBy: { createdAt: 'asc' },
        },
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      where: {
        OR: filters,
        deletedAt: deleted ? undefined : null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  return { products, total };
};

export const createProduct = async (product: Product) => {
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

  return prisma.product.create({
    data: {
      categoryId: product.categoryId,
      arName: product.arName,
      enName: product.enName,
      arDescription: product.arDescription,
      enDescription: product.enDescription,
      price: product.price,
    },
  });
};

export const updateProduct = async (id: number, product: Product) => {
  await findProductById(id); // Check if product exists

  const category = await prisma.category.findUnique({
    where: { id: product.categoryId },
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }

  const exist = await findProductByName(product.enName, product.arName);
  if (exist && exist.id !== id) {
    throw new ConflictError('Product already exists');
  }

  return prisma.product.update({
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
    },
  });
};

export const deleteProduct = async (id: number) => {
  await findProductById(id);

  return prisma.product.delete({
    where: { id },
  });
};

export const addProductImages = async (productId: number, urls: string[]) => {
  await findProductById(productId);

  return prisma.productImage.createMany({
    data: urls.map(url => ({
      productId,
      imageUrl: url,
    })),
  });
};

export const listProductImages = async (productId: number) => {
  return prisma.productImage.findMany({
    where: { productId },
  });
};

export const deleteProductImage = async (imageId: number, productId: number) => {
  const image = await prisma.productImage.findUnique({
    where: { id_productId: { id: imageId, productId } },
  });
  if (!image) {
    throw new NotFoundError('Image not found');
  }

  await prisma.productImage.delete({
    where: { id_productId: { id: imageId, productId } },
  });

  return image;
};

const findProductByName = async (enName: string, arName: string) => {
  return prisma.product.findFirst({
    where: {
      OR: [{ enName }, { arName }],
    },
  });
};
