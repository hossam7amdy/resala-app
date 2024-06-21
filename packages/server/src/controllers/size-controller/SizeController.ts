import type { InventoryService } from '../../services/index.js';
import type {
  CreateSize,
  DeleteSize,
  GetSize,
  GetSizesList,
  UpdateSize,
} from './ISizeController.js';

export default class SizeController {
  constructor(private readonly inventoryService: InventoryService) {}

  getSize: GetSize = async (req, res, next) => {
    try {
      const size = await this.inventoryService.size.findSizeById(req.params.sizeId);

      return res.json({
        success: true,
        data: size,
      });
    } catch (error) {
      next(error);
    }
  };

  getSizesList: GetSizesList = async (_, res, next) => {
    try {
      const sizes = await this.inventoryService.size.listSizes();

      return res.json({
        success: true,
        data: sizes,
      });
    } catch (error) {
      next(error);
    }
  };

  createSize: CreateSize = async (req, res, next) => {
    try {
      const size = await this.inventoryService.size.createSize(req.body);

      return res.status(201).json({
        success: true,
        data: size,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSize: UpdateSize = async (req, res, next) => {
    try {
      const size = await this.inventoryService.size.updateSize(req.params.sizeId, req.body);

      return res.json({
        success: true,
        data: size,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteSize: DeleteSize = async (req, res, next) => {
    try {
      const size = await this.inventoryService.size.deleteSize(req.params.sizeId);

      return res.json({
        success: true,
        data: size,
      });
    } catch (error) {
      next(error);
    }
  };
}
