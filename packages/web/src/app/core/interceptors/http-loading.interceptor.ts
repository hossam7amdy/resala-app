import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    this.spinnerService.show('httpSpinner');

    return next.handle(request).pipe(
      delay(100),
      finalize(() => this.spinnerService.hide('httpSpinner'))
    );
  }
}
