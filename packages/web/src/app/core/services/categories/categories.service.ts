import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ENDPOINT_CONFIGS,
  ListCategoriesResponse,
  ListProductsResponse,
  withQueryParams,
} from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  myToken = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };

  constructor(private _HTTPClient: HttpClient) {}

  getCategories(): Observable<ListCategoriesResponse> {
    const { url } = ENDPOINT_CONFIGS.listCategories;
    return this._HTTPClient.get<ListCategoriesResponse>(environment.baseUrl + url);
  }

  getCategoryProducts(id?: string, currentPage: string = '1'): Observable<ListProductsResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts, {
      categoryId: id!,
      page: currentPage,
    });
    return this._HTTPClient.get<ListProductsResponse>(environment.baseUrl + url);
  }
}
