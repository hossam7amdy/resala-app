import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Translate_Service {

  constructor() { }

  rTLStatus:BehaviorSubject<any> = new BehaviorSubject(localStorage.getItem("language"));
}
