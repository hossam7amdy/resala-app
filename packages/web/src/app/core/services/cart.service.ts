import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateCartResponse,
  DeleteCartResponse,
  ENDPOINT_CONFIGS,
  GetCartResponse,
  withParams,
} from '@resala/shared';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _httpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(stockId: string, quantity: string): Observable<CreateCartResponse> {
    const { url } = ENDPOINT_CONFIGS.addItemToCart;
    return this._httpClient.post<CreateCartResponse>(environment.baseUrl + url, {
      stockId: stockId,
      quantity: quantity,
    });
  }

  getCartUser(): Observable<GetCartResponse> {
    const { url } = ENDPOINT_CONFIGS.getUserCart;
    return this._httpClient.get<GetCartResponse>(environment.baseUrl + url);
  }

  removeCartItem(productId: string): Observable<DeleteCartResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.removeItemFromCart, productId + '');
    return this._httpClient.delete<DeleteCartResponse>(environment.baseUrl + url);
  }

  clearCart(): Observable<DeleteCartResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.removeUserCart);
    return this._httpClient.delete<DeleteCartResponse>(environment.baseUrl + url);
  }
}
