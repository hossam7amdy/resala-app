import { Prisma } from '@prisma/client';
import { RequestHandler } from 'express';
import { unlink } from 'fs/promises';

import { deleteBlob, uploadBlob } from '../../lib/azure-storage';
import { logger } from '../../lib/logger';
import { prisma } from '../../model';
import { ConflictError, NotFoundError } from '../../utils/api-errors';

export const getProduct: RequestHandler = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const deleted = req.query.deleted;

  const product = await prisma.product.findUnique({
    select: {
      id: true,
      arName: true,
      enName: true,
      price: true,
      deletedAt: !!deleted,
      images: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
      category: {
        select: {
          id: true,
          arName: true,
          enName: true,
        },
      },
      stocks: {
        select: {
          size: {
            select: {
              id: true,
              name: true,
            },
          },
          color: {
            select: {
              id: true,
              enName: true,
              arName: true,
              code: true,
            },
          },
          quantity: true,
        },
      },
    },
    where: {
      id: productId,
      deletedAt: deleted ? undefined : null,
    },
  });

  if (!product) {
    return next(new NotFoundError('Product not found'));
  }

  return res.json({
    success: true,
    data: product,
  });
};

export const getProductsList: RequestHandler = async (req, res) => {
  const deleted = req.query.deleted;

  const products = await prisma.product.findMany({
    select: {
      id: true,
      arName: true,
      enName: true,
      price: true,
      deletedAt: !!deleted,
      category: {
        select: {
          id: true,
          arName: true,
          enName: true,
        },
      },
      images: {
        select: {
          id: true,
          imageUrl: true,
        },
        take: 1,
      },
    },
    where: {
      deletedAt: deleted ? undefined : null,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return res.json({
    success: true,
    data: products,
  });
};

export const createProduct: RequestHandler = async (req, res, next) => {
  const { categoryId, arName, enName, arDescription, enDescription, price } = req.body;

  const category = await prisma.category.findFirst({
    where: { categoryId },
  });
  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  let product;
  try {
    product = await prisma.product.create({
      data: {
        categoryId,
        arName,
        enName,
        arDescription,
        enDescription,
        price,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.warn(error);
      return next(new ConflictError('Product with same name already exists'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    data: product,
  });
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const { categoryId, arName, enName, arDescription, enDescription, price } = req.body;

  const category = await prisma.category.findFirst({
    where: { categoryId },
  });
  if (!category) {
    return next(new NotFoundError('Category not found'));
  }

  let product;
  try {
    product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        categoryId,
        arName,
        enName,
        arDescription,
        enDescription,
        price,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.warn(error);
      return next(new ConflictError('Product with same name already exists'));
    }
    return next(error);
  }

  return res.json({
    success: true,
    data: product,
  });
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const productId = parseInt(req.params.productId);

  try {
    await prisma.product.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: productId,
      },
    });
  } catch (error) {
    return next(new NotFoundError('Product not found'));
  }

  return res.json({
    success: true,
    message: 'Product deleted',
  });
};

export const restoreProduct: RequestHandler = async (req, res, next) => {
  const productId = req.body.productId;

  try {
    await prisma.product.update({
      data: {
        deletedAt: null,
      },
      where: {
        id: productId,
      },
    });
  } catch (error) {
    return next(new NotFoundError('Product not found'));
  }

  return res.json({
    success: true,
    message: 'Product restored',
  });
};

export const addProductImages: RequestHandler = async (req, res, next) => {
  const productId = parseInt(req.params.productId);
  const files = req.files as Express.Multer.File[];

  if (!files || !files.length) {
    return next(new NotFoundError('No files uploaded'));
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    files.forEach(file => unlink(file.path).catch(logger.error));
    return next(new NotFoundError('Product not found'));
  }

  const urls = await Promise.all(files.map(file => uploadBlob(file))).finally(() => {
    files.forEach(file => unlink(file.path).catch(logger.error));
  });

  await prisma.productImage.createMany({
    data: urls.map(url => ({
      productId,
      imageUrl: url,
    })),
  });

  return res.json({
    success: true,
    message: 'Files uploaded',
  });
};

export const deleteProductImage: RequestHandler = async (req, res, next) => {
  const imageId = parseInt(req.params.imageId);
  const productId = parseInt(req.params.productId);

  const image = await prisma.productImage.findFirst({
    where: { id: imageId, productId },
  });
  if (!image) {
    return next(new NotFoundError('Image not found'));
  }

  await Promise.all([
    deleteBlob(image.imageUrl),
    prisma.productImage.delete({ where: { id: imageId } }),
  ]);

  return res.json({
    success: true,
    message: 'File deleted',
  });
};
