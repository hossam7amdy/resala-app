import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}

  // refactor free API url
  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
      Authorization: `Bearer ${localStorage.getItem('etoken')}`,
    });

    return { headers };
  }

  //base URL
  // baseUrl: string = `https://api.resala.live`;

  // My token
  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };

  //post items wishtlist method
  postWishListItems(productId: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.addProductToWishlist]);
    return this._HttpClient.post(
      environment.BASE_URL + url,
      {
        productId: productId,
      },
      this.getHeaders()
    );
  }

  // get all favourits products
  getAllMyProducts(): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.getUserWishlist]);
    return this._HttpClient.get(environment.BASE_URL + url, this.getHeaders());
  }

  //Delelte product from my favorite
  deleteMyFavoriteProduct(id: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.removeProductFromWishlist], id + '');
    return this._HttpClient.delete(environment.BASE_URL + url, this.getHeaders());
  }
}
