import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/core/spinner/spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private authService: AuthService,
    private toaster: ToastrService
  ) {}

  customSpinIsLoading = false;

  isLoading: boolean = false;
  successMsg: string = '';
  errMsg: string = '';
  isEmail: boolean = true;
  isPhone: boolean = false;

  forgotPw: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  spinnerLoadEmail(): void {
    this.customSpinIsLoading = true;
    this.isEmail = true;
    this.isPhone = false;
    this.customSpinIsLoading = false;
  }

  spinnerLoadPhone(): void {
    this.customSpinIsLoading = true;

    this.isPhone = true;
    this.isEmail = false;

    this.customSpinIsLoading = false;
  }

  sendEmail(): void {
    this.customSpinIsLoading = true;
    this.authService.forgetPassword(this.forgotPw.value).subscribe({
      next: () => {
        this.customSpinIsLoading = false;
        this.forgotPw.reset();
        this.toaster.success('Email sent successfully, please check your email');
      },
      error: err => {
        this.customSpinIsLoading = false;
        const errMessage = err?.error?.message || 'Something went wrong';
        this.toaster.error(errMessage);
      },
    });
  }
}
