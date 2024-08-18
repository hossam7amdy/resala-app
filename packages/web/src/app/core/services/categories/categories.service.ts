import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams, withQueryParams } from '@resala/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // baseurl = https://resala-app.onrender.com/

  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };

  baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  constructor(private _HTTPClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  getCategories(): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.listCategories]);
    return this._HTTPClient.get(this.baseURL + url);
  }

  getCategoryProducts(id: any): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS[Endpoints.listProducts], { productId: id });
    return this._HTTPClient.get(this.baseURL + url);
  }
}
