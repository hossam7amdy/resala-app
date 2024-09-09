import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams, withQueryParams } from '../../../../../../shared/src/endpoints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // baseurl = https://resala-app.onrender.com/

  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };

  // baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  constructor(private _HTTPClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  getCategories(): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.listCategories]);
    return this._HTTPClient.get(environment.BASE_URL + url);
  }

  getCategoryProducts(id: any, currentPage:string ='1'): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listProducts,{categoryId:id!, page:currentPage});
    return this._HTTPClient.get(environment.BASE_URL + url);
  }
}
