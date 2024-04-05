import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseURL: string = 'https://resala-app.onrender.com/';
  constructor(private _HTTPClient: HttpClient) {}

  getCategories(): Observable<any> {
    return this._HTTPClient.get(this.baseURL + 'api/v1/categories');
  }
}
