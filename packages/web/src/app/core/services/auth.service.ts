import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ENDPOINT_CONFIGS,
  ForgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
  ResetPasswordResponse,
} from '@resala/shared';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    private _Toaster: ToastrService
  ) {}

  userNameLogged: BehaviorSubject<string> = new BehaviorSubject('Login');

  private getHeaders(token?: string): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return { headers };
  }

  signOut: boolean = false;
  userInfo: any;

  register(userData: object): Observable<RegisterResponse> {
    const { url } = ENDPOINT_CONFIGS.register;
    return this._HttpClient.post<RegisterResponse>(environment.baseUrl + url, userData);
  }

  login(userData: any): Observable<LoginResponse> {
    const { url } = ENDPOINT_CONFIGS.login;
    return this._HttpClient.post<LoginResponse>(environment.baseUrl + url, userData);
  }

  decodeUser(): void {
    const encode = localStorage.getItem('etoken');

    if (encode != null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      this.signOut = true;
    } else {
      this._Router.navigate(['/login']);
      this._Toaster.error('Please Login the First !!'); //'Should be Login'
    }
  }

  forgotPassword(forgotPwData: any): Observable<ForgotPasswordResponse> {
    const { url } = ENDPOINT_CONFIGS.forgotPassword;
    return this._HttpClient.post<ForgotPasswordResponse>(environment.baseUrl + url, forgotPwData);
  }

  resetPassword(resetPwData: any, token?: string): Observable<ResetPasswordResponse> {
    const { url } = ENDPOINT_CONFIGS.resetPassword;
    return this._HttpClient.post<ResetPasswordResponse>(
      environment.baseUrl + url,
      resetPwData,
      this.getHeaders(token)
    );
  }
}
