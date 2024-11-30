import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateWishlistResponse,
  DeleteWishlistResponse,
  ENDPOINT_CONFIGS,
  GetWishlistResponse,
  withParams,
} from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}

  postWishListItems(productId: string): Observable<CreateWishlistResponse> {
    const { url } = ENDPOINT_CONFIGS.addProductToWishlist;
    return this._HttpClient.post<CreateWishlistResponse>(environment.baseUrl + url, { productId });
  }

  getAllMyProducts(): Observable<GetWishlistResponse> {
    const { url } = ENDPOINT_CONFIGS.getUserWishlist;
    return this._HttpClient.get<GetWishlistResponse>(environment.baseUrl + url);
  }

  deleteMyFavoriteProduct(productId: string): Observable<DeleteWishlistResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.removeProductFromWishlist, productId);
    return this._HttpClient.delete<DeleteWishlistResponse>(environment.baseUrl + url);
  }
}
