import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // baseurl = https://resala-app.onrender.com/

  baseURL: string = `http://ec2-13-60-47-151.eu-north-1.compute.amazonaws.com/`;
  constructor(private _HTTPClient: HttpClient) {}

  getCategories(): Observable<any> {
    return this._HTTPClient.get(this.baseURL + 'api/v1/categories');
  }
}
