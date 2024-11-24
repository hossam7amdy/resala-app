import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateAddressResponse,
  CreateOrderResponse,
  DeleteAddressResponse,
  ENDPOINT_CONFIGS,
  ListAddressResponse,
  UpdateAddressResponse,
  withParams,
  withQueryParams,
} from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}

  private getHeaders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });

    return { headers };
  }

  // countries API
  urlCountries: string = `https://countriesnow.space/api/v0.1/`;

  getAllCountries(): Observable<any> {
    return this._HttpClient.get(this.urlCountries + `countries`);
  }

  getAllCities(country: string): Observable<any> {
    return this._HttpClient.post(this.urlCountries + `countries/cities`, { country: country });
  }

  registerUserAddress(userAddress: any): Observable<CreateAddressResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.createAddress);
    return this._HttpClient.post<CreateAddressResponse>(
      environment.baseUrl + url,
      userAddress,
      this.getHeaders()
    );
  }

  getListAddressUser(id: any): Observable<ListAddressResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listAddress, { userId: id });
    return this._HttpClient.get<ListAddressResponse>(environment.baseUrl + url, this.getHeaders());
  }

  deleteUserAddress(userId: any, addressId: any): Observable<DeleteAddressResponse> {
    const withParamsConfig: any = withParams(ENDPOINT_CONFIGS.deleteAddress, addressId);
    const { url } = withQueryParams(withParamsConfig, { userId });
    return this._HttpClient.delete<DeleteAddressResponse>(
      environment.baseUrl + url,
      this.getHeaders()
    );
  }

  updateUserAddress(addressId: any, userAddress: object): Observable<UpdateAddressResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.updateAddress, addressId + '');
    return this._HttpClient.put<UpdateAddressResponse>(
      environment.baseUrl + url,
      userAddress,
      this.getHeaders()
    );
  }

  userOrder(userAddressId: number, payInfo: string, note: string): Observable<CreateOrderResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.checkout);
    return this._HttpClient.post<CreateOrderResponse>(
      environment.baseUrl + url,
      { addressId: userAddressId, paymentMethod: payInfo, note: note },
      this.getHeaders()
    );
  }
}
