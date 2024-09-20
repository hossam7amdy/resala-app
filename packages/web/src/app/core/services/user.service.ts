import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT_CONFIGS, Endpoints, withParams, withQueryParams } from '../../../../../shared/src/endpoints';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _HTTPClient:HttpClient
  ) { }
  //myToken:any;
  // refactor free API url 
private getHeaders() {
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning':  '69420',
    'Authorization':`Bearer ${localStorage.getItem('etoken')}`
  });
  return {headers};
}

getUserInfo(userId:any):Observable<any>{
  const {url} = withParams(ENDPOINT_CONFIGS[Endpoints.getUser],userId=userId)
  return this._HTTPClient.get(environment.BASE_URL+ url,this.getHeaders())
}

getUserOrders(userId:any):Observable<any>{

  const {url} = withQueryParams(ENDPOINT_CONFIGS.listOrders,{userId:userId,limit:'5'})
  return this._HTTPClient.get(environment.BASE_URL+url , this.getHeaders())
}
}
