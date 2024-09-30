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
export class TrendsService {
  constructor(private _HttpClient: HttpClient) {}

  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return { headers };
  }

  getTrendProducts(): Observable<any> {
    return this._HttpClient.get(
      environment.BASE_URL + `/api/v1/dashboard/top-products`,
      this.getHeaders()
    );
  }
}
