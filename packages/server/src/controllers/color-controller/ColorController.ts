import type { InventoryService } from '../../services/index.js';
import type {
  CreateColor,
  DeleteColor,
  GetColor,
  GetColorsList,
  UpdateColor,
} from './IColorController.js';

export default class ColorController {
  constructor(private readonly inventoryService: InventoryService) {}

  getColor: GetColor = async (req, res, next) => {
    try {
      const color = await this.inventoryService.color.findColorById(req.params.colorId);

      return res.json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };

  listColors: GetColorsList = async (_, res, next) => {
    try {
      const colors = await this.inventoryService.color.getColors();

      return res.json({ success: true, data: colors });
    } catch (error) {
      next(error);
    }
  };

  createColor: CreateColor = async (req, res, next) => {
    try {
      const color = await this.inventoryService.color.createColor(req.body);

      return res.status(201).json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };

  updateColor: UpdateColor = async (req, res, next) => {
    const colorId = Number(req.params.colorId);
    try {
      const color = await this.inventoryService.color.updateColor(colorId, req.body);

      return res.json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };

  deleteColor: DeleteColor = async (req, res, next) => {
    const colorId = Number(req.params.colorId);
    try {
      const color = await this.inventoryService.color.deleteColor(colorId);

      return res.json({ success: true, data: color });
    } catch (error) {
      next(error);
    }
  };
}
