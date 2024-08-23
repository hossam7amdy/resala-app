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
import { authorizeRole } from '../../middlewares/authorization.js';
import { requestValidator } from '../../middlewares/requestValidator.js';
import { ColorService } from './color.service.js';

@Tags('Color')
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
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), requestValidator(CreateColorSchema)])
  public async create(@Body() body: CreateColorRequest['body']): Promise<CreateColorResponse> {
    const color = await this.colorService.create(body);

    return { success: true, data: color };
  }

  @Put('{colorId}')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), requestValidator(UpdateColorSchema)])
  public async update(
    @Path() colorId: string,
    @Body() body: UpdateColorRequest['body']
  ): Promise<UpdateColorResponse> {
    const color = await this.colorService.update(+colorId, body);

    return { success: true, data: color };
  }

  @Delete('{colorId}')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async delete(@Path() colorId: string): Promise<DeleteColorResponse> {
    const color = await this.colorService.delete(+colorId);

    return { success: true, data: color };
  }
}
