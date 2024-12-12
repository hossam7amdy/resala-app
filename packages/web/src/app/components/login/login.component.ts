import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
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
    private authService: AuthService,
    private router: Router,
    public _Translate: TranslateService
  ) {}

  customSpinIsLoading = false;

  showPW: boolean = false;
  togglePW() {
    this.showPW = !this.showPW;
  }

  errMsg: string = '';
  errMsgAr: string = '';
  successMsg: string = '';
  successMsgAr: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    sign: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.compose([Validators.required])),
  });

  handleForm(_: FormGroup): void {
    const userData = this.loginForm.value;

    if (this.loginForm.valid === true) {
      this.customSpinIsLoading = true;
      this.authService.login(userData).subscribe({
        next: res => {
          this.customSpinIsLoading = false;
          this.successMsg = 'Logged already';
          this.successMsgAr = 'تم تسجيل الدخول بنجاح';
          console.log(res);
          const productId = localStorage.getItem('productId');
          if (productId == null) {
            this.router.navigate([`/${this.authService.directionURL.value}`], { replaceUrl: true });
          } else {
            this.router.navigate(['product-details/', productId], { replaceUrl: true });
            localStorage.removeItem('productId');
          }
        },
        error: err => {
          this.customSpinIsLoading = false;
          this.errMsg = err?.error?.message || 'Something went wrong';
          this.errMsgAr = 'الايميل او كلمة المرور غير صحيحة !';
        },
      });
    }
  }

  handleGoogleLogin(): void {
    this.authService.loginWithGoogle().subscribe({
      next: ({ url }) => {
        location.replace(url);
      },
      error: err => {
        this.errMsg = err?.error?.message || 'Something went wrong';
      },
    });
  }
}
