/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams } from '../../../../../shared/src/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}

  //base URL
  baseUrl: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;

  // My token
  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };

  //post items wishtlist method
  postWishListItems(productId: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.addProductToWishlist]);
    return this._HttpClient.post(
      this.baseUrl + url,
      {
        productId: productId,
      },
      {
        headers: this.myToken,
      }
    );
  }

  // get all favourits products
  getAllMyProducts(): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.getUserWishlist]);
    return this._HttpClient.get(this.baseUrl + url, {
      headers: this.myToken,
    });
  }

  //Delelte product from my favorite
  deleteMyFavoriteProduct(id: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.removeProductFromWishlist], id + '');
    return this._HttpClient.delete(this.baseUrl + url, {
      headers: this.myToken,
    });
  }
}
