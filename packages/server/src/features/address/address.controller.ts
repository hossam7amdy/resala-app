import {
  CreateAddressRequest,
  type CreateAddressResponse,
  CreateAddressSchema,
  type DeleteAddressResponse,
  DeleteAddressSchema,
  type ListAddressResponse,
  ListAddressSchema,
  UpdateAddressRequest,
  type UpdateAddressResponse,
  UpdateAddressSchema,
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
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { authorization } from '../../middlewares/authorization.js';
import { validate } from '../../middlewares/validateHandler.js';
import { AddressService } from './address.service.js';

@Tags('Address')
@Route('api/v1/addresses')
@Security('jwt_auth')
@Middlewares([authorization])
export class AddressController extends Controller {
  private readonly addressService: AddressService;

  constructor() {
    super();
    this.addressService = new AddressService(db);
  }

  @Get()
  @Middlewares([validate(ListAddressSchema)])
  public async listUserAddress(@Query() userId: number): Promise<ListAddressResponse> {
    const addresses = await this.addressService.list(userId);

    return { success: true, data: addresses };
  }

  @Post()
  @Middlewares([validate(CreateAddressSchema)])
  @SuccessResponse('201', 'Address created')
  public async createUserAddress(
    @Body() body: CreateAddressRequest['body']
  ): Promise<CreateAddressResponse> {
    const address = await this.addressService.create(body);

    return { success: true, data: address };
  }

  @Put('{addressId}')
  @Middlewares([validate(UpdateAddressSchema)])
  public async updateUserAddress(
    @Path() addressId: string,
    @Body() body: UpdateAddressRequest['body']
  ): Promise<UpdateAddressResponse> {
    const address = await this.addressService.update(+addressId, body);

    return { success: true, data: address };
  }

  @Delete('{addressId}')
  @Middlewares([validate(DeleteAddressSchema)])
  public async deleteUserAddress(
    @Path() addressId: string,
    @Queries() _: { userId: string }
  ): Promise<DeleteAddressResponse> {
    const address = await this.addressService.delete(+addressId);

    return { success: true, data: address };
  }
}
