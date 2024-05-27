import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // baseurl = https://resala-app.onrender.com/

  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;
  constructor(private _HTTPClient: HttpClient) {}

  getCategories(): Observable<any> {
    return this._HTTPClient.get(this.baseURL + 'api/v1/categories');
  }
}
