import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, withQueryParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private _HTTPClient: HttpClient) {}

  // refactor free API url
  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
      // Authorization: `Bearer ${localStorage.getItem('etoken')}`,
    });

    return { headers };
  }

  getOffers(): Observable<object> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.getDiscount, {});
    return this._HTTPClient.get(environment.BASE_URL + url, this.getHeaders());
  }
}
