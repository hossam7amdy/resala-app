import type {
  CreateImage,
  DeleteImage,
  IImageController,
  ListImages,
  UpdateImage,
} from './image.controller.interface.js';
import type { ImageService } from './image.service.js';

export class ImageController implements IImageController {
  constructor(private readonly imageService: ImageService) {}

  createImages: CreateImage = async (req, res, next) => {
    try {
      await this.imageService.createMany({
        ...req.body,
        files: req.files as Express.Multer.File[],
      });

      return res.status(201).json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  listImages: ListImages = async (req, res, next) => {
    try {
      const images = await this.imageService.list(req.query);

      return res.status(200).json({ success: true, data: images });
    } catch (error) {
      next(error);
    }
  };

  updateImage: UpdateImage = async (req, res, next) => {
    try {
      const image = await this.imageService.updatePrimary(req.params.imageId);

      return res.status(200).json({ success: true, data: image });
    } catch (error) {
      next(error);
    }
  };

  deleteImage: DeleteImage = async (req, res, next) => {
    try {
      const image = await this.imageService.delete(req.params.imageId);

      return res.status(200).json({ success: true, data: image });
    } catch (error) {
      next(error);
    }
  };
}
