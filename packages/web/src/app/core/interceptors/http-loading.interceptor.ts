import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, delay, finalize } from 'rxjs';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.show('httpSpinner');

    return next.handle(request).pipe(
      delay(100),
      finalize(() => this.spinnerService.hide('httpSpinner'))
    );
  }
}
