/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams, withQueryParams } from '../../../../../shared/src/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
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
    return this._HttpClient.post(this.baseURL + url, userAddress, 
      {
      headers: this.myToken,
      }
  );
  }

  getListAddressUser(id:any): Observable<any> {
    const { url } = withQueryParams(ENDPOINT_CONFIGS.listAddress,{userId:id});
    return this._HttpClient.get(this.baseURL + url, {
      headers: this.myToken,
    });
  }

  deleteUserAddress(userId:any , addressId:any ):Observable<any>{
   const withParamsConfig :any = withParams(ENDPOINT_CONFIGS[Endpoints.deleteAddress],addressId=addressId)
   const {url} = withQueryParams(withParamsConfig,{userId:userId})
    return this._HttpClient.delete(this.baseURL + url,
      {
        headers:this.myToken
      })
  }

  updateUserAddress(addressId:any, userAddress:object):Observable<any>{
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.updateAddress],addressId+'')
    return this._HttpClient.put(this.baseURL+url,userAddress
      ,
      {
        headers:this.myToken
      }
    )
  }

  userOrder(userAddressId: number, payInfo: string, note: string): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.createOrder]);
    return this._HttpClient.post(
      this.baseURL + url,
      {
        addressId: userAddressId,
        paymentMethod: payInfo,
        note: note,
        
      },
      {
        headers: this.myToken,
      }
    );
  }
}
