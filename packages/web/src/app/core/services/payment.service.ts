import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams, withQueryParams } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}

  // refactor free API url
  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
      Authorization: `Bearer ${localStorage.getItem('etoken')}`,
    });

    return { headers };
  }

  // baseURL: string = `https://api.resala.live`;
  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };

  // countries API
  urlCountries: string = `https://countriesnow.space/api/v0.1/`;

  getAllCountries(): Observable<any> {
    return this._HttpClient.get(this.urlCountries + `countries`);
  }

  // States API
  getAllCities(country: string): Observable<any> {
    return this._HttpClient.post(
      this.urlCountries + `countries/cities`,

      {
        country: country,
      }
    );
  }

  registerUserAddress(userAddress: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.createAddress]);
    console.log(userAddress.userId);
    return this._HttpClient.post(environment.BASE_URL + url, userAddress, this.getHeaders());
  }

  getListAddressUser(id: any): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listAddress, { userId: id });
    return this._HttpClient.get(environment.BASE_URL + url, this.getHeaders());
  }

  deleteUserAddress(userId: any, addressId: any): Observable<any> {
    const withParamsConfig: any = withParams(ENDPOINT_CONFIGS[Endpoints.deleteAddress], addressId);
    const { url } = withQueryParams(withParamsConfig, { userId });
    return this._HttpClient.delete(environment.BASE_URL + url, this.getHeaders());
  }

  updateUserAddress(addressId: any, userAddress: object): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.updateAddress], addressId + '');
    return this._HttpClient.put(environment.BASE_URL + url, userAddress, this.getHeaders());
  }

  userOrder(userAddressId: number, payInfo: string, note: string): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.createOrder]);
    return this._HttpClient.post(
      environment.BASE_URL + url,
      {
        addressId: userAddressId,
        paymentMethod: payInfo,
        note: note,
      },
      this.getHeaders()
    );
  }
}
