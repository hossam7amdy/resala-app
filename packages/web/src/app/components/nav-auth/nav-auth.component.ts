import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Translate_Service } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css'],
})
export class NavAuthComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public _Translate: TranslateService,
    private _RTLStatus: Translate_Service
  ) {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner
  currentLang: string = 'ar';
  langStorage: any = localStorage.getItem('language');

  // Change page Direction as per Selected Lang
  changePageDirection(lang: string) {
    this.customSpinIsLoading = true;
    const html = document.getElementsByTagName('html')[0];
    if (lang === 'ar') {
      html.dir = 'rtl';
      html.lang = 'ar';
    } else {
      html.dir = 'ltr';
      html.lang = 'en';
    }
    this.customSpinIsLoading = false;
  }

  switchLanguage(lang: string): void {
    this.customSpinIsLoading = true;
    localStorage.setItem('language', lang);
    this.langStorage = localStorage.getItem('language');
    window.location.reload();
    this._Translate.use(this.langStorage);
    this.changePageDirection(lang);
    if (lang == 'ar') {
      this.currentLang = 'en';
      this._RTLStatus.rTLStatus.next(lang);
    } else {
      this.currentLang = 'ar';
      this._RTLStatus.rTLStatus.next(lang);
    }
    this.customSpinIsLoading = false;
  }

  ngOnInit(): void {
    this.customSpinIsLoading = true;
    if (this.langStorage === null) {
      this.currentLang = 'ar';
    } else {
      this._Translate.use(this.langStorage);
      if (this.langStorage === 'en') {
        this.currentLang = 'ar';
      } else {
        this.currentLang = 'en';
      }
    }
    this.changePageDirection(this.langStorage);
  }
}
