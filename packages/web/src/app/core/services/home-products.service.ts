import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ENDPOINT_CONFIGS,
  GetProductResponse,
  ListProductsResponse,
  ListStocksResponse,
  withParams,
  withQueryParams,
} from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _httpClient: HttpClient) {}

  getProducts(
    currentPage: string = '1',
    limitProducts: string = '10'
  ): Observable<ListProductsResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, {
      page: currentPage,
      limit: limitProducts,
    });
    return this._httpClient.get<ListProductsResponse>(environment.baseUrl + url);
  }

  getProductsSearch(searchText: string): Observable<ListProductsResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, {
      search: searchText,
      limit: '100',
    });
    return this._httpClient.get<ListProductsResponse>(environment.baseUrl + url);
  }

  getProductDetails(productId: string): Observable<GetProductResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.getProduct, productId);
    return this._httpClient.get<GetProductResponse>(`${environment.baseUrl}${url}`);
  }

  getProductStock(productId: string): Observable<ListStocksResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listStocks, { productId });
    return this._httpClient.get<ListStocksResponse>(environment.baseUrl + url);
  }
}
