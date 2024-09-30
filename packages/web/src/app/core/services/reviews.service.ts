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
export class ReviewsService {
  constructor(private _HTTP: HttpClient) {}

  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
      // 'Authorization':`Bearer ${localStorage.getItem('etoken')}`
    });
    return { headers };
  }

  getProductReview(productId: string, reviewsLimit: string): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listReviews, {
      productId: productId,
      limit: reviewsLimit,
    });
    return this._HTTP.get(environment.BASE_URL + url, this.getHeaders());
  }
}
