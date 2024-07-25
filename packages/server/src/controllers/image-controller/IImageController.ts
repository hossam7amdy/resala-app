import type {
  CreateImageRequest,
  CreateImageResponse,
  FindImagesRequest,
  FindImagesResponse,
  PatchImageRequest,
  PatchImageResponse,
} from '@resala/shared';

import type { ExpressHandler, ExpressHandlerWithParams, LocalUser } from '../../types/express.js';

export type CreateImage = ExpressHandler<
  CreateImageRequest['body'],
  CreateImageResponse,
  undefined,
  LocalUser
>;

export type UpdateImage = ExpressHandlerWithParams<
  PatchImageRequest['params'],
  PatchImageRequest['body'],
  PatchImageResponse,
  undefined,
  LocalUser
>;

export type DeleteImage = ExpressHandlerWithParams<
  PatchImageRequest['params'],
  undefined,
  PatchImageResponse,
  undefined,
  LocalUser
>;

export type FindImages = ExpressHandler<
  undefined,
  FindImagesResponse,
  FindImagesRequest['query'],
  LocalUser
>;

export default interface IImageController {
  createImages: CreateImage;
  updateImage: UpdateImage;
  deleteImage: DeleteImage;
  findImages: FindImages;
}
