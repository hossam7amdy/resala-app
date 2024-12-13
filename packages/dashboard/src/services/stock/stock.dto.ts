import type {
  CreateStockRequest,
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
  UpdateStockRequest,
} from '@resala/shared';

type CreateStockRequestDto = CreateStockRequest['body'];

type UpdateStockRequestDto = UpdateStockRequest['body'];

type GetStockResponseDto = GetStockResponse['data'];

type ListStocksRequestDto = ListStocksRequest['query'];
type ListStocksResponseDto = ListStocksResponse['data'];

export type {
  CreateStockRequestDto,
  GetStockResponseDto,
  ListStocksRequestDto,
  ListStocksResponseDto,
  UpdateStockRequestDto,
};
