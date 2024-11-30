import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(stockId: string, quantity: string): Observable<CreateCartResponse> {
    const { url } = ENDPOINT_CONFIGS.addItemToCart;
    return this.http.post<CreateCartResponse>(environment.baseUrl + url, {
      stockId: stockId,
      quantity: quantity,
    });
  }

  getCartUser(): Observable<GetCartResponse> {
    const { url } = ENDPOINT_CONFIGS.getUserCart;
    return this.http.get<GetCartResponse>(environment.baseUrl + url);
  }

  removeCartItem(productId: string): Observable<DeleteCartResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.removeItemFromCart, productId + '');
    return this.http.delete<DeleteCartResponse>(environment.baseUrl + url);
  }

  clearCart(): Observable<DeleteCartResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.removeUserCart);
    return this.http.delete<DeleteCartResponse>(environment.baseUrl + url);
  }
}
