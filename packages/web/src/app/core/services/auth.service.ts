import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS, Endpoints } from '@resala/shared';
import { jwtDecode } from 'jwt-decode';
import type { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  signOut: boolean = false;
  userInfo: any;
  baseURL: string = environment.apiUrl;

  register(userData: object): Observable<any> {
    const { method, url } = ENDPOINT_CONFIGS[Endpoints.register];
    return this._HttpClient[method as 'post'](this.baseURL + url, userData);
  }

  login(userdata: any): Observable<any> {
    const { method, url } = ENDPOINT_CONFIGS[Endpoints.login];
    return this._HttpClient[method](this.baseURL + url, userdata);
  }

  decodeUser(): void {
    const encode = localStorage.getItem('etoken');

    if (encode != null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      this.signOut = true;
    }
  }
}
