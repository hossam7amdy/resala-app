import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, withQueryParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private _HTTP: HttpClient) {}

  getProductReview(productId: string, limit: string): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listReviews, { productId, limit });
    return this._HTTP.get(environment.baseUrl + url);
  }
}
