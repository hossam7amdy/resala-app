import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) { }

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0)

  baseUrl: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;

  // add item on cart
  addToCart(stockId: string, quantity: string): Observable<any> {
    return this.http.post(this.baseUrl + `api/v1/cart/items`, {
      stockId: stockId,
      quantity: quantity,
    });
  }


  // get cart page

  getCartUser(): Observable<any> {
    return this.http.get(this.baseUrl + `api/v1/cart`)
  }

  // remove item
  removeCartItem(productId: string): Observable<any> {
    return this.http.delete(this.baseUrl + `api/v1/cart/items/${productId}`)
  }

  // remove All Items from User
  clearCart(): Observable<any> {
    return this.http.delete(this.baseUrl + `api/v1/cart`)
  }
}
