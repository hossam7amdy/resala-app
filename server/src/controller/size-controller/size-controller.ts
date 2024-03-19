import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RequestHandler } from 'express';

import { inventoryService } from '../../service';
import { BadRequestError } from '../../utils/api-errors';

export const getSize: RequestHandler = async (req, res, next) => {
  const sizeId = Number(req.params.sizeId);

  try {
    if (isNaN(sizeId)) {
      throw new BadRequestError('Size id must be a number');
    }

    const size = await inventoryService.findSizeById(sizeId);

    return res.json({
      success: true,
      data: size,
    });
  } catch (error) {
    next(error);
  }
};

export const getSizesList: RequestHandler = async (_, res, next) => {
  try {
    const sizes = await inventoryService.listSizes();

    return res.json({
      success: true,
      data: sizes,
    });
  } catch (error) {
    next(error);
  }
};

export const createSize: RequestHandler = async (req, res, next) => {
  try {
    const size = await inventoryService.createSize(req.body.name);

    return res.status(201).json({
      success: true,
      data: size,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSize: RequestHandler = async (req, res, next) => {
  const sizeId = Number(req.params.sizeId);

  try {
    const size = await inventoryService.updateSize(sizeId, req.body.name);

    return res.json({
      success: true,
      data: size,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return next(new BadRequestError('Size already exists'));
    }
    next(error);
  }
};

export const deleteSize: RequestHandler = async (req, res, next) => {
  const sizeId = Number(req.params.sizeId);

  try {
    if (isNaN(sizeId)) {
      throw new BadRequestError('Size id must be a number');
    }

    await inventoryService.deleteSize(sizeId);

    return res.json({
      success: true,
      message: 'Size deleted',
    });
  } catch (error) {
    next(error);
  }
};
