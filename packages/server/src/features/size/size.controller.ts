import type {
  CreateSize,
  DeleteSize,
  GetSize,
  GetSizesList,
  ISizeController,
  UpdateSize,
} from './size.controller.interface.js';
import type { SizeService } from './size.service.js';

export class SizeController implements ISizeController {
  constructor(private readonly sizeService: SizeService) {}

  getSize: GetSize = async (req, res, next) => {
    try {
      const size = await this.sizeService.find(req.params.sizeId);

      return res.json({
        success: true,
        data: size,
      });
    } catch (error) {
      next(error);
    }
  };

  listSizes: GetSizesList = async (_, res, next) => {
    try {
      const sizes = await this.sizeService.list();

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
      const size = await this.sizeService.create(req.body);

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
      const size = await this.sizeService.update(req.params.sizeId, req.body);

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
      const size = await this.sizeService.delete(req.params.sizeId);

      return res.json({
        success: true,
        data: size,
      });
    } catch (error) {
      next(error);
    }
  };
}
