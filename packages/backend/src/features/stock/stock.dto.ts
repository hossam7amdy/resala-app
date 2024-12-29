import type {
  GetStockResponse,
  ListStocksRequest,
  ListStocksResponse,
  UpdateStocksQuantityRequest,
} from '@resala/shared';

type GetStockResponseDto = GetStockResponse['data'];

type UpdateStocksQuantityRequestDto = UpdateStocksQuantityRequest['body'];

type ListStocksRequestDto = ListStocksRequest['query'];
type ListStocksResponseDto = ListStocksResponse['data'];

export type {
  GetStockResponseDto,
  ListStocksRequestDto,
  ListStocksResponseDto,
  UpdateStocksQuantityRequestDto,
};
