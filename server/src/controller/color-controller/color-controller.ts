import { RequestHandler } from 'express';

import { inventoryService } from '../../services';
import { BadRequestError } from '../../utils/api-errors';

export const getColor: RequestHandler = async (req, res, next) => {
  const colorId = Number(req.params.colorId);

  try {
    if (isNaN(colorId)) {
      throw new BadRequestError('Invalid color id');
    }

    const color = await inventoryService.findColorById(colorId);

    return res.json({
      success: true,
      data: color,
    });
  } catch (error) {
    next(error);
  }
};

export const getColorsList: RequestHandler = async (_, res, next) => {
  try {
    const colors = await inventoryService.getColors();
    return res.json({
      success: true,
      data: colors,
    });
  } catch (error) {
    next(error);
  }
};

export const createColor: RequestHandler = async (req, res, next) => {
  try {
    const color = await inventoryService.createColor(req.body);

    return res.status(201).json({
      success: true,
      data: color,
    });
  } catch (error) {
    next(error);
  }
};

export const updateColor: RequestHandler = async (req, res, next) => {
  const colorId = Number(req.params.colorId);
  try {
    const color = await inventoryService.updateColor(colorId, req.body);

    return res.json({
      success: true,
      data: color,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteColor: RequestHandler = async (req, res, next) => {
  const colorId = Number(req.params.colorId);
  try {
    await inventoryService.deleteColor(colorId);

    return res.json({
      success: true,
      message: 'Color deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
