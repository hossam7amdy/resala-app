import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type DefaultRequestQuery, ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  private readonly baseURL = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}

  // Products
  getProducts(
    query: DefaultRequestQuery['query'] = {
      page: 1,
      limit: 10,
      query: '',
    }
  ): Observable<any> {
    const { url } = ENDPOINT_CONFIGS[Endpoints.getProductsList];
    return this._HttpClient.get(
      this.baseURL + `${url}?page=${query.page}&limit=${query.limit}&query=${query.query}`
    );
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
