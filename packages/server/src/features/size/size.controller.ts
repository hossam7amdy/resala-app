import {
  type CreateSizeRequest,
  type CreateSizeResponse,
  CreateSizeSchema,
  type DeleteSizeResponse,
  type GetSizeResponse,
  type ListSizesResponse,
  type UpdateSizeRequest,
  type UpdateSizeResponse,
  UpdateSizeSchema,
} from '@resala/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { enforceJwt } from '../../middlewares/authentication.js';
import { validate } from '../../middlewares/validateHandler.js';
import { SizeService } from './size.service.js';

@Tags('Size')
@Security('JWT_SECRET')
@Route('api/v1/sizes')
export class SizeController extends Controller {
  private readonly sizeService: SizeService;

  constructor() {
    super();
    this.sizeService = new SizeService(db);
  }

  @Get('{sizeId}')
  public async get(@Path() sizeId: string): Promise<GetSizeResponse> {
    const size = await this.sizeService.find(+sizeId);

    return { success: true, data: size };
  }

  @Get()
  public async list(): Promise<ListSizesResponse> {
    const sizes = await this.sizeService.list();

    return { success: true, data: sizes };
  }

  @Post()
  @SuccessResponse('201', 'Size created')
  @Middlewares([enforceJwt, validate(CreateSizeSchema)])
  public async create(@Body() req: CreateSizeRequest['body']): Promise<CreateSizeResponse> {
    const size = await this.sizeService.create(req);

    return { success: true, data: size };
  }

  @Put('{sizeId}')
  @Middlewares([enforceJwt, validate(UpdateSizeSchema)])
  public async update(
    @Path() sizeId: string,
    @Body() req: UpdateSizeRequest['body']
  ): Promise<UpdateSizeResponse> {
    const size = await this.sizeService.update(+sizeId, req);

    return { success: true, data: size };
  }

  @Delete('{sizeId}')
  @Middlewares([enforceJwt])
  public async delete(@Path() sizeId: string): Promise<DeleteSizeResponse> {
    const size = await this.sizeService.delete(+sizeId);

    return { success: true, data: size };
  }
}
