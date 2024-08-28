import {
  type CreateStockRequest,
  type CreateStockResponse,
  CreateStockSchema,
  type DeleteStockResponse,
  type GetStockResponse,
  type ListStocksResponse,
  ListStocksSchema,
  type UpdateStockRequest,
  type UpdateStockResponse,
  UpdateStockSchema,
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
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { StockService } from './stock.service.js';

@Tags('Stock')
@Route('api/v1/stocks')
export class StockController extends Controller {
  private readonly stockService: StockService;

  constructor() {
    super();
    this.stockService = new StockService(db);
  }

  @Get('{stockId}')
  async get(@Path() stockId: string): Promise<GetStockResponse> {
    const stock = await this.stockService.find(+stockId);

    return { success: true, data: stock };
  }

  @Get()
  @Middlewares([validate(ListStocksSchema)])
  async list(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() search?: string,
    @Query() productId?: number
  ): Promise<ListStocksResponse> {
    const { stocks, pagination } = await this.stockService.list({
      page,
      limit,
      search,
      productId,
    });

    return {
      success: true,
      data: { pagination, stocks },
    };
  }

  @Post()
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(CreateStockSchema)])
  @SuccessResponse('201', 'Stock created successfully')
  async create(@Body() body: CreateStockRequest['body']): Promise<CreateStockResponse> {
    const stock = await this.stockService.create(body);

    return { success: true, data: stock };
  }

  @Put('{stockId}')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(UpdateStockSchema)])
  async update(
    @Path() stockId: string,
    @Body() body: UpdateStockRequest['body']
  ): Promise<UpdateStockResponse> {
    const stock = await this.stockService.update(+stockId, body);

    return { success: true, data: stock };
  }

  @Delete('{stockId}')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  async delete(@Path() stockId: string): Promise<DeleteStockResponse> {
    const stock = await this.stockService.delete(+stockId);

    return { success: true, data: stock };
  }
}
