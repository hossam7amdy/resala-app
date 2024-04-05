import { RequestHandler } from 'express';
import { unlink } from 'fs/promises';

import { deleteBlob, uploadBlob } from '../../lib/azure-storage';
import { logger } from '../../lib/logger';
import { inventoryService } from '../../service';
import { BadRequestError, NotFoundError } from '../../utils/api-errors';

export const getProduct: RequestHandler = async (req, res, next) => {
  const deleted = Boolean(req.query.deleted);
  const productId = Number(req.params.productId);

  try {
    if (isNaN(productId)) {
      throw new BadRequestError('Invalid Product ID');
    }

    const product = await inventoryService.findProductById(productId, !!deleted);

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsList: RequestHandler = async (req, res, next) => {
  const deleted = Boolean(req.query.deleted);
  const query = String(req.query.query || '');
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Number(req.query.limit || 10), 50);

  try {
    const { products, total } = await inventoryService.listProductsPaginated(
      { page, limit, query },
      deleted
    );

    return res.json({
      success: true,
      data: {
        pagination: { page, limit, total },
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await inventoryService.createProduct(req.body);

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  const productId = Number(req.params.productId);

  try {
    if (isNaN(productId)) {
      throw new BadRequestError('Invalid Product ID');
    }

    const product = await inventoryService.updateProduct(productId, req.body);
    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const productId = parseInt(req.params.productId);

  try {
    if (isNaN(productId)) {
      throw new BadRequestError('Invalid Product ID');
    }

    await inventoryService.deleteProduct(productId);
  } catch (error) {
    return next(error);
  }

  return res.json({
    success: true,
    message: 'Product deleted',
  });
};

export const addProductImages: RequestHandler = async (req, res, next) => {
  const productId = Number(req.params.productId);
  const files = req.files as Express.Multer.File[];

  try {
    if (isNaN(productId)) {
      throw new BadRequestError('Invalid Product ID');
    }

    if (!files || !files.length) {
      throw new NotFoundError('No files uploaded');
    }

    const urls = await Promise.all(files.map(file => uploadBlob(file.path)));
    await inventoryService.addProductImages(productId, urls);

    return res.json({
      success: true,
      message: 'Files uploaded',
    });
  } catch (error) {
    next(error);
  } finally {
    files.forEach(file => unlink(file.path).catch(logger.error));
  }
};

export const listProductImages: RequestHandler = async (req, res, next) => {
  const productId = Number(req.params.productId);

  try {
    if (isNaN(productId)) {
      throw new BadRequestError('Invalid Product ID');
    }

    const images = await inventoryService.listProductImages(productId);

    return res.json({
      success: true,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductImage: RequestHandler = async (req, res, next) => {
  const imageId = Number(req.params.imageId);
  const productId = Number(req.params.productId);

  try {
    if (isNaN(imageId) || isNaN(productId)) {
      throw new BadRequestError('Invalid Image ID or Product ID');
    }

    const image = await inventoryService.deleteProductImage(imageId, productId);
    await deleteBlob(image.imageUrl);

    return res.json({
      success: true,
      message: 'File deleted',
    });
  } catch (error) {
    next(error);
  }
};
