import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ENDPOINT_CONFIGS,
  GetUserResponse,
  ListOrdersResponse,
  withParams,
  withQueryParams,
} from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HTTPClient: HttpClient) {}
  private getHeaders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('etoken')}`,
    });
    return { headers };
  }

  getUserInfo(userId: string): Observable<GetUserResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.getUser, userId);
    return this._HTTPClient.get<GetUserResponse>(environment.baseUrl + url, this.getHeaders());
  }

  getUserOrders(userId: string): Observable<ListOrdersResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listOrders, { userId: userId, limit: '5' });
    return this._HTTPClient.get<ListOrdersResponse>(environment.baseUrl + url, this.getHeaders());
  }
}
