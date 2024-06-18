import { inventoryService } from '../../services/index.js';
import type {
  CreateColor,
  DeleteColor,
  GetColor,
  GetColorsList,
  UpdateColor,
} from './color-controller.interface.js';

export const getColor: GetColor = async (req, res, next) => {
  try {
    const color = await inventoryService.findColorById(req.params.colorId);

    return res.json({
      success: true,
      data: color,
    });
  } catch (error) {
    next(error);
  }
};

export const getColorsList: GetColorsList = async (_, res, next) => {
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

export const createColor: CreateColor = async (req, res, next) => {
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

export const updateColor: UpdateColor = async (req, res, next) => {
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

export const deleteColor: DeleteColor = async (req, res, next) => {
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
