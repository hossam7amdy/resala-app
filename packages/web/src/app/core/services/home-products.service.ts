import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeProductsService {
  constructor(private _HttpClient: HttpClient) { }

  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;
  //base url = 

  // Products

  getProducts(): Observable<any> {
    return this._HttpClient.get(
      this.baseURL + 'api/v1/products?page=1&limit=10&query='
    );
  }

  //Product Details

  getProductDetails(id: string | null): Observable<any> {
    return this._HttpClient.get(this.baseURL + `api/v1/products/${id}`);
  }

  getProductStock(id: string | null): Observable<any> {
    return this._HttpClient.get(this.baseURL + `api/v1/products/${id}/stocks`);
  }
}
