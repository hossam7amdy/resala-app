import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type DefaultRequestQuery, ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;
  //base url =

  // Products

  getProducts(): Observable<any> {
    return this._HttpClient.get(this.baseURL + 'api/v1/products?page=1&limit=10&query=');
  }

  //Product Details
  getProductDetails(id: string | null): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.getProduct], id + '');
    return this._HttpClient.get(this.baseURL + url);
  }

  getProductStock(id: string | null): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.getProductStocks], id + '');
    return this._HttpClient.get(this.baseURL + url);
  }
}
