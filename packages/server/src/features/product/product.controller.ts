import {
  type CreateProductResponse,
  CreateProductSchema,
  type DeleteProductResponse,
  type GetProductResponse,
  type ListProductsResponse,
  ListProductsSchema,
  type UpdateProductResponse,
  UpdateProductSchema,
} from '@resala/shared';
import {
  Controller,
  Delete,
  FormField,
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
  UploadedFile,
} from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { enforceJwt } from '../../middlewares/authentication.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { validateImage } from '../../middlewares/uploadHandler.js';
import { validate } from '../../middlewares/validateHandler.js';
import { FileService } from '../filestorage/file.service.js';
import { S3FileStorage } from '../filestorage/s3.filestorage.js';
import { ProductService } from './product.service.js';

@Tags('Product')
@Security('JWT_SECRET')
@Route('api/v1/products')
export class ProductController extends Controller {
  private readonly productService: ProductService;

  constructor() {
    super();

    const fileServer = new FileService(new S3FileStorage());
    this.productService = new ProductService(db, fileServer);
  }

  @Get('{productId}')
  public async get(@Path() productId: string): Promise<GetProductResponse> {
    const product = await this.productService.get(+productId);

    return { success: true, data: product };
  }

  @Get()
  @Middlewares([validate(ListProductsSchema)])
  public async list(
    @Query() page: number = 1,
    @Query() limit: number = 10,
    @Query() search?: string,
    @Query() categoryId?: number
  ): Promise<ListProductsResponse> {
    const { products, pagination } = await this.productService.list({
      page,
      limit,
      search,
      categoryId,
    });

    return { success: true, data: { pagination, products } };
  }

  /** Create a new product, only admins can create products */
  @Post()
  @SuccessResponse('201', 'Product created')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  public async create(
    @FormField() categoryId: string,
    @FormField() arName: string,
    @FormField() enName: string,
    @FormField() arDescription: string,
    @FormField() enDescription: string,
    @FormField() price: number,
    @UploadedFile() image: Express.Multer.File
  ): Promise<CreateProductResponse> {
    validateImage(image);

    const { body } = await CreateProductSchema.parseAsync({
      body: { categoryId, arName, enName, arDescription, enDescription, price },
    });

    const data = await this.productService.create({ ...body, file: image });

    return { success: true, data };
  }

  /** Update a product, only admins can update products */
  @Put('{productId}')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  public async update(
    @Path() productId: string,
    @FormField() categoryId: number,
    @FormField() arName: string,
    @FormField() enName: string,
    @FormField() arDescription: string,
    @FormField() enDescription: string,
    @FormField() price: number,
    @UploadedFile() image?: Express.Multer.File
  ): Promise<UpdateProductResponse> {
    image && validateImage(image);

    const { body } = await UpdateProductSchema.parseAsync({
      params: { productId },
      body: { categoryId, arName, enName, arDescription, enDescription, price },
    });

    const data = await this.productService.update(+productId, { ...body, file: image });

    return { success: true, data };
  }

  /** Delete a product, only admins can delete products */
  @Delete('{productId}')
  @Middlewares([enforceJwt, authorizeRole(['ADMIN', 'MODERATOR'])])
  public async delete(@Path() productId: string): Promise<DeleteProductResponse> {
    const data = await this.productService.delete(+productId);

    return { success: true, data };
  }
}
