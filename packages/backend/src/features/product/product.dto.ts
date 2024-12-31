import type {
  Color,
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  Size,
  Stock,
  UpdateProductRequest,
  UpdateProductResponse,
} from '@resala/shared';

type ProductStocksDto = Array<
  Stock & {
    size: Size;
    color: Color;
  }
>;

type CreateProductRequestDto = CreateProductRequest['body'];
type CreateProductResponseDto = CreateProductResponse['data'];

type UpdateProductRequestDto = UpdateProductRequest['body'];
type UpdateProductResponseDto = UpdateProductResponse['data'];

type DeleteProductResponseDto = DeleteProductResponse['data'];

type GetProductResponseDto = GetProductResponse['data'];

type ListProductsRequestDto = ListProductsRequest['query'];
type ListProductsResponseDto = ListProductsResponse['data'];

export type {
  ProductStocksDto,
  CreateProductRequestDto,
  CreateProductResponseDto,
  UpdateProductRequestDto,
  UpdateProductResponseDto,
  DeleteProductResponseDto,
  GetProductResponseDto,
  ListProductsRequestDto,
  ListProductsResponseDto,
};
