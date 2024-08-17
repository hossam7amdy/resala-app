import type {
  CreateStock,
  DeleteStock,
  GetStock,
  GetStocksList,
  UpdateStock,
} from './stock.controller.interface.js';
import type { StockService } from './stock.service.js';

export class StockController {
  constructor(private readonly stockService: StockService) {}

  getStock: GetStock = async (req, res, next) => {
    try {
      const stock = await this.stockService.find(req.params.stockId);

      return res.json({ success: true, data: stock });
    } catch (error) {
      next(error);
    }
  };

  listStocks: GetStocksList = async (req, res, next) => {
    try {
      const { stocks, pagination } = await this.stockService.list(req.query);

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
      const stock = await this.stockService.create(req.body);

      return res.json({ success: true, data: stock });
    } catch (error) {
      next(error);
    }
  };

  updateStock: UpdateStock = async (req, res, next) => {
    try {
      const stock = await this.stockService.update(req.params.stockId, req.body);

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
      const stock = await this.stockService.delete(req.params.stockId);

      return res.json({ success: true, data: stock });
    } catch (error) {
      next(error);
    }
  };
}
