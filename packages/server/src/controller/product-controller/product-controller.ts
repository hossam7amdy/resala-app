import { unlink } from 'fs/promises';

import { ENV } from '../../config/env.js';
import { logger } from '../../lib/logger/logger.js';
import S3Service from '../../lib/s3/s3.js';
import FileService from '../../service/file-service.js';
import { inventoryService } from '../../service/index.js';
import { BadRequestError } from '../../utils/api-errors.js';
import type {
  CreateProduct,
  CreateProductImage,
  DeleteProduct,
  DeleteProductImage,
  GetProduct,
  GetProductsList,
  ListProductImages,
  ListProductStocks,
  UpdateProduct,
} from './product-controller.interface.js';

const s3Bucket = new S3Service({
  accessKey: ENV.S3_ACCESS_KEY_ID!,
  accessSecret: ENV.S3_SECRET_ACCESS_KEY!,
  region: ENV.S3_BUCKET_REGION!,
  bucketName: ENV.S3_BUCKET_NAME!,
});
const fileService = new FileService(ENV.S3_CLOUDFRONT_DOMAIN!, s3Bucket);

export const getProduct: GetProduct = async (req, res, next) => {
  try {
    const product = await inventoryService.findProductById(req.params.productId, req.query.deleted);

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
    // @ts-expect-error - Incompatible types Decimal not assignable to number
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
    // @ts-expect-error - Incompatible types Decimal not assignable to number
    const product = await inventoryService.updateProduct(req.params.productId, req.body);
    return res.json({
      success: true,
      data: {
        ...product,
        deletedAt: product.deletedAt ? new Date(product.deletedAt) : null,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct: DeleteProduct = async (req, res, next) => {
  try {
    const images = await inventoryService.listProductImages(req.params.productId);
    const product = await inventoryService.deleteProduct(req.params.productId);

    const imageUrls = images.map(({ imageUrl }) => imageUrl);
    fileService.deleteFiles(imageUrls).catch(logger.warn);

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
  const productId = req.body.productId;

  try {
    if (!files || !files.length) {
      throw new BadRequestError('No files uploaded');
    }

    const urls = await fileService.uploadFiles(files, productId.toString());
    await inventoryService.addProductImages(req.body.productId, urls);

    return res.json({
      success: true,
      message: 'Files uploaded',
    });
  } catch (error) {
    next(error);
  } finally {
    files.map(file => unlink(file.path).catch(logger.warn));
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
    await fileService.deleteFile(image.imageUrl);

    return res.json({
      success: true,
      message: 'File deleted',
    });
  } catch (error) {
    next(error);
  }
};
