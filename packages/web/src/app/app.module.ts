import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptors } from './core/interceptors';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


//@syncfusion/ej2-angular-navigations

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [...httpInterceptors],
  bootstrap: [AppComponent],
})
export class AppModule { }
