/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams, withQueryParams } from '../../../../../shared/src/endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) {}

  // baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  //base url =

  // Products
  getProducts(currentPage:string ='1'): Observable<any> {
    const {url} = withQueryParams(ENDPOINT_CONFIGS.listProducts,{page:currentPage})
    return this._HttpClient.get(environment.BASE_URL + url);
  }
//'/api/v1/products?page=1&limit=10&query='

  //Product Details
  getProductDetails(id: any): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.getProduct, { productId: id! });
    return this._HttpClient.get(`${environment.BASE_URL}/api/v1/products/${id}`);
  }

  getProductStock(id: string | null): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listStocks, { productId: id! });
    return this._HttpClient.get(environment.BASE_URL + url);
  }
}
