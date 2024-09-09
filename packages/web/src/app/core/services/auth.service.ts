/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { ENDPOINT_CONFIGS, Endpoints, withParams } from '../../../../../shared/src/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  signOut: boolean = false;
  userInfo: any;
  baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  //baseurl = https://resala-app.onrender.com/

  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/api/v1/auth/register', userData);
  }

  login(userdata: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/api/v1/auth/login', userdata);
  }

  decodeUser(): void {
    const encode = localStorage.getItem('etoken');

    if (encode != null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      this.signOut = true;
    }
  }


  // Forgot password 
  forgotPassword(forgotPwData:any):Observable<any>{
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.forgotPassword])
    return this._HttpClient.post(this.baseURL+ url ,forgotPwData )
  }

  // Reset Password
  resetPassword(resetPwData: any, token:any):Observable<any>{
    const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.resetPassword])
    return this._HttpClient.post(this.baseURL+ url, resetPwData ,
      {
        headers:token
      }
    )
  }
}
