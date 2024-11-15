import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductDetailsComponent,
    RouterLink,
    TranslateModule,
    SpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public _Translate: TranslateService
  ) {}

  customSpinIsLoading = false;

  //show password
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  showPW: any;
  togglePW() {
    this.showPW = !this.showPW;
  }

  errMsg: string = '';
  successMsg: string = '';
  successMsgAr: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(/\d/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[ !@#$%^&*()_=~.,+-:;'"\\|<>/?]/),
        Validators.minLength(8),
      ])
    ),

    sign: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(^[0-9]{11,11}$)|(^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+))?$/
      ),
    ]),
  });

  handleForm(_loginForm: FormGroup): void {
    this.customSpinIsLoading = true;

    const userData = this.loginForm.value;

    if (this.loginForm.valid === true) {
      this._AuthService.login(userData).subscribe({
        next: response => {
          if (response.success == true) {
            localStorage.setItem('accessToken', response.data.accessToken);
            this._AuthService.decodeUser();
            this.successMsg = 'Logged already';
            this.successMsgAr = 'تم تسجيل الدخول بنجاح';
            this.customSpinIsLoading = false;

            const productId = localStorage.getItem('productId');
            if (productId == null) {
              this._Router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            } else {
              this._Router.navigate(['product-details/', productId]).then(() => {
                window.location.reload();
              });
              localStorage.removeItem('productId');
            }
          }
        },
        error: err => {
          this.errMsg = err.error.message;
          this.customSpinIsLoading = false;
        },
      });
    }
  }
}
