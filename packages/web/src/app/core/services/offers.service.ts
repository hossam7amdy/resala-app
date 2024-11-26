import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private _HTTPClient: HttpClient) {}

  getOffers(): Observable<any> {
    const { url } = ENDPOINT_CONFIGS.getDiscount;
    return this._HTTPClient.get(environment.baseUrl + url);
  }
}
