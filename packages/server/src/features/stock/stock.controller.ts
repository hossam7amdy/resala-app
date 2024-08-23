import {
  type CreateStockRequest,
  type CreateStockResponse,
  CreateStockSchema,
  type DeleteStockResponse,
  type GetStockResponse,
  type ListStocksRequest,
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
  Queries,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { requestValidator } from '../../middlewares/requestValidator.js';
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
  @Middlewares([requestValidator(ListStocksSchema)])
  async list(@Queries() query: ListStocksRequest['query']): Promise<ListStocksResponse> {
    const { stocks, pagination } = await this.stockService.list(query);

    return {
      success: true,
      data: { pagination, stocks },
    };
  }

  @Post()
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), requestValidator(CreateStockSchema)])
  @SuccessResponse('201', 'Stock created successfully')
  async create(@Body() body: CreateStockRequest['body']): Promise<CreateStockResponse> {
    const stock = await this.stockService.create(body);

    return { success: true, data: stock };
  }

  @Put('{stockId}')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), requestValidator(UpdateStockSchema)])
  async update(
    @Path() stockId: string,
    @Body() body: UpdateStockRequest['body']
  ): Promise<UpdateStockResponse> {
    const stock = await this.stockService.update(+stockId, body);

    return { success: true, data: stock };
  }

  @Delete('{stockId}')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  async delete(@Path() stockId: string): Promise<DeleteStockResponse> {
    const stock = await this.stockService.delete(+stockId);

    return { success: true, data: stock };
  }
}
