import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = 'https://resala-app.onrender.com/';

  getProducts(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'api/v1/products?page=1&limit=10&query=&deleted=true'
    );
  }
}
