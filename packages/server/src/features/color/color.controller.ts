import {
  type CreateColorRequest,
  type CreateColorResponse,
  CreateColorSchema,
  type DeleteColorResponse,
  type GetColorResponse,
  type ListColorsResponse,
  type UpdateColorRequest,
  type UpdateColorResponse,
  UpdateColorSchema,
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
import { authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { ColorService } from './color.service.js';

@Tags('Color')
@Security('JWT_SECRET')
@Route('api/v1/colors')
export class ColorController extends Controller {
  private readonly colorService: ColorService;

  constructor() {
    super();
    this.colorService = new ColorService(db);
  }

  @Get('{colorId}')
  public async get(@Path() colorId: string): Promise<GetColorResponse> {
    const color = await this.colorService.find(+colorId);

    return { success: true, data: color };
  }

  @Get()
  public async lists(): Promise<ListColorsResponse> {
    const colors = await this.colorService.list();

    return { success: true, data: colors };
  }

  @Post()
  @SuccessResponse('201', 'Color created successfully')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR']), validate(CreateColorSchema)])
  public async create(@Body() body: CreateColorRequest['body']): Promise<CreateColorResponse> {
    const color = await this.colorService.create(body);

    return { success: true, data: color };
  }

  @Put('{colorId}')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR']), validate(UpdateColorSchema)])
  public async update(
    @Path() colorId: string,
    @Body() body: UpdateColorRequest['body']
  ): Promise<UpdateColorResponse> {
    const color = await this.colorService.update(+colorId, body);

    return { success: true, data: color };
  }

  @Delete('{colorId}')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  public async delete(@Path() colorId: string): Promise<DeleteColorResponse> {
    const color = await this.colorService.delete(+colorId);

    return { success: true, data: color };
  }
}
