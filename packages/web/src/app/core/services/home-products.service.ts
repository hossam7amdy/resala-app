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
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) {}

  getProducts(page: string = '1', limit: string = '10'): Observable<ListProductsResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, { page, limit });

    return this._HttpClient.get<ListProductsResponse>(environment.baseUrl + url);
  }

  getProductsSearch(searchText: string): Observable<ListProductsResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, { search: searchText });

    return this._HttpClient.get<ListProductsResponse>(environment.baseUrl + url);
  }

  getProductDetails(id: string): Observable<GetProductResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.getProduct, id);

    return this._HttpClient.get<GetProductResponse>(`${environment.baseUrl}${url}`);
  }

  getProductStock(id: string): Observable<ListStocksResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listStocks, { productId: id! });

    return this._HttpClient.get<ListStocksResponse>(environment.baseUrl + url);
  }
}
