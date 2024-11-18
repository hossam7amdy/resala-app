import type {
  AddProductsToDiscountRequest,
  AddProductsToDiscountResponse,
  CreateDiscountRequest,
  CreateDiscountResponse,
  DeleteDiscountResponse,
  GetDiscountRequest,
  GetDiscountResponse,
  ListDiscountsRequest,
  ListDiscountsResponse,
  RemoveProductsFromDiscountRequest,
  RemoveProductsFromDiscountResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
} from '@resala/shared';
import {
  AddProductsToDiscountSchema,
  CreateDiscountSchema,
  DeleteDiscountSchema,
  GetDiscountSchema,
  ListDiscountsSchema,
  RemoveProductsFromDiscountSchema,
  UpdateDiscountSchema,
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
import { validate } from '../../middlewares/validateHandler.js';
import { DiscountService } from './discount.service.js';

@Tags('Discount')
@Route('api/v1/discounts')
export class DiscountController extends Controller {
  private readonly discountService: DiscountService;

  constructor() {
    super();
    this.discountService = new DiscountService(db);
  }

  @Get('{discountId}')
  @Middlewares([validate(GetDiscountSchema)])
  public async get(
    @Path() discountId: string,
    @Queries() queries: GetDiscountRequest['query']
  ): Promise<GetDiscountResponse> {
    const discount = await this.discountService.get(discountId, queries);

    return { success: true, data: discount };
  }

  @Get()
  @Middlewares([validate(ListDiscountsSchema)])
  public async list(
    @Queries() query: ListDiscountsRequest['query']
  ): Promise<ListDiscountsResponse> {
    const { discounts, pagination } = await this.discountService.list(query);

    return { success: true, data: { pagination, discounts } };
  }

  /** Create a new discount, only admins can create discount */
  @Post()
  @Security('jwt_auth')
  @SuccessResponse('201', 'Discount created')
  @Middlewares([validate(CreateDiscountSchema), authorizeRole(['ADMIN', 'MODERATOR'])])
  public async create(
    @Body() body: CreateDiscountRequest['body']
  ): Promise<CreateDiscountResponse> {
    const discount = await this.discountService.create(body);

    return { success: true, data: discount };
  }

  /** Update a discount, only admins can update discount */
  @Put('{discountId}')
  @Security('jwt_auth')
  @Middlewares([validate(UpdateDiscountSchema), authorizeRole(['ADMIN', 'MODERATOR'])])
  public async update(
    @Path() discountId: string,
    @Body() body: UpdateDiscountRequest['body']
  ): Promise<UpdateDiscountResponse> {
    const discount = await this.discountService.update(discountId, body);

    return { success: true, data: discount };
  }

  /** Delete a discount, only admins can delete discount */
  @Delete('{discountId}')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(DeleteDiscountSchema)])
  public async delete(@Path() discountId: string): Promise<DeleteDiscountResponse> {
    const discount = await this.discountService.delete(discountId);

    return { success: true, data: discount };
  }

  /** Add products to a discount */
  @Post('{discountId}/products')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(AddProductsToDiscountSchema)])
  public async addProducts(
    @Path() discountId: string,
    @Body() body: AddProductsToDiscountRequest['body']
  ): Promise<AddProductsToDiscountResponse> {
    await this.discountService.addProducts(+discountId, body.productIds);

    return { success: true };
  }

  /** Remove products from a discount */
  @Delete('{discountId}/products')
  @Security('jwt_auth')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR']), validate(RemoveProductsFromDiscountSchema)])
  public async removeProducts(
    @Path() discountId: string,
    @Queries() query: RemoveProductsFromDiscountRequest['query']
  ): Promise<RemoveProductsFromDiscountResponse> {
    await this.discountService.removeProducts(+discountId, query.productIds);

    return { success: true };
  }
}
