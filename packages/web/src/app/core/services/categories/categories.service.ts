import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINT_CONFIGS } from '@resala/shared';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseURL: string = environment.apiUrl;
  constructor(private _HTTPClient: HttpClient) {}

  getCategories(): Observable<any> {
    const { url } = ENDPOINT_CONFIGS.listCategories;
    return this._HTTPClient.get(this.baseURL + url);
  }
}
