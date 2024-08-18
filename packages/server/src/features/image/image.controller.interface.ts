import type {
  CreateImageRequest,
  CreateImageResponse,
  ListImagesRequest,
  ListImagesResponse,
  UpdateImageRequest,
  UpdateImageResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/express.js';

export type CreateImage = ExpressHandler<
  CreateImageRequest['body'],
  CreateImageResponse,
  undefined,
  LocalUser
>;

export type UpdateImage = ExpressHandlerWithParams<
  UpdateImageRequest['params'],
  UpdateImageRequest['body'],
  UpdateImageResponse,
  undefined,
  LocalUser
>;

export type DeleteImage = ExpressHandlerWithParams<
  UpdateImageRequest['params'],
  undefined,
  UpdateImageResponse,
  undefined,
  LocalUser
>;

export type ListImages = ExpressHandler<
  undefined,
  ListImagesResponse,
  ListImagesRequest['query'],
  LocalUser
>;

export interface IImageController {
  createImages: CreateImage;
  updateImage: UpdateImage;
  deleteImage: DeleteImage;
  listImages: ListImages;
}
