import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, ListReviewsResponse, withQueryParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private _httpClient: HttpClient) {}

  getProductReview(productId: string, reviewsLimit: string): Observable<ListReviewsResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listReviews, {
      productId: productId,
      limit: reviewsLimit,
    });
    return this._httpClient.get<ListReviewsResponse>(environment.baseUrl + url);
  }
}
