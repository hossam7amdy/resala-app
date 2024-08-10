/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  //base url =

  // Products
  getProducts(): Observable<any> {
    return this._HttpClient.get(this.baseURL + '/api/v1/products?page=1&limit=10&query=');
  }

  //Product Details
  getProductDetails(id: string | null): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.getProduct], id + '');
    return this._HttpClient.get(this.baseURL + url);
  }

  getProductStock(id: string | null): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS.listProductStocks, id + '');
    return this._HttpClient.get(this.baseURL + url);
  }
}
