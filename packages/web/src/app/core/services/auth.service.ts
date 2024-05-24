import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  signOut: boolean = false;
  userInfo: any;
  baseURL: string = `http://ec2-13-60-47-151.eu-north-1.compute.amazonaws.com/`;
  //baseurl = https://resala-app.onrender.com/

  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'api/v1/auth/register', userData)

  }

  login(userdata: any): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'api/v1/auth/login', userdata)

  }



  decodeUser(): void {
    const encode = localStorage.getItem('etoken')

    if (encode != null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
      this.signOut = true;

    }
  }
}
