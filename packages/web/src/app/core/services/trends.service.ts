import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, ListTopProductsResponse } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TrendsService {
  constructor(private _HttpClient: HttpClient) {}

  getTrendProducts(): Observable<ListTopProductsResponse> {
    const { url } = ENDPOINT_CONFIGS.listTopProducts;
    return this._HttpClient.get<ListTopProductsResponse>(environment.baseUrl + url);
  }
}
