import { unlink } from 'fs/promises';

import { deleteBlob, uploadBlob } from '../../lib/azure-storage';
import { logger } from '../../lib/logger';
import { inventoryService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';
import {
  CreateProduct,
  CreateProductImage,
  DeleteProduct,
  DeleteProductImage,
  GetProduct,
  GetProductsList,
  ListProductImages,
  ListProductStocks,
  UpdateProduct,
} from './product-controller.interface';

export const getProduct: GetProduct = async (req, res, next) => {
  try {
    const product = await inventoryService.findProductById(req.params.productId);

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsList: GetProductsList = async (req, res, next) => {
  try {
    const { page, limit, query, deleted } = req.query;
    const { products, total } = await inventoryService.listProductsPaginated({
      page,
      limit,
      query,
      deleted,
    });

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

export const createProduct: CreateProduct = async (req, res, next) => {
  try {
    // @ts-ignore - Incompatible types Decimal not assignable to number
    const product = await inventoryService.createProduct(req.body);

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProduct: UpdateProduct = async (req, res, next) => {
  try {
    // @ts-ignore - Incompatible types Decimal not assignable to number
    const product = await inventoryService.updateProduct(req.params.productId, req.body);
    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct: DeleteProduct = async (req, res, next) => {
  try {
    const product = await inventoryService.deleteProduct(req.params.productId);

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

export const addProductImages: CreateProductImage = async (req, res, next) => {
  const files = req.files as Express.Multer.File[];

  try {
    if (!files || !files.length) {
      throw new BadRequestError('No files uploaded');
    }

    const urls = await Promise.all(files.map(file => uploadBlob(file.path)));
    await inventoryService.addProductImages(req.body.productId, urls);

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

export const listProductImages: ListProductImages = async (req, res, next) => {
  try {
    const images = await inventoryService.listProductImages(req.params.productId);

    return res.json({
      success: true,
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

export const listProductStocks: ListProductStocks = async (req, res, next) => {
  try {
    const stocks = await inventoryService.getProductStocks(req.params.productId);

    return res.json({
      success: true,
      data: stocks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductImage: DeleteProductImage = async (req, res, next) => {
  try {
    const { imageId, productId } = req.params;

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
