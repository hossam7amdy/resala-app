import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) { }

  signOut: boolean = false;
  userInfo: any;
  baseURL: string = `https://resala-app-6ba5cpyy5q-ey.a.run.app/`;
  //baseurl = https://resala-app.onrender.com/

  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'api/v1/auth/register', userData);
  }

  login(userdata: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'api/v1/auth/login', userdata);
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
