import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

import { ProductDetailsComponent } from '../product-details/product-details.component';

// import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
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
    // private _productDetailsComponent: ProductDetailsComponent
  ) {}

  // start Custome Spinner
  customSpinIsLoading = false;
  //end Custome Spinner

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

  //properity => Return to product details page after login

  // can use FormBulder instead of  new FormGroup (lookup leson 9)

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

  //|| Validators.pattern(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
  // /^01[0125][0-9]{8}$/

  // getUserInfo(firstName:string):void{
  //   this._AuthService.userNameLogged.next(firstName);
  // }

  handleForm(_loginForm: FormGroup): void {
    this.customSpinIsLoading = true;

    const userData = this.loginForm.value;

    if (this.loginForm.valid === true) {
      console.log('data is valed');
      console.log(userData);
      // let loginData = userData
      this._AuthService.login(userData).subscribe({
        next: response => {
          console.log(response.data.accessToken);
          if (response.success == true) {
            localStorage.setItem('etoken', response.data.accessToken);
            this._AuthService.decodeUser();
            this.successMsg = 'Logged already';
            this.successMsgAr = 'تم تسجيل الدخول بنجاح';
            // this.getUserInfo(response.data.user.firstName);
            // this._AuthService.userNameLogged.next(response.data.user.firstName);
            this.customSpinIsLoading = false;

            // this._Router.navigate(['/home']);

            // // can use Redirect

            // this._Router.navigate(['/home']);
            const productId = localStorage.getItem('productId');
            if (productId == null) {
              this._Router.navigate(['/home']).then(() => {
                window.location.reload();
              });
              console.log('product id' + productId);
            } else {
              console.log('product id' + productId);

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
