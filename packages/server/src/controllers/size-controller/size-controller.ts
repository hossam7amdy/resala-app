import { inventoryService } from '../../services/index.js';
import type {
  CreateSize,
  DeleteSize,
  GetSize,
  GetSizesList,
  UpdateSize,
} from './size-controller.interface.js';

export const getSize: GetSize = async (req, res, next) => {
  try {
    const size = await inventoryService.findSizeById(req.params.sizeId);

    return res.json({
      success: true,
      data: size,
    });
  } catch (error) {
    next(error);
  }
};

export const getSizesList: GetSizesList = async (_, res, next) => {
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

export const createSize: CreateSize = async (req, res, next) => {
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

export const updateSize: UpdateSize = async (req, res, next) => {
  try {
    const size = await inventoryService.updateSize(req.params.sizeId, req.body.name);

    return res.json({
      success: true,
      data: size,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSize: DeleteSize = async (req, res, next) => {
  try {
    const size = await inventoryService.deleteSize(req.params.sizeId);

    return res.json({
      success: true,
      data: size,
    });
  } catch (error) {
    next(error);
  }
};
