import type { FileService, InventoryService } from '../../services/index.js';
import type {
  CreateStock,
  DeleteStock,
  GetStock,
  GetStocksList,
  UpdateStock,
} from './IStockController.js';

export default class StockController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly fileService: FileService
  ) {
    console.log(this.fileService.uploadFile);
  }

  getStock: GetStock = async (req, res, next) => {
    try {
      const stock = await this.inventoryService.stockService.findById(req.params.stockId);

      return res.json({ success: true, data: stock });
    } catch (error) {
      next(error);
    }
  };

  getStocksList: GetStocksList = async (req, res, next) => {
    try {
      const { stocks, pagination } = await this.inventoryService.stockService.list(req.query);

      return res.json({
        success: true,
        data: { pagination, stocks },
      });
    } catch (error) {
      next(error);
    }
  };

  createStock: CreateStock = async (req, res, next) => {
    try {
      const stock = await this.inventoryService.stockService.create(req.body);

      return res.json({ success: true, data: stock });
    } catch (error) {
      next(error);
    }
  };

  updateStock: UpdateStock = async (req, res, next) => {
    try {
      const stock = await this.inventoryService.stockService.update(req.params.stockId, req.body);

      return res.json({
        success: true,
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteStock: DeleteStock = async (req, res, next) => {
    try {
      const stock = await this.inventoryService.stockService.delete(req.params.stockId);

      return res.json({ success: true, data: stock });
    } catch (error) {
      next(error);
    }
  };
}
