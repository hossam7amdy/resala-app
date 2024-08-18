import type {
  CreateColor,
  DeleteColor,
  GetColor,
  GetColorsList,
  UpdateColor,
} from './color.controller.interface.js';
import type { ColorService } from './color.service.js';

export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  getColor: GetColor = async (req, res, next) => {
    try {
      const color = await this.colorService.find(req.params.colorId);

      return res.json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };

  listColors: GetColorsList = async (_, res, next) => {
    try {
      const colors = await this.colorService.list();

      return res.json({ success: true, data: colors });
    } catch (error) {
      next(error);
    }
  };

  createColor: CreateColor = async (req, res, next) => {
    try {
      const color = await this.colorService.create(req.body);

      return res.status(201).json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };

  updateColor: UpdateColor = async (req, res, next) => {
    const colorId = Number(req.params.colorId);
    try {
      const color = await this.colorService.update(colorId, req.body);

      return res.json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };

  deleteColor: DeleteColor = async (req, res, next) => {
    const colorId = Number(req.params.colorId);
    try {
      const color = await this.colorService.delete(colorId);

      return res.json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };
}
