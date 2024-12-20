import type { GetStockResponse, ListStocksRequest, ListStocksResponse } from '@resala/shared';

type GetStockResponseDto = GetStockResponse['data'];

type ListStocksRequestDto = ListStocksRequest['query'];
type ListStocksResponseDto = ListStocksResponse['data'];

export type { GetStockResponseDto, ListStocksRequestDto, ListStocksResponseDto };
