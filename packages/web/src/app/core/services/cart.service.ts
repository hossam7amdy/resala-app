import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  baseUrl: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;

  addToCart(stockId: string, quantity: string): Observable<any> {

    return this.http.post(this.baseUrl + `api/v1/cart/items`,
      { stockId: stockId, quantity: quantity },
    )
  }
}
