import type { InventoryService } from '../../services/index.js';
import type IImageController from './IImageController.js';
import type { CreateImage, DeleteImage, FindImages, UpdateImage } from './IImageController.js';

export default class ImageController implements IImageController {
  constructor(private readonly inventoryService: InventoryService) {}

  createImages: CreateImage = async (req, res, next) => {
    try {
      const message = await this.inventoryService.image.createImages({
        ...req.body,
        files: req.files as Express.Multer.File[],
      });

      return res.status(201).json({ success: true, message });
    } catch (error) {
      next(error);
    }
  };

  findImages: FindImages = async (req, res, next) => {
    try {
      const images = await this.inventoryService.image.findImages(req.query);

      return res.status(200).json({ success: true, data: images });
    } catch (error) {
      next(error);
    }
  };

  updateImage: UpdateImage = async (req, res, next) => {
    try {
      const image = await this.inventoryService.image.setImageAsPrimary(req.params.imageId);

      return res.status(200).json({ success: true, data: image });
    } catch (error) {
      next(error);
    }
  };

  deleteImage: DeleteImage = async (req, res, next) => {
    try {
      const image = await this.inventoryService.image.deleteImage(req.params.imageId);

      return res.status(200).json({ success: true, data: image });
    } catch (error) {
      next(error);
    }
  };
}
