import { inventoryService } from '../../service/index.js';
import type {
  CreateStock,
  DeleteStock,
  GetStock,
  GetStocksList,
  UpdateStock,
} from './stock-controller.interface.js';

export const getStock: GetStock = async (req, res, next) => {
  try {
    const stock = await inventoryService.findStockById(req.params.stockId);

    return res.json({
      success: true,
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

export const getStocksList: GetStocksList = async (req, res, next) => {
  try {
    const { stocks, total } = await inventoryService.getStocksList(req.query);

    return res.json({
      success: true,
      data: {
        pagination: {
          page: req.query.page,
          limit: req.query.limit,
          total,
        },
        stocks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createStock: CreateStock = async (req, res, next) => {
  try {
    const stock = await inventoryService.updateStock(req.body);

    return res.json({
      success: true,
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStock: UpdateStock = async (req, res, next) => {
  try {
    const stock = await inventoryService.updateStock(req.body);

    return res.json({
      success: true,
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStock: DeleteStock = async (req, res, next) => {
  try {
    const stock = await inventoryService.deleteStock(req.params.stockId);

    return res.json({
      success: true,
      data: stock,
    });
  } catch (error) {
    next(error);
  }
};
