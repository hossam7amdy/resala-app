/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, withParams } from '@resala/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}
  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app`;
  myToken: any = { Authorization: `Bearer ${localStorage.getItem('etoken')}` };

  registerUserAddress(userAddress: any): Observable<any> {
    const { url } = ENDPOINT_CONFIGS.createAddress;
    return this._HttpClient.post(this.baseURL + url, userAddress, {
      headers: this.myToken,
    });
  }

  getUserAddress(): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS.listAddress);
    return this._HttpClient.get(this.baseURL + url, {
      headers: this.myToken,
    });
  }

  userOrder(userAddressId: string, payInfo: string, note: string): Observable<any> {
    const { url } = ENDPOINT_CONFIGS.createOrder;
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
