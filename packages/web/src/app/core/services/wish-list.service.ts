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

  postWishListItems(productId: any): Observable<CreateWishlistResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.addProductToWishlist);
    return this._HttpClient.post<CreateWishlistResponse>(environment.baseUrl + url, {
      productId: productId,
    });
  }

  getAllMyProducts(): Observable<GetWishlistResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.getUserWishlist);
    return this._HttpClient.get<GetWishlistResponse>(environment.baseUrl + url);
  }

  deleteMyFavoriteProduct(id: any): Observable<DeleteWishlistResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.removeProductFromWishlist, id + '');
    return this._HttpClient.delete<DeleteWishlistResponse>(environment.baseUrl + url);
  }
}
