/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { withQueryParams, withParams, ENDPOINT_CONFIGS, Endpoints } from '../../../../../shared/src/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  // token = (`Bearer ${localStorage.getItem('etoken')}`);
  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  // baseUrl: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;

  // add item on cart
  addToCart(stockId: string, quantity: string): Observable<any> {
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.addItemToCart])
    return this.http.post(environment.BASE_URL + url,
      {
        stockId: stockId,
        quantity: quantity,
      },
      {
        headers: this.myToken,
      }
    );
  }

  // get cart page

  getCartUser(): Observable<any> {
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.getUserCart])
    return this.http.get(environment.BASE_URL + url, {
      headers: this.myToken,
    });
  }

  // remove item
  removeCartItem(productId: string): Observable<any> {
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.removeItemFromCart],productId+'')
    return this.http.delete(environment.BASE_URL + `/api/v1/cart/items/${productId}`, {
      headers: this.myToken,
    });
  }

  // remove All Items from User
  clearCart(): Observable<any> {
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.removeUserCart])
    return this.http.delete(environment.BASE_URL +url, {
      headers: this.myToken,
    });
  }
}
