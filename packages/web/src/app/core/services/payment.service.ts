import { HttpClient } from '@angular/common/http';
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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // TODO: abstract countries API to a separate service
  urlCountries: string = `https://countriesnow.space/api/v0.1/`;

  constructor(private _httpClient: HttpClient) {}

  getAllCountries(): Observable<any> {
    return this._httpClient.get(this.urlCountries + `countries`);
  }

  // States API
  getAllCities(country: string): Observable<any> {
    return this._httpClient.post(this.urlCountries + `countries/cities`, { country });
  }

  registerUserAddress(userAddress: any): Observable<CreateAddressResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.createAddress);
    return this._httpClient.post<CreateAddressResponse>(environment.baseUrl + url, userAddress);
  }

  getListAddressUser(userId: string): Observable<ListAddressResponse> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listAddress, { userId });
    return this._httpClient.get<ListAddressResponse>(environment.baseUrl + url);
  }

  deleteUserAddress(userId: string, addressId: string): Observable<DeleteAddressResponse> {
    const withParamsConfig = withParams(ENDPOINT_CONFIGS.deleteAddress, addressId);
    const { url } = withQueryParams(withParamsConfig, { userId });
    return this._httpClient.delete<DeleteAddressResponse>(environment.baseUrl + url);
  }

  updateUserAddress(addressId: string, userAddress: object): Observable<UpdateAddressResponse> {
    const { url } = withParams(ENDPOINT_CONFIGS.updateAddress, addressId);
    return this._httpClient.put<UpdateAddressResponse>(environment.baseUrl + url, userAddress);
  }

  userOrder(userAddressId: string, payInfo: string, note: string): Observable<CreateOrderResponse> {
    const { url } = ENDPOINT_CONFIGS.checkout;
    return this._httpClient.post<CreateOrderResponse>(environment.baseUrl + url, {
      addressId: userAddressId,
      paymentMethod: payInfo,
      note: note,
    });
  }
}
