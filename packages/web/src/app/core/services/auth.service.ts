/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints, withParams } from '@resala/shared';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  userNameLogged: BehaviorSubject<string> = new BehaviorSubject('Login');

  myToken: any;
  // refactor free API url
  private getHeaders() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
      Authorization: `Bearer ${this.myToken}`,
    });
    return { headers };
  }

  signOut: boolean = false;
  userInfo: any;
  // baseURL: string = `http://ec2-13-49-159-109.eu-north-1.compute.amazonaws.com`;
  //baseurl = https://resala-app.onrender.com/

  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      environment.BASE_URL + '/api/v1/auth/register',
      userData,
      this.getHeaders()
    );
  }

  login(userdata: any): Observable<any> {
    return this._HttpClient.post(
      environment.BASE_URL + '/api/v1/auth/login',
      userdata,
      this.getHeaders()
    );
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
  forgotPassword(forgotPwData: any): Observable<any> {
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.forgotPassword]);
    return this._HttpClient.post(environment.BASE_URL + url, forgotPwData);
  }

  // Reset Password
  resetPassword(resetPwData: any, token: any): Observable<any> {
    this.myToken = token;
    const { url } = withParams(ENDPOINT_CONFIGS[Endpoints.resetPassword]);
    return this._HttpClient.post(environment.BASE_URL + url, resetPwData, this.getHeaders());
  }
}
