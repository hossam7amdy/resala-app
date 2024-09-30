/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import {
  ENDPOINT_CONFIGS,
  Endpoints,
  withParams,
  withQueryParams,
} from '../../../../../shared/src/endpoints';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) {}

  // baseURL: string = `https://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  //base url =

  // refactor free API url
  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return { headers };
  }

  // Products
  getProducts(currentPage: string = '1', limitProducts: string = '10'): Observable<any> {
    console.log(this.getHeaders());
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, {
      page: currentPage,
      limit: limitProducts,
    });
    return this._HttpClient.get(environment.BASE_URL + url, this.getHeaders());
  }

  // Products
  getProductsSearch(searchText: string): Observable<any> {
    console.log(this.getHeaders());
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, {
      search: searchText,
      limit: '100',
    });
    return this._HttpClient.get(environment.BASE_URL + url, this.getHeaders());
  }
  //'/api/v1/products?page=1&limit=10&query='

  //Product Details
  getProductDetails(id: any): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.getProduct, { productId: id! });
    return this._HttpClient.get(`${environment.BASE_URL}/api/v1/products/${id}`, this.getHeaders());
  }

  getProductStock(id: string | null): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listStocks, { productId: id! });
    return this._HttpClient.get(environment.BASE_URL + url, this.getHeaders());
  }
}
