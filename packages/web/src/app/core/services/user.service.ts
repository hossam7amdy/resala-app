import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, ListOrdersResponse, withQueryParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HTTPClient: HttpClient) {}

  getUserOrders(userId: string): Observable<ListOrdersResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listOrders, { userId: userId, limit: '5' });
    return this._HTTPClient.get<ListOrdersResponse>(environment.baseUrl + url);
  }
}
