import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type DefaultRequestQuery, ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private _HttpClient: HttpClient
  ) { }
  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app`;
  myToken: any = { 'Authorization': `Bearer ${localStorage.getItem('etoken')}` }

  // countries API 
  urlCountries: string = `https://countriesnow.space/api/v0.1/`;

  getAllCountries(): Observable<any> {
    return this._HttpClient.get(this.urlCountries + `countries`)
  }

  // States API
  getAllCities(country: string): Observable<any> {
    return this._HttpClient.post(this.urlCountries + `countries/cities`,

      {
        country: country
      }
    )
  }

  registerUserAddress(userAddress: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.createAddress])
    return this._HttpClient.post(this.baseURL + url, userAddress, {
      headers: this.myToken
    })
  }

  getUserAddress(): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.getAddressList])
    return this._HttpClient.get(this.baseURL + url,
      {
        headers: this.myToken
      })
  }

  userOrder(userAddressId: string, payInfo: string, note: string): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.createOrder])
    return this._HttpClient.post(this.baseURL + url, {
      addressId: userAddressId,
      paymentMethod: payInfo,
      note: note
    },
      {
        headers: this.myToken
      })
  }




}
