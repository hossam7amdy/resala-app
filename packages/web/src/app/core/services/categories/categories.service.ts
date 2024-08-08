import type { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // baseurl = https://resala-app.onrender.com/

  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;
  constructor(private _HTTPClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCategories(): Observable<any> {
    return this._HTTPClient.get(this.baseURL + 'api/v1/categories');
  }
}
