import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private _AuthService: AuthService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  newToken: string = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam => {
      this.newToken = queryParam['token'];
    });
  }

  showPW: any;
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
    this._AuthService.resetPassword(this.resetPw.value, this.newToken).subscribe({
      next: () => {
        this.isLoading = false;
        this.toaster.success('Changed Your Password Successfuly');
      },
      error: err => {
        this.toaster.error(err.error.message);
        this.isLoading = false;
      },
    });
  }
}
