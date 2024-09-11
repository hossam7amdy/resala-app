import type {
  CreateImageResponse,
  ListImagesRequest,
  ListImagesResponse,
  UpdateImageRequest,
  UpdateImageResponse,
} from '@resala/shared';
import { CreateImageSchema } from '@resala/shared';
import {
  Body,
  Controller,
  Delete,
  FormField,
  Get,
  Middlewares,
  Patch,
  Path,
  Post,
  Queries,
  Route,
  Security,
  SuccessResponse,
  Tags,
  UploadedFiles,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { enforceJwt } from '../../middlewares/authentication.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { validateImage } from '../../middlewares/uploadHandler.js';
import { FileService } from '../filestorage/file.service.js';
import { S3FileStorage } from '../filestorage/s3.filestorage.js';
import { ImageService } from './image.service.js';

@Tags('Image')
@Route('api/v1/images')
@Security('JWT_SECRET')
export class ImageController extends Controller {
  private readonly imageService: ImageService;

  constructor() {
    super();

    const fileService = new FileService(new S3FileStorage());
    this.imageService = new ImageService(db, fileService);
  }

  @Get()
  public async list(@Queries() query: ListImagesRequest['query']): Promise<ListImagesResponse> {
    const images = await this.imageService.list(query);

    return { success: true, data: images };
  }

  @Post()
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  @SuccessResponse('201', 'Image created successfully')
  public async create(
    @FormField() colorId: number | string,
    @FormField() productId: number | string,
    @UploadedFiles() images: Express.Multer.File[]
  ): Promise<CreateImageResponse> {
    images.forEach(image => validateImage(image));

    const { body } = await CreateImageSchema.parseAsync({
      body: {
        colorId,
        productId,
      },
    });

    await this.imageService.createMany({
      ...body,
      files: images,
    });

    return { success: true };
  }

  @Patch('{imageId}')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  public async update(
    @Path() imageId: string,
    @Body() body: UpdateImageRequest['body']
  ): Promise<UpdateImageResponse> {
    const image = await this.imageService.updatePrimary(+imageId, body.isPrimary);

    return { success: true, data: image };
  }

  @Delete('{imageId}')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  public async delete(@Path() imageId: string): Promise<UpdateImageResponse> {
    const image = await this.imageService.delete(+imageId);

    return { success: true, data: image };
  }
}
