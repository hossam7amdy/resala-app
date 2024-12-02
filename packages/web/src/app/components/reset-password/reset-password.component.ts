import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  newToken: string = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam => {
      this.newToken = queryParam['token'];
    });
  }

  showPW: boolean = false;
  togglePW() {
    this.showPW = !this.showPW;
  }

  isLoading: boolean = false;
  successMsg: string = '';
  errMsg: string = '';

  resetPw: FormGroup = new FormGroup({
    newPassword: new FormControl(
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

    confirmNewPassword: new FormControl(
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
  });

  changePw(): void {
    this.isLoading = true;
    this.authService.resetPassword(this.resetPw.value, this.newToken).subscribe({
      next: () => {
        this.resetPw.reset();
        this.toaster.success('Changed Your Password Successful');
        this.router.navigate(['/login']);
      },
      error: err => {
        const errMsg = err?.error?.message || 'Something went wrong';
        this.toaster.error(errMsg);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
